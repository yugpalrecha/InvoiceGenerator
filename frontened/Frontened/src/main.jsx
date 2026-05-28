import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./api/authcontext.jsx";
import "./index.css";

// Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/signup.jsx"; // ✅ Add this (create signup.jsx)
import Dashboard from "./pages/Dashboard.jsx"; // ✅ Add this (we'll create it)
import CreateInvoice from "./pages/CreateInvoice.jsx";
import ViewAllInvoices from "./pages/ViewInvoice.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} /> ✅ Add this
          <Route path="dashboard" element={<Dashboard />} /> {/* ✅ Add this */}
          <Route path="create-invoice" element={<CreateInvoice />} /> {/* ✅ Add this */}
          <Route path="invoices"   element={<ViewAllInvoices />} /> {/* ✅ Add this */}
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);