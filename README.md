# ApexGear

ApexGear is a React-based e-commerce application for browsing and managing technology products such as laptops, phones, gaming devices, audio equipment, and accessories.

## Features

### Customer
- Browse products
- Search products
- Filter products by category
- View product details
- Check product prices and stock

### Admin
- View inventory statistics
- Manage products
- Add products
- Edit products
- Delete products
- Monitor stock availability

## Tech Stack

- React
- JavaScript
- React Router
- CSS
- JSON Server
- Vite
- Vitest
- React Testing Library

## Getting Started

### Install dependencies

```bash
npm install

Start the API
npm run server
Start the application
npm run dev

The application runs at:

http://localhost:5173


Testing

Run the tests with:

npm test

Or run them once:

npm test -- --run


Project Structure
src/
├── components/
├── context/
├── hooks/
├── pages/
├── services/
├── styles/
└── tests/


Team
Member	Main Contribution
Alex Sigei	Project architecture, admin dashboard, UI styling and integration
Peter Mulwa	Admin product CRUD
Caleb Blessings	Product catalogue, search, filtering and product details


API

ApexGear uses JSON Server as a local REST API.

Product data is stored in:

db.json

Main API operations include:

GET    /products
GET    /products/:id
POST   /products
PATCH  /products/:id
DELETE /products/:id
Project Goals

ApexGear demonstrates the use of React to build a component-based e-commerce application with:

Reusable components
Client-side routing
Context-based state management
Custom hooks
REST API integration
CRUD operations
Automated testing
License

This project was developed as part of a group academic project.