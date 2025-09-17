# 🛍️ Mini E-Commerce Frontend

A simplified yet real-world e-commerce web application built with **Next.js, React, Tailwind CSS, and Redux Toolkit**.  
This project demonstrates modern frontend practices such as component-driven architecture, state management, and responsive design.

---

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React 18, App Router, SSR/CSR)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)  
- **Data Fetching:** Native Fetch API + [DummyJSON](https://dummyjson.com/products)  
- **Persistence:** Redux Toolkit (slices), redux-persist (cart & wishlist)
- **Build & Deploy:** Vercel  
- **Version Control:** Git & GitHub

---

## 📌 Features

### 🏠 Home Page
- Hero banner (static / carousel)  
- Featured categories grid  
- Trending products section  

### 📃 Product Listing Page (PLP)
- Filters → Category, Brand, Price Range, Rating  
- Sorting → Relevance, Price (Low → High), Newest  
- Infinite scroll  
- Search bar with debounce  

### 📦 Product Detail Page (PDP)
- Image carousel (3+ images)  
- Variant & quantity selectors  
- Add to cart / wishlist  
- Similar products carousel  

### 🛒 Cart Page
- Product summary with quantity controls  
- Remove item option  
- Apply promo code (dummy logic)  
- Price breakdown (MRP, discount, tax, total)  
- Sticky mobile checkout bar  

### ✅ Checkout page
- Dummy form (Name, Email, Address, etc.)  
- Success message after submission  

---

## 📂 Project Structure

```bash
├── components/       # Reusable UI & Product components
├── pages/            # Next.js pages (Home, Products, PDP, Cart)
├── store/            # Redux slices (products, filters, cart)
├── hooks/            # Custom hooks (useDebounce, etc.)
├── styles/           # Tailwind CSS config
├── types/            # TypeScript interfaces (Product, Cart, etc.)
└── public/           # Static assets
# 🛍️ Mini E-Commerce Frontend

A simplified yet real-world e-commerce web application built with **Next.js, React, Tailwind CSS, and Redux Toolkit**.  
This project demonstrates modern frontend practices such as component-driven architecture, state management, and responsive design.

---

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React 18, App Router, SSR/CSR)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)  
- **Data Fetching:** Native Fetch API + [DummyJSON](https://dummyjson.com/products)  
- **Persistence:** LocalStorage (cart & wishlist)
- **Build & Deploy:** Vercel / Netlify  
- **Version Control:** Git & GitHub

---

## 📌 Features

### 🏠 Home Page
- Hero banner (static / carousel)  
- Featured categories grid  
- Trending products section  

### 📃 Product Listing Page (PLP)
- Filters → Category, Brand, Price Range, Rating  
- Sorting → Relevance, Price (Low → High), Newest  
- Infinite scroll  
- Search bar with debounce  

### 📦 Product Detail Page (PDP)
- Image carousel (3+ images)  
- Quantity selectors  
- Add to cart / wishlist  
- Similar products carousel  

### 🛒 Cart Page
- Product summary with quantity controls  
- Remove item option  
- Apply promo code (dummy logic)  
- Price breakdown (MRP, discount, tax, total)  
- Sticky mobile checkout bar 

### ❤️ Wishlist Page
- Save products for later  
- Move items from wishlist to cart  
- Remove items easily  
- Persistent storage with LocalStorage  

### ✅ Checkout Page
- Dummy form (Name, Email, Address, etc.)  
- Success message after submission  

---



🎨 Design Choices

Component-driven architecture → Highly reusable ProductCard, Filters, Header, WishlistItem etc.
Responsive-first → Mobile-first layouts with Tailwind CSS.
Performance → Debounced search, infinite scroll, and memoized components.
Scalability → Redux Toolkit for predictable state management.


## 🔗 Demo & Repository

🚀 **Live Demo:** [mini-e-commerce-fe.vercel.app](https://mini-e-commerce-fe.vercel.app/)  
💻 **GitHub Repo:** [github.com/laxman939/Mini-E-commerce](https://github.com/laxman939/Mini-E-commerce)

---



👨‍💻 Author

Laxman Aavuladoddi
Frontend Developer | React & Next.js Enthusiast 🚀
