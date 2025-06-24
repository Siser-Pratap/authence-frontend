# 🚀 NPM Package Documentation Site

A modern, interactive documentation website built with **React**, **TypeScript**, **Vite**, and **GSAP animations**. Features a complete user authentication system and comprehensive SAAS dashboard with beautiful glass morphism design.

![NPM Docs Site](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.5-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 **Modern Design**
- **Glass Morphism UI** with backdrop blur effects
- **Vibrant Color Schemes** with gradient backgrounds
- **Smooth GSAP Animations** throughout the application
- **Responsive Design** that works on all devices
- **Interactive 3D Elements** using React Three Fiber

### 🔐 **Authentication System**
- **Sign In/Sign Up Pages** with animated forms
- **Protected Routes** for dashboard access
- **Local Storage Authentication** (easily replaceable with real auth)
- **Beautiful Loading States** and transitions

### 📊 **SAAS Dashboard**
- **Responsive Sidebar** with mobile hamburger menu
- **User Profile Management** with plan details
- **Real-time Statistics** with animated counters
- **API Key Management** with CRUD operations
- **Interactive Charts** and data visualization
- **Activity Monitoring** and usage tracking

### 🎯 **Core Pages**
- **Landing Page** with hero section and features
- **Getting Started** with step-by-step guide
- **Documentation** with searchable content
- **User Dashboard** with three main sections:
  - 👤 **Profile**: User info, plan details, security settings
  - 📈 **Stats**: Animated metrics, charts, activity feed
  - 🔑 **API Keys**: Create, manage, and monitor API keys

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | Frontend Framework | 18.2.0 |
| **TypeScript** | Type Safety | 5.2.2 |
| **Vite** | Build Tool | 5.0.0 |
| **Tailwind CSS** | Styling | 3.3.5 |
| **GSAP** | Animations | 3.12.2 |
| **React Router** | Routing | 6.20.1 |
| **React Three Fiber** | 3D Graphics | 8.15.11 |
| **Shadcn/UI** | UI Components | Latest |
| **Lucide React** | Icons | 0.294.0 |

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/yourusername/npm-docs-site.git
cd npm-docs-site
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. **Start the development server**
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

4. **Open your browser**
\`\`\`
http://localhost:5173
\`\`\`

## 📁 Project Structure

\`\`\`
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn/UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── BackgroundAnimation.tsx
│   ├── DashboardSidebar.tsx
│   ├── Navigation.tsx
│   └── ...
├── pages/               # Page components
│   ├── dashboard/       # Dashboard pages
│   │   ├── ProfilePage.tsx
│   │   ├── StatsPage.tsx
│   │   └── ApiKeysPage.tsx
│   ├── HomePage.tsx
│   ├── SignInPage.tsx
│   ├── SignUpPage.tsx
│   └── ...
├── lib/                 # Utility functions
│   └── utils.ts
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
\`\`\`

## 🎨 Design System

### Color Palette
\`\`\`css
/* Primary Colors */
--blue-600: #2563eb
--purple-600: #9333ea
--cyan-400: #22d3ee
--green-400: #4ade80

/* Glass Effect */
background: rgba(255, 255, 255, 0.05)
backdrop-filter: blur(10px)
border: 1px solid rgba(255, 255, 255, 0.1)
\`\`\`

### Animation Classes
\`\`\`css
.glass-effect     /* Glass morphism styling */
.glow-effect      /* Subtle glow on hover */
.gradient-text    /* Gradient text effect */
.fade-in          /* GSAP fade animation */
.slide-in-left    /* GSAP slide animation */
\`\`\`

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
\`\`\`env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=NPM Docs Site
\`\`\`

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- **Custom colors** for the design system
- **Glass morphism utilities**
- **Animation extensions**
- **Responsive breakpoints**

## 📱 Responsive Design

| Breakpoint | Width | Description |
|------------|-------|-------------|
| `sm` | 640px+ | Small tablets |
| `md` | 768px+ | Tablets |
| `lg` | 1024px+ | Laptops |
| `xl` | 1280px+ | Desktops |

## 🎭 Animation Features

### GSAP Animations
- **Page Transitions**: Smooth enter/exit animations
- **Scroll Triggers**: Elements animate on scroll
- **Number Counters**: Animated statistics
- **Stagger Effects**: Sequential element animations
- **3D Transforms**: Rotation and scale effects

### Interactive Elements
- **Hover Effects**: Glow and scale transitions
- **Click Animations**: Button press feedback
- **Loading States**: Spinner and skeleton loaders
- **Floating Particles**: Background animation system

## 🔐 Authentication Flow

```mermaid
graph TD
    A[Landing Page] --> B{User Authenticated?}
    B -->|No| C[Sign In/Sign Up]
    B -->|Yes| D[Dashboard]
    C --> E[Authentication]
    E --> F[Store in LocalStorage]
    F --> D
    D --> G[Profile Page]
    D --> H[Stats Page]
    D --> I[API Keys Page]
