# DressUP - AI Wardrobe & Personal Stylist

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-0.76-blue" alt="React Native">
  <img src="https://img.shields.io/badge/NestJS-10-red" alt="NestJS">
  <img src="https://img.shields.io/badge/TypeScript-5.3-blue" alt="TypeScript">
</p>

---

## 🎯 Overview

**DressUP** is a premium AI-powered wardrobe and fashion assistant mobile application. It transforms your closet into an intelligent digital wardrobe that understands your style, body, and fashion preferences.

### Key Features

- 📸 **AI Body Scanning** - Get accurate size recommendations
- 👗 **Digital Wardrobe** - Catalog every clothing item
- ✨ **Smart Outfits** - AI-powered outfit recommendations
- 🎨 **Style DNA** - Personal style profile that evolves
- 🌦️ **Weather-Aware** - Outfits adapted to conditions
- 📅 **Calendar Integration** - Schedule your looks
- 🧺 **Laundry Tracker** - Never wear dirty clothes
- ✈️ **Packing Assistant** - Smart travel packing lists
- 📊 **Wardrobe Analytics** - Insights into your style

---

## 🏗️ Architecture

```
dressup/
├── backend/          # NestJS API
│   ├── src/
│   │   ├── auth/           # Authentication
│   │   ├── users/          # User management
│   │   ├── clothing/       # Wardrobe management
│   │   ├── outfit/         # Outfit recommendations
│   │   ├── ai/             # AI/ML services
│   │   └── prisma/         # Database service
│   └── prisma/schema.prisma   # Database schema
├── frontend/         # React Native (Expo)
│   ├── app/                 # Expo Router screens
│   ├── components/         # Reusable components
│   ├── stores/             # Zustand state stores
│   └── services/          # API client
├── docker-compose.yml
└── nginx/
    └── nginx.conf
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose

### Quick Start

```bash
# Clone repository
git clone https://github.com/Big-Joe01/DressUp.git
cd DressUp

# Start with Docker
docker-compose up -d

# Or run manually:
cd backend && npm install && npm run start:dev
cd frontend && npm install && npm start
```

---

## 📱 Mobile App

```bash
cd frontend
npm install
npm start
```

---

## 🔌 API

### Base URL: http://localhost:4000/api/v1

### Auth Endpoints
- POST `/auth/register` - Register new user
- POST `/auth/login` - Login
- POST `/auth/refresh` - Refresh token

### Clothing Endpoints
- GET `/clothing` - List wardrobe items
- POST `/clothing` - Add new item
- GET/PATCH/DELETE `/clothing/:id` - Item operations

### Outfit Endpoints
- GET `/outfits` - List outfits
- POST `/outfits` - Create outfit
- POST `/outfits/:id/wear` - Mark as worn

### AI Endpoints
- POST `/ai/recommend-outfit` - Get outfit recommendation
- POST `/ai/chat` - Style assistant chat

---

## 🛠️ Tech Stack

### Backend
- NestJS 10 + TypeScript 5.3
- Prisma ORM + MySQL 8
- Redis 7 + JWT Auth

### Mobile
- React Native (Expo 52)
- TypeScript 5.3
- Expo Router + NativeWind
- Zustand + TanStack Query

---

## 📄 License

MIT License
