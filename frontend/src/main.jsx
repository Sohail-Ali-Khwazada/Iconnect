import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import ProtectedRoute from './components/Protectedroute.jsx';
import { GlobalContextProvider } from './context/GlobalContext.jsx';
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
    <GlobalContextProvider>
      <SocketContextProvider>
        <RouterProvider router={router} />
        <Toaster />
      </SocketContextProvider>
    </GlobalContextProvider>
  </React.StrictMode>
)
