
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";

import About from "./page/about.jsx";
import Services from "./page/service.jsx";
import Locations from "./page/location.jsx";
import Campaign from "./page/campaign.jsx";
import Contact from "./page/contact.jsx";
import Login from "./page/login.jsx";
import Dashboard from "./page/dashboard.jsx";
import Register from "./page/register.jsx";
import Users from "./page/Users.jsx";

import RequestCollection from "./page/requestCollection.jsx";
import ReportWaste from "./page/reportWaste.jsx";


import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/campaigns" element={<Campaign />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users />} />
        <Route path="/request-collection" element={<RequestCollection />} />
        <Route path="/report-waste" element={<ReportWaste />} />
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
