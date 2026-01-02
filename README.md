# Stellar Burgers  
React • TypeScript • Redux Toolkit • React Router • Authorization • Webpack • Storybook • REST API

**Stellar Burgers** is a single-page React application (SPA) for building cosmic burgers.  
Users can sign up, log in, browse ingredients, view ingredient details in modal windows, assemble a burger, and place an order.  
The project is built with **React + TypeScript**, uses **Redux Toolkit** for state management, and follows a modular architecture.

---

## ✨ Key Features

- Load ingredients from a server (REST API)  
- View ingredient details in a modal  
- Build a custom burger  
- Submit an order  
- User registration, login, and password recovery  
- Token storage with automatic authorization check  
- Protected routes (only accessible for authenticated users)  
- Edit user profile data  
- Routing implemented with **React Router v6**  
- UI components documented and previewed with **Storybook**  
- Full TypeScript coverage across the application  

---

## 🛠 Technologies Used

### **Frontend**
- **React** (functional components, hooks)
- **TypeScript**
- **Redux Toolkit** (slices, async thunks)
- **React Router**
- **CSS Modules / plain CSS**
- **Modals**
- **Storybook** (component documentation & preview)

### **Tooling & Infrastructure**
- **Webpack** (project bundling)
- **Babel**
- **ESLint + Prettier**
- **Environment variables (.env)**
- **Git / GitHub**

### **API**
- REST API  
- Fetch + async/await  
- Environment variable: `BURGER_API_URL`  

---

## 📁 Project Structure

## 📁 Project Structure

```
src/
  components/      # UI components
  pages/           # routes
  services/        # Redux store, slices
  utils/           # helpers, api
  stories/         # Storybook
  images/
  index.tsx
  index.css
```

---

## 🔧 API Configuration

Create a `.env` file with:
```
BURGER_API_URL=https://norma.education-services.ru/api
```


---

## ▶️ Running the Project

Installation:

```
npm install
```

Start the development server:

```
npm start
```

Build for production:

```
npm run build
```

Run Storybook:

```
npm run storybook
```
