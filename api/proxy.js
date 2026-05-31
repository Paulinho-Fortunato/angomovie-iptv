export default async function handler(req, res) {
  const { action, category_id, stream_id } = req.query;
  const dns = "http://nitidez.pro";
  const user = "Marcio";
  const pass = "123456";

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Handle stream URL proxy - fetch and forward the M3U8 playlist
    if (action === 'get_stream_url' && stream_id) {
      const streamUrl = `${dns}/live/${user}/${pass}/${stream_id}.m3u8`;
      
      try {
        const response = await fetch(streamUrl, {
          headers: {
            'User-Agent': 'VLC/3.0.0 LibVLC/3.0.0'
          }
        });

        if (!response.ok) {
          console.error(`Stream fetch failed: ${response.status} - ${response.statusText}`);
          res.status(response.status).json({ 
            error: `Failed to fetch stream: ${response.statusText}`,
            streamId: stream_id
          });
          return;
        }

        const playlist = await response.text();

        // Forward the M3U8 playlist with proper headers
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.status(200).send(playlist);
      } catch (streamError) {
        console.error('Stream proxy error:', streamError.message);
        res.status(500).json({ 
          error: `Stream proxy failed: ${streamError.message}`,
          streamId: stream_id
        });
      }
      return;
    }

    // Handle category and live streams - original behavior
    let url = `${dns}/player_api.php?username=${user}&password=${pass}&action=${action}`;
    if (category_id) url += `&category_id=${category_id}`;

    const response = await fetch(url);
    
    if (!response.ok) {
      res.status(response.status).json({ 
        error: `API request failed: ${response.statusText}` 
      });
      return;
    }

    const data = await response.json();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: "Erro ao buscar dados da IPTV",
      details: error.message 
    });
  }
}
