import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./components/public/Login";
import Layout from "./components/layout/Layout";
import Register from "./components/public/Register";
import Dashboard from "./components/user/Dashboard";
import DashboardLayout from "./components/layout/DashboardLayout";
import DetailTransaction from "./components/user/DetailTransaction";
import CreateTransaction from "./components/user/CreateTransaction";
import Profile from "./components/user/Profile";
import EditTransaction from "./components/user/EditTransaction";
import LandingPage from "./components/public/LandingPage";
import ChartPage from "./components/user/ChartPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions">
            <Route index element={<DetailTransaction />} />
            <Route path="chart" element={<ChartPage />} />
            <Route path="add" element={<CreateTransaction />} />
            <Route path="edit/:id" element={<EditTransaction />} />
          </Route>

          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<div>404 not found</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
