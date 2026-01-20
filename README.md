# 🛒 Amazon Clone - Full Stack E-Commerce UI

A fully responsive Amazon-inspired e-commerce platform built with **React.js**. This project replicates the core user experience of Amazon, including a multi-row responsive navbar, category navigation, geolocation-based delivery tracking, and a locked shopping experience requiring authentication.



---

## 🚀 Tech Stack

* **Frontend:** React.js (Hooks, Functional Components)
* **Styling:** CSS3 (Flexbox, Grid, Media Queries)
* **Routing:** React Router DOM (Protected Routes)
* **Form Handling:** React Hook Form
* **Icons:** React Icons (Hi, Rx, Fa, Fi)
* **APIs:**
    * **Location API:** BigDataCloud Reverse Geocoding
    * **Products API:** DummyJSON / FakeStore API (Integrated via Axios)

---

## ✨ Key Features

### 1. Advanced Responsive Navbar
* **Multi-row Layout:** Dynamically shifts from a single-row desktop view to a double-row mobile view (Search bar moves to the bottom).
* **Horizontal Category Scroll:** A `NavbarList` that allows users to swipe through categories on mobile devices.
* **Real-time Geolocation:** Automatically detects user city and country for the "Deliver to" section using the browser's Geolocation API.

### 2. Secure Shopping Flow (Authentication)
* **Protected Routes:** Users are blocked from accessing the **Cart**, **Checkout**, and **Product Details** pages unless they are logged in.
* **Validation:** Robust form validation for Sign-in and Sign-up using `react-hook-form` and Regex.
* **Persistent Login:** Auth state is managed via `localStorage` to keep users logged in across refreshes.

### 3. Shopping Experience
* **Dynamic Search:** Integrated search bar for product discovery.
* **Cart System:** Real-time cart indicator and dedicated cart management page.

---
# 📂 Project Structure
```
src/
├── assets/          # Images and logos
├── components/      # Reusable UI (Navbar, SearchBar, ProtectedRoute)
├── context
├── pages/           # Page layouts (Home, Login, Cart, ProductPage)
├── styles/          # Modular CSS files
└── App.js           # Route configuration and Lockdown logic
```
