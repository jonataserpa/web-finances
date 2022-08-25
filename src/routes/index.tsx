import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ListCompany } from "../features/company/pages/ListCompany";
import { Dashboard } from "../features/dashboard/Dashboard";
import { ListPayments } from "../features/payments/pages";
import { ListReceipts } from "../features/receipts/pages";
import { ListUsers } from "../features/user/pages/ListUsers";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<ListUsers />} />
      <Route path="/companys" element={<ListCompany />} />
      <Route path="/receipts" element={<ListReceipts />} />
      <Route path="/payments" element={<ListPayments />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
