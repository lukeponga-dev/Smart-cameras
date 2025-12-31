# 🚦 TrafficOS - Smart Traffic Surveillance Platform

<div align="center">

![TrafficOS Banner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

**A cutting-edge traffic camera surveillance system powered by AI and real-time data**

[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)

</div>

---

## 📋 Overview

**TrafficOS** is a modern, real-time traffic surveillance platform that aggregates live traffic camera feeds from across New Zealand. Built with React and powered by Google's Gemini AI, it provides intelligent traffic analysis, route planning, and comprehensive monitoring capabilities.

### ✨ Key Features

- 🎥 **321+ Live Camera Feeds** - Real-time access to traffic cameras across NZ
- 🗺️ **Interactive Map View** - Leaflet-powered map with marker clustering
- 🤖 **AI-Powered Analysis** - Gemini AI for traffic intelligence and predictions
- 📊 **Smart Filtering** - Filter by region, camera type, and favorites
- 🛣️ **Route Planning** - Calculate routes between cameras with AI-predicted travel times
- 🌐 **Tactical Layers** - Weather, transport hubs, and hazard overlays
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ⚡ **Real-time Updates** - Auto-refresh every 60 seconds
- 🎨 **Premium Dark UI** - Sleek, modern interface with glassmorphism effects

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Gemini API Key** - Get one from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Smart-cameras
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

---

## 🎯 Features in Detail

### 📹 Camera Surveillance

- **Grid View**: Browse cameras in a responsive card grid
- **Live Feeds**: Click any camera to view its live feed in a modal
- **Favorites**: Star cameras for quick access via the Watchlist
- **Search**: Find cameras by name or region instantly
- **Regional Filtering**: Filter by Auckland, Wellington, Canterbury, and more

### 🗺️ Interactive Map

- **Marker Clustering**: Automatically groups nearby cameras for better performance
- **Color-Coded Severity**: Visual indicators for traffic conditions
  - 🔵 Low (Blue)
  - 🟠 Medium (Orange)
  - 🔴 High (Red)
  - 🟣 Critical (Purple)
- **Route Planning**: Set origin and destination to calculate routes
- **Tactical Overlays**:
  - ☀️ Weather Intelligence
  - 🚌 Transport Hubs
  - ⚠️ Traffic Hazards

### 🤖 AI Intelligence

Powered by **Google Gemini 2.0 Flash**, TrafficOS provides:

- **Traffic Analysis**: Real-time congestion assessment
- **Route Briefings**: AI-generated route summaries
- **Predictive Travel Times**: ML-based time predictions
- **Regional News**: Contextual traffic updates
- **Voice Playback**: Text-to-speech route briefings

### 📊 Network Analytics

Real-time statistics dashboard showing:
- Total active cameras
- Red light cameras count
- Speed enforcement cameras
- Network coverage percentage

---

## 🏗️ Architecture

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19.2.3 + TypeScript |
| **Build Tool** | Vite 6.2.0 |
| **Styling** | Tailwind CSS (CDN) |
| **Mapping** | Leaflet 1.9.4 + MarkerCluster |
| **AI** | Google Gemini 2.0 Flash |
| **Data Source** | NZTA Traffic API |
| **Routing** | OSRM (Open Source Routing Machine) |

### Project Structure

```
Smart-cameras/
├── components/
│   ├── CameraCard.tsx       # Camera card component
│   ├── CameraMap.tsx        # Interactive map with Leaflet
│   ├── ImageModal.tsx       # Live feed modal viewer
│   └── LiveCommand.tsx      # AI command interface
├── services/
│   ├── geminiService.ts     # Gemini AI integration
│   └── trafficService.ts    # NZTA API integration
├── data/
│   └── enforcementData.ts   # Static enforcement camera data
├── App.tsx                  # Main application component
├── types.ts                 # TypeScript type definitions
├── index.tsx                # Application entry point
├── index.css                # Global styles
└── vite.config.ts           # Vite configuration
```

---

## 🔧 Configuration

### Vite Config

The app runs on **port 3000** by default. Modify in `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  // ...
});
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | ✅ Yes |

---

## 🎨 UI/UX Features

### Design Philosophy

- **Dark Mode First**: Optimized for low-light viewing
- **Glassmorphism**: Modern frosted glass effects
- **Micro-animations**: Smooth transitions and hover effects
- **Responsive Grid**: Adapts from mobile to 4K displays
- **Infinite Scroll**: Lazy-loading for performance
- **Keyboard Shortcuts**: Quick navigation (planned)

### Color Palette

```css
--bg-dark: #09090b        /* Primary background */
--bg-card: #18181b        /* Card background */
--accent-primary: #3b82f6 /* Blue accent */
--text-main: #e4e4e7      /* Primary text */
--text-muted: #a1a1aa     /* Secondary text */
```

---

## 📡 API Integration

### NZTA Traffic API

Fetches live camera feeds from the New Zealand Transport Agency:
- **Endpoint**: `https://infoconnect.highwayinfo.govt.nz/ic/jbi/TrafficCameras/locations`
- **Update Frequency**: 60 seconds
- **Data Format**: JSON

### Google Gemini AI

Used for intelligent features:
- **Model**: `gemini-2.0-flash-exp`
- **Capabilities**: Text generation, grounding, code execution
- **Features**: Route analysis, traffic predictions, contextual news

---

## 🚧 Roadmap

### Planned Features

- [ ] **Historical Data**: View traffic patterns over time
- [ ] **Incident Alerts**: Real-time notifications for accidents
- [ ] **Multi-language Support**: i18n for global users
- [ ] **PWA Support**: Install as a mobile app
- [ ] **User Accounts**: Save preferences and custom routes
- [ ] **Export Routes**: Share routes via URL or QR code
- [ ] **Advanced Filters**: Time-based, weather-based filtering
- [ ] **API Endpoints**: Public API for developers

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **NZTA** - For providing the traffic camera API
- **Google** - For Gemini AI capabilities
- **Leaflet** - For the excellent mapping library
- **OpenStreetMap** - For map tiles and routing data
- **Carto** - For dark mode map tiles

---

## 📞 Support

For issues, questions, or feature requests:

- 🐛 [Report a Bug](https://github.com/your-repo/issues)
- 💡 [Request a Feature](https://github.com/your-repo/issues)
- 📧 Email: support@trafficos.nz

---

<div align="center">

**Built with ❤️ in New Zealand**

[View Live Demo](http://localhost:3000) • [Documentation](#) • [Report Bug](#) • [Request Feature](#)

</div>
