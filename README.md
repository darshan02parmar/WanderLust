# 🌍 WanderLust

**WanderLust** is a full-stack web application inspired by platforms like Airbnb, where users can explore, list, and manage travel accommodations.  
The project focuses on **real-world CRUD operations, authentication, authorization, and RESTful architecture**.

🔗 **Live Demo:** https://wanderlust-750d.onrender.com/  
🔗 **GitHub Repository:** https://github.com/darshan02parmar/WanderLust

---

## 🚀 Features

### 👤 User Authentication & Authorization

- User signup and login
- Secure session handling
- Authorization for listing creation, editing, and deletion

### 🏡 Listings Management

- Create, edit, and delete travel listings
- Upload images for listings
- View listing details with descriptions and pricing

### 💬 Reviews & Ratings

- Add reviews to listings
- Star-based rating system
- Only authenticated users can post reviews
- Review ownership validation

### 📍 Location-Based Listings

- Each listing includes location and country
- Map integration-ready structure

### 🔐 Security & Validation

- Server-side data validation
- Ownership checks for listings and reviews
- Protected routes

---

## 🛠️ Tech Stack

### **Frontend**

- HTML5
- CSS3
- Bootstrap
- EJS (Embedded JavaScript Templates)

### **Backend**

- Node.js
- Express.js

### **Database**

- MongoDB
- Mongoose ODM

### **Authentication & Utilities**

- Passport.js
- Express-Session
- Method-Override
- Connect-Flash

### **Deployment**

- Render (Backend & App Hosting)

---

## 📂 Project Structure

```
WanderLust/
│
├── models/ # Mongoose schemas
├── routes/ # Express routes
├── controllers/ # Route logic
├── views/ # EJS templates
├── public/ # Static files (CSS, JS)
├── middleware/ # Custom middleware
├── utils/ # Helper functions
├── app.js # Main application file
└── package.json
```

---

## ⚙️ Installation & Setup (Local)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/darshan02parmar/WanderLust.git
cd WanderLust
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set Environment Variables

Create a `.env` file and add:

```
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```

### 4️⃣ Run the application

```bash
npm start
```

Visit:  
http://localhost:3000

---

## 🎯 Learning Outcomes

- Built a complete full-stack web application
- Hands-on experience with MVC architecture
- Implemented authentication & authorization
- Worked with MongoDB relationships
- Learned secure backend development
- Real-world CRUD + REST principles

---

## 📌 Future Improvements

- Image upload using Cloudinary
- Interactive maps integration
- Search and filter listings
- Booking functionality
- Responsive UI improvements

---

## 👨‍💻 Author

Darshan Parmar  

🔗 GitHub: https://github.com/darshan02parmar

⭐ If you like this project, consider giving it a star on GitHub!


