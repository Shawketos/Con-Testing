import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./Components/layout/AppShell";
import AuthShell from "./Components/layout/AuthShell";
import Landing from "./pages/Landing";
import Explore from "./pages/Explore";
import Cart from "./pages/dashboard/Cart";
import Notifications from "./pages/dashboard/Notifications";
import Admin from "./pages/dashboard/Admin";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ProtectedRoute, AdminRoute } from "./Components/routing/ProtectedRoute";

const App = () => (
    <Router>
        <Routes>
            <Route element={<AppShell />}>
                <Route path="/" element={<Landing />} />
                <Route path="/explore" element={<Explore />} />
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/notifications"
                    element={
                        <ProtectedRoute>
                            <Notifications />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminRoute>
                                <Admin />
                            </AdminRoute>
                        </ProtectedRoute>
                    }
                />
            </Route>

            <Route element={<AuthShell />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </Router>
);

export default App;
