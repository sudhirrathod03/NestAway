# NestAway 🏡

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://nest-away-delta.vercel.app/listings)


A full-stack property rental platform built with MVC architecture. Browse, list, and manage rental properties with advanced search and real-time location features.

🔗 **[Live Demo](https://nest-away-delta.vercel.app/listings)**

## ✨ Features

- 🏠 Browse and manage rental properties
- 🔍 Advanced search with filters
- 🗺️ Interactive maps with Mapbox integration
- 📍 Smart geolocation for 95%+ of listings
- ⚡ 25% faster data retrieval with optimized APIs

## 🛠️ Tech Stack

**Frontend:** React.js, JavaScript, CSS3, Mapbox GL JS  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**APIs:** Mapbox, OpenWeatherMap, Unsplash  
**Deployment:** Vercel, MongoDB Atlas

## 🚀 Quick Start

```bash```
# Clone repository
git clone https://github.com/sudhirrathod03/NestAway.git
cd NestAway

# Install dependencies
npm install

# Create .env file with your API keys
MONGODB_URI=your_mongodb_uri
MAPBOX_TOKEN=your_mapbox_key
OPENWEATHER_API_KEY=your_weather_key
UNSPLASH_ACCESS_KEY=your_unsplash_key
CLUDINARY_API_KEY=your_cloud_key
CLOUD_SECRET_KEY=your_cloud_secret_key
# Run development server
nodemon app.js
```
```
## 📡 API Endpoints

**Properties:** GET, POST, PUT, DELETE `/api/listings`  
**Search:** GET `/api/listings/search`  
**Users:** POST `/api/users/register`, `/api/users/login`  
**Features:** GET `/api/weather/:location`, `/api/images/:location`

## 📊 Performance

- 10+ RESTful API endpoints
- 25% improvement in data retrieval speed
- 95%+ geolocation accuracy


## 👨‍💻 Author

**Sudhir Rathod**  
GitHub: [@sudhirrathod03](https://github.com/sudhirrathod03)

---

⭐ Star this repo if you find it useful!
