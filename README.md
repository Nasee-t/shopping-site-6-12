# Smart Shopping Cart App

A Redux Toolkit based shopping cart application with live backend synchronization, global notifications, and persistent cart state.

---

# Features

* Product gallery with cart functionality
* Global state management using Redux Toolkit
* Automatic cart synchronization with backend
* Persistent cart data using SQLite
* Global notifications for loading/success/error states
* Async thunks for API communication
* Integration and Redux testing using Jest and React Testing Library

---

# Tech Stack

## Frontend

* React
* Redux Toolkit
* Vite

## Backend

* Node.js
* Express
* SQLite

---

# Backend Setup

## Open a New Terminal and Move to Backend Folder

```bash
cd backend
```

## Install Dependencies

```bash
npm install
```

## Start Backend Server

```bash
node server.js
```

Backend runs on:

```text
http://localhost:8080
```

SQLite database file (`shopping_cart.db`) will be created automatically.

---


# Frontend Setup

## Install Dependencies

```bash
npm install
```

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```
---

# Running Tests

Inside frontend folder:

```bash
npm test
```

---

# Main Functionalities Tested

* Redux slice logic
* Cart add/remove/update functionality
* UI rendering
* Integration testing with Redux Provider
* Async thunk behavior
* API mocking and error handling

---

# Notes

* Cart data is automatically fetched on app startup.
* Cart sync requests are skipped during the initial load to prevent overwriting saved backend data.
* Notifications automatically disappear after a few seconds.
