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
      
      console.log(`[Stream Proxy] Fetching: ${streamUrl}`);

      const streamResponse = await fetch(streamUrl, {
        headers: {
          'User-Agent': 'VLC/3.0.0 LibVLC/3.0.0'
        }
      }).catch(err => {
        console.error(`[Stream Proxy] Fetch error: ${err.message}`);
        throw err;
      });

      if (!streamResponse.ok) {
        console.error(`[Stream Proxy] Bad response: ${streamResponse.status}`);
        return res.status(streamResponse.status).json({ 
          error: `Failed to fetch stream: ${streamResponse.statusText}`,
          streamId: stream_id
        });
      }

      const playlist = await streamResponse.text();
      console.log(`[Stream Proxy] Got playlist, length: ${playlist.length}`);

      // Set proper headers for M3U8
      res.setHeader('Content-Type', 'application/vnd.apple.mpegurl; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('Access-Control-Allow-Origin', '*');
      
      return res.status(200).send(playlist);
    }

    // Handle get_live_categories
    if (action === 'get_live_categories') {
      const apiUrl = `${dns}/player_api.php?username=${user}&password=${pass}&action=get_live_categories`;
      console.log(`[Categories] Fetching: ${apiUrl}`);

      const response = await fetch(apiUrl);
      if (!response.ok) {
        return res.status(response.status).json({ 
          error: `API request failed: ${response.statusText}` 
        });
      }

      const data = await response.json();
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      
      return res.status(200).json(data);
    }

    // Handle get_live_streams
    if (action === 'get_live_streams') {
      let apiUrl = `${dns}/player_api.php?username=${user}&password=${pass}&action=get_live_streams`;
      if (category_id) apiUrl += `&category_id=${category_id}`;
      
      console.log(`[Streams] Fetching: ${apiUrl}`);

      const response = await fetch(apiUrl);
      if (!response.ok) {
        return res.status(response.status).json({ 
          error: `API request failed: ${response.statusText}` 
        });
      }

      const data = await response.json();
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      
      return res.status(200).json(data);
    }

    // Unknown action
    res.status(400).json({ 
      error: "Unknown action",
      supportedActions: ['get_live_categories', 'get_live_streams', 'get_stream_url']
    });

  } catch (error) {
    console.error('[Proxy Error]', error);
    res.status(500).json({ 
      error: "Erro ao buscar dados da IPTV",
      details: error.message 
    });
  }
}
