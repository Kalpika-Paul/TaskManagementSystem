import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PrivateLayout from "./components/PrivateLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TaskManage from "./pages/TaskManage/Task_table";
import TaskAdd from "./pages/TaskManage/Add";
import TaskEdit from "./pages/TaskManage/Edit";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

  
      <Route
        element={
          <PrivateRoute>
            <PrivateLayout />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/task" element={<TaskManage />} />
        <Route path="/task/add" element={<TaskAdd />} />
        <Route path="/task/edit/:id" element={<TaskEdit />} />
      </Route>

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}