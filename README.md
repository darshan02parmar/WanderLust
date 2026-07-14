<div align="center">
  <h1>🌍 WanderLust</h1>
  <p><strong>An ultra-premium, full-stack travel booking platform inspired by Airbnb.</strong></p>
  
  [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](#)
  [![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](#)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](#)
  [![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](#)
  
  [Live Demo](https://wanderlust-750d.onrender.com/) • [Report Bug](#) • [Request Feature](#)
</div>

<br />

**WanderLust** is a high-end web application where users can seamlessly explore, list, and manage travel accommodations. Upgraded with a **stunning glassmorphic UI**, sleek micro-animations, and responsive edge-to-edge grids, it provides a premium booking experience. 

The project demonstrates robust full-stack capabilities including **real-world CRUD operations, authentication, authorization, interactive mapping, and a RESTful architecture.**

---

## ✨ Key Features

### 🎨 Premium UI/UX Design
- **Glassmorphism Aesthetics:** Beautiful frosted glass containers, dynamic floating navbars, and soft shadow rendering.
- **Interactive Lightbox:** Immersive, fullscreen modal galleries for viewing property photos in high resolution.
- **Dynamic Grid System:** Edge-to-edge fluid layouts that scale perfectly on ultra-wide monitors.
- **Micro-Interactions:** Smooth CSS hover transitions, image scale-zooming, interactive favicons, and elegant button states.

### 🔐 Authentication & Security
- Secure local authentication strategy via **Passport.js**.
- Encrypted user sessions & cookie management.
- Server-side authorization verifying listing/review ownership before enabling modifications.

### 🏡 Listing Management
- Complete CRUD functionality for travel properties.
- **Cloudinary Integration:** Reliable, optimized remote image uploading for property photos.
- Real-time tax calculation toggles (pre-tax vs. post-tax pricing views).
- Dynamic category filtering (Mountains, Beach, Arctic, Castles, etc.).

### 📅 Advanced Booking Engine
- **Real-Time Booking Validation:** Full checkout system with check-in/check-out dates, guest selection, and automatic overlap prevention to avoid double bookings.
- **Dynamic Pricing Calculator:** Instantly calculates total price including dynamic night counts, cleaning fees, and service taxes.
- **User Dashboard (Trips):** Dedicated UI for users to view upcoming and past trips, check confirmation receipts, and cancel active reservations.
- **Host Analytics Dashboard:** Visual revenue charts (Chart.js) and complete history of upcoming/completed guests for property owners.

### 🗺️ Interactive Maps & Reviews
- **Geolocation & Mapping:** Integrated map rendering pin-pointing the exact coordinates of the property.
- **Review System:** Authenticated users can leave 1-5 star ratings and detailed reviews, visualized in elegant bubble cards.

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, EJS (Embedded JavaScript), Bootstrap 5, FontAwesome |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Security & Auth**| Passport.js, Express-Session, Joi (Data Validation) |
| **Cloud & APIs** | Cloudinary (Image Hosting), Leaflet/Mapbox (Maps) |
| **Deployment** | Render |

---

## 📂 Project Architecture

```text
WanderLust/
├── models/         # Mongoose DB schemas (Listing, Review, User)
├── routes/         # Express router endpoints
├── controllers/    # Core business logic for routes
├── views/          # EJS templates & dynamic UI layouts
├── public/         # Static assets (Custom CSS, Client-side JS, Images)
├── middleware/     # Auth checks, validation middleware
├── utils/          # Error handling & async wrappers
├── app.js          # Application entry point
└── package.json    # Dependencies & scripts
```

---

## 🚀 Installation & Setup (Local Development)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/darshan02parmar/WanderLust.git
cd WanderLust
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add your credentials:
```env
# Database
ATLASDB_URL=your_mongodb_atlas_connection_string
NODE_ENV=development

# Security
SECRET=your_super_secret_session_key

# Cloudinary (Image Storage)
CLOUD_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
```

### 4️⃣ Boot the server
```bash
npm run dev
# OR
node app.js
```

Visit the application at: **`http://localhost:8080`**

---

## 🎯 Learning Outcomes
Building WanderLust provided immense practical experience in:
- Architecting a complete full-stack web application from scratch.
- Mastering the **Model-View-Controller (MVC)** design pattern.
- Building secure, stateful user sessions and role-based permissions.
- Upgrading standard frameworks (Bootstrap) with **custom, high-end CSS aesthetics**.
- Integrating third-party cloud services (Cloudinary, Geocoding APIs).

---

## 👨‍💻 Author

**Darshan Parmar**
- 🔗 GitHub: [@darshan02parmar](https://github.com/darshan02parmar)

⭐ **If you found this project helpful or inspiring, please consider giving it a star on GitHub!**
