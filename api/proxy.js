import { Xtream } from '@iptv/xtream-api';

export default async function handler(req, res) {
  const { action, category_id } = req.query;

  // Configuração da API usando a biblioteca
  const xtream = new Xtream({
    url: 'http://nitidez.pro',
    username: 'Marcio',
    password: 'password', // coloque sua senha real aqui: 123456
  });

  try {
    let data;

    if (action === 'get_live_categories') {
      data = await xtream.getChannelCategories();
    } else if (action === 'get_live_streams') {
      data = await xtream.getChannels({ categoryId: category_id });
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
