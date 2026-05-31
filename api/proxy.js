export default async function handler(req, res) {
  const { action, category_id } = req.query;
  
  const dns = "http://nitidez.pro";
  const user = "Marcio";
  const pass = "123456";

  // Monta a URL baseada na ação solicitada
  let url = `${dns}/player_api.php?username=${user}&password=${pass}&action=${action}`;
  if (category_id) {
    url += `&category_id=${category_id}`;
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Servidor IPTV respondeu com status: ${response.status}`);
    }

    const data = await response.json();

    // Habilita CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
  } catch (error) {
    console.error("Erro na API Proxy:", error);
    res.status(500).json({ error: "Falha ao conectar com o servidor IPTV", details: error.message });
  }
}
