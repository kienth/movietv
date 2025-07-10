# 🎬 MovieTV App (Frontend)

A full-stack Movie & TV Show application.

This is the **frontend** built with [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/) and styled using [Material UI (MUI)](https://mui.com/). It connects to an Express + Prisma backend powered by a MySQL database.

---

## 🧰 Tech Stack

- ⚛️ **React** + ⚡ **Vite**
- ⛓️ **TypeScript**
- 🎨 **MUI (Material UI)**
- 📡 **RTK Query** for API requests
- ✅ **Formik + Yup** for forms and validation

---

## 🚀 Getting Started

Follow these steps to run the frontend locally:

### 1️⃣ Clone the Repository

`git clone https://github.com/kienth/movietv.git`

### 2️⃣ Install Dependencies

`npm install`

This will install all required dependencies.

### 3️⃣ Configure Environment Variables

Create a .env file in the client folder and add the following line:
`VITE_API=http://localhost:3000/api`

This sets the base URL for your backend API.
⚠️ Make sure your backend is running on http://localhost:3000

### 4️⃣ Run the Development Server

`npm run dev`

This will start the app at:
🌐 http://localhost:5173
