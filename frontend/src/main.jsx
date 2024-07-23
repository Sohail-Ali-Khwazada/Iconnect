import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Login from "./components/Login";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import { AuthContextProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/Protectedroute.jsx';
import { SocketContextProvider } from './context/SocketContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <RouterProvider router={router} />
        <Toaster />
      </SocketContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
