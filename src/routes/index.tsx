import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ListCompany } from "../features/company/pages/ListCompany";
import { Dashboard } from "../features/dashboard/Dashboard";
import { ListUsers } from "../features/user/pages/ListUsers";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<ListUsers />} />
      <Route path="/companys" element={<ListCompany />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
