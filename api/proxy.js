export default async function handler(req, res) {
  const { action, category_id } = req.query;
  const dns = "http://nitidez.pro";
  const user = "Marcio";
  const pass = "123456";

  let url = `${dns}/player_api.php?username=${user}&password=${pass}&action=${action}`;
  if (category_id) url += `&category_id=${category_id}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // Configura o CORS para permitir que seu site acesse a API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados da IPTV" });
  }
}