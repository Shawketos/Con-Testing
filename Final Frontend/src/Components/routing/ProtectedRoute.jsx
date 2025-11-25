import React from "react";
import { Navigate } from "react-router-dom";
import { getToken, getCurrentUser } from "../../lib/auth";

export const ProtectedRoute = ({ children }) => {
    return getToken() ? children : <Navigate to="/login" replace />;
};

export const AdminRoute = ({ children }) => {
    const user = getCurrentUser();
    return user?.role === "admin" ? children : <Navigate to="/" replace />;
};

