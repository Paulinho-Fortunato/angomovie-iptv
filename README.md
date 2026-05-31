# AngoMovie IPTV

A modern streaming platform for live TV channels using IPTV technology. Built with vanilla HTML, CSS, and JavaScript.

🔗 **Live Demo**: [https://angomovie-iptv.vercel.app](https://angomovie-iptv.vercel.app)

## Features

- 📺 Live TV channels streaming
- 🎬 Channel categories and filtering
- 🎨 Dark-themed modern UI
- 📱 Responsive design
- 🔍 Quick channel search and navigation
- 📡 HLS/m3u8 stream support

## Project Structure

```
angomovie-iptv/
├── public/
│   ├── index.html          # Main channel listing page
│   └── player.html         # Video player page
├── api/
│   └── proxy.js            # Backend proxy for API requests
├── vercel.json             # Vercel deployment config
└── README.md
```

## Quick Start

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/Paulinho-Fortunato/angomovie-iptv.git
cd angomovie-iptv
```

2. Start a local server (using Python):
```bash
python -m http.server 8000
```

Or using Node.js:
```bash
npx http-server
```

3. Open in browser: `http://localhost:8000`

### Deployment

This project is configured for **Vercel** deployment:

```bash
npm install -g vercel
vercel
```

The `vercel.json` file handles routing for the API proxy.

## How It Works

### Index Page (`public/index.html`)
- Fetches live TV categories from the API
- Displays channels in a responsive grid
- Sidebar navigation for category filtering

### Player Page (`public/player.html`)
- Receives channel ID and name as URL parameters
- Uses Video.js for HLS streaming
- Displays video controls and full-screen support

### API Proxy (`api/proxy.js`)
- Proxies requests to the IPTV backend
- Handles CORS issues
- Converts responses to JSON

## Configuration

### Adding a New API Endpoint

Edit `api/proxy.js` to add new endpoint handlers:

```javascript
if (action === 'get_live_categories') {
    // Handle categories
}
```

### Customizing Appearance

Edit CSS variables in `public/index.html`:

```css
:root {
    --fundo-principal: #050a18;    /* Main background */
    --fundo-secundario: #0a101f;   /* Secondary background */
    --destaque-principal: #e50914; /* Primary accent (red) */
    --texto-principal: #ffffff;    /* Primary text */
    --texto-suave: #b3b3b3;        /* Soft text */
}
```

## Known Issues & Solutions

### ⚠️ Mixed Content Error
**Error**: "Mixed Content: The page was loaded over HTTPS but requested an insecure XMLHttpRequest..."

**Solution**: Update stream URLs to use HTTPS:
```javascript
// ❌ Wrong
const videoUrl = `http://nitidez.pro/live/Marcio/123456/${id}.m3u8`;

// ✅ Correct
const videoUrl = `https://nitidez.pro/live/Marcio/123456/${id}.m3u8`;
```

### 🔒 Tracking Prevention
**Error**: "Tracking Prevention blocked access to storage..."

**Solution**: Use memory storage or session storage instead of localStorage for sensitive data.

## Browser Support

- Chrome/Edge 60+
- Firefox 55+
- Safari 12+
- Modern mobile browsers

## Technologies Used

- **Video Player**: Video.js 7.20.3
- **Font**: Montserrat (Google Fonts)
- **Streaming**: HLS (m3u8)
- **Deployment**: Vercel
- **Language**: HTML, CSS, JavaScript (Vanilla)

## Performance Optimization Tips

1. **Lazy Load Images**: Use Intersection Observer for channel thumbnails
2. **Cache Categories**: Store categories in sessionStorage
3. **Compress Media**: Optimize channel logos
4. **CDN**: Serve static assets through Vercel's global CDN
5. **Code Splitting**: Load player.js only on player.html

## Security Considerations

- ✅ Use HTTPS for all stream URLs
- ✅ Validate URL parameters
- ✅ Implement CORS properly
- ✅ Sanitize user input
- ⚠️ Consider API rate limiting

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an [issue on GitHub](https://github.com/Paulinho-Fortunato/angomovie-iptv/issues).

---

**Made with ❤️ by Paulinho-Fortunato**
