# Developer Portfolio Analytics MVP

A lightweight analytics dashboard for developers to showcase their profile professionally, monitor project performance, view deployment & API usage insights, and track errors and traffic trends.

Built with **SvelteKit** as an installable **Progressive Web App (PWA)**.

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=flat&logo=svelte&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat&logo=pwa&logoColor=white)
![ApexCharts](https://img.shields.io/badge/ApexCharts-008FFB?style=flat&logo=apache-echarts&logoColor=white)

## ✨ Features

### Profile Page (`/profile`)
- **Hero Section** - Avatar, name, role, tagline, and social links
- **Tech Stack** - Categorized skills with proficiency indicators
- **Featured Projects** - Project cards with metrics and status
- **Contribution Activity** - GitHub-style heatmap visualization

### Dashboard Page (`/dashboard`)
- **Overview Metrics** - Total projects, API calls, deployments, error rate, uptime, users served
- **Traffic Analytics Chart** - Monthly API calls and unique users (filterable by project)
- **Traffic by Project** - Donut chart showing traffic distribution
- **Response Time Chart** - Daily average response times (filterable by project)
- **Recent Errors Panel** - Filterable error logs with tab navigation (All/Critical/Warning/Info)
- **Deployment Status** - Real-time deployment health with CPU/Memory metrics

## 🏗 Architecture

| Aspect | Approach |
|--------|----------|
| Framework | SvelteKit |
| Rendering | Hybrid SSR + CSR |
| PWA | Installable with caching |
| Data | Mock JSON files (simulates backend) |
| Charts | ApexCharts (dynamically loaded) |
| Styling | Global CSS + Component-scoped CSS |

### Rendering Strategy

| Component | Rendering | Reason |
|-----------|-----------|--------|
| Profile Page | SSR | SEO friendly, static content |
| Dashboard Metrics | SSR | Critical data, fast first paint |
| Deployment Status | SSR | Lightweight, important info |
| Charts | CSR | Heavy JS, not needed for initial paint |
| Error Logs | CSR | Interactive, loads on demand |

## 📁 Project Structure

```
src/
├── lib/
│   └── data/
│       ├── index.js              # Barrel exports
│       ├── site_config.json      # Site-wide configuration
│       ├── profile.json          # Profile page data
│       ├── tech_stack.json       # Skills and proficiencies
│       ├── projects.json         # Featured projects
│       ├── contributions.json    # Contribution heatmap data
│       └── dashboard/
│           ├── metrics.json      # Overview metrics
│           ├── traffic.json      # Traffic analytics (per-project)
│           ├── errors.json       # Error logs
│           └── deployments.json  # Deployment status
├── routes/
│   ├── +layout.svelte            # Root layout with nav & theme toggle
│   ├── +layout.server.js         # Site config loader
│   ├── +page.svelte              # Root redirect to /profile
│   ├── profile/
│   │   ├── +page.svelte          # Profile page UI
│   │   └── +page.server.js       # SSR data fetching
│   └── dashboard/
│       ├── +page.svelte          # Dashboard page UI
│       └── +page.server.js       # SSR data fetching
├── styles/
│   └── global.css                # Theme variables, typography, utilities
└── app.html                      # HTML template with favicon & fonts

static/
├── icons/                        # App icons (PWA + favicon)
├── lib/apexcharts/               # ApexCharts library
├── manifest.json                 # PWA manifest
└── screenshots/                  # PWA screenshots
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd my_test_project

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🎨 Theming

The app supports **Dark** and **Light** themes with a toggle in the header.

Theme variables are defined in `src/styles/global.css`:

```css
:root[data-theme="dark"] {
  --color-bg-primary: #0a0a0f;
  --color-accent: #f97316;
  /* ... */
}

:root[data-theme="light"] {
  --color-bg-primary: #f8fafc;
  --color-accent: #ea580c;
  /* ... */
}
```

Theme preference is persisted in `localStorage`.

## 📊 Data Configuration

All data is stored in JSON files under `src/lib/data/`. Keys follow **snake_case** convention.

### Modifying Data

1. **Profile Info** - Edit `src/lib/data/profile.json`
2. **Tech Stack** - Edit `src/lib/data/tech_stack.json`
3. **Projects** - Edit `src/lib/data/projects.json`
4. **Dashboard Metrics** - Edit `src/lib/data/dashboard/metrics.json`
5. **Traffic Data** - Edit `src/lib/data/dashboard/traffic.json`
6. **Error Logs** - Edit `src/lib/data/dashboard/errors.json`
7. **Deployments** - Edit `src/lib/data/dashboard/deployments.json`
8. **Site Config** - Edit `src/lib/data/site_config.json`

## 📱 PWA Features

- **Installable** - Can be installed on desktop and mobile
- **Offline Support** - Service worker caching (when deployed)
- **App Icons** - Multiple sizes for all platforms
- **Theme Color** - Matches app theme

## 🛠 Tech Stack

- **Framework**: SvelteKit
- **Language**: JavaScript (JSDoc for types)
- **Styling**: CSS Variables, Global + Scoped CSS
- **Charts**: ApexCharts
- **Fonts**: DM Sans, Sora, JetBrains Mono
- **Icons**: Custom SVG icons

## 📝 Trade-offs & Decisions

| Decision | Rationale |
|----------|-----------|
| SSR for Profile | SEO optimization, faster first paint |
| CSR for Charts | Heavy JS library, not critical for initial load |
| JSON mock data | Simulates backend, easy to modify |
| ApexCharts (CDN) | No npm dependency, loaded on-demand |
| CSS Variables | Easy theming, consistent design tokens |
| Legacy Svelte syntax | Better compatibility, familiar patterns |

## 👤 Author

**Amal B Nair**  
Senior Fullstack Web Developer  
📧 amal004nair@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/amal-b-nair-6171a7178) | [GitHub](https://github.com/ABN004)

## 📄 License

This project is for demonstration purposes.
