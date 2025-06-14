# v-mall
# 🛍️ V-Mall - React Native Shopping App

**V-Mall** is a colorful, dynamic, and feature-rich React Native (Expo) shopping app prototype that allows users to browse products, manage a cart, wishlist items, and view/edit profile information. The app uses public APIs for demonstration and is built for learning, prototyping, and showcasing mobile development skills.

---

## ✨ Features

- ✅ **User Authentication**
  - Sign up / Login with token-based session
  - Auth state management with AsyncStorage

- 🏠 **Home Screen**
  - Product list fetched from [DummyJSON](https://dummyjson.com/carts)
  - Wishlist toggle using heart icons
  - Add to Cart & View Details buttons
  - Pull-to-refresh

- 🛒 **Cart**
  - Add/remove items
  - Global cart state with persistence

- ❤️ **Wishlist**
  - Add/remove favorite products
  - Global state via `useReducer` + `Context`

- 👤 **Profile**
  - View/edit user information
  - Upload profile picture using Expo Image Picker

- 🌙 **Dark Mode (Bonus)**
  - Toggle between light/dark themes (optional)

- 🚫 **Navigation Guards**
  - Prevents unauthorized access to protected screens

---

## 📱 Screens & Navigation

- **Authentication Stack**
  - Login
  - Signup

- **Main Tabs (Bottom Navigation)**
  - Home
  - Cart
  - Profile
  - Product Detail

---

## 📦 Tech Stack

- **React Native** (with Expo)
- **React Navigation** (stack + tabs)
- **Context API + useReducer** for global state
- **AsyncStorage** for token/session management
- **DummyJSON API** as backend placeholder
- **Expo Image Picker** for profile uploads

---

## 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/v-mall.git
cd v-mall

# Install dependencies
npm install

# Start the Expo server
npx expo start
