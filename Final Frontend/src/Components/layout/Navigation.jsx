import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { clearToken, getCurrentUser } from "../../lib/auth";

const navItems = [
    { to: "/", label: "Home" },
    { to: "/explore", label: "Collections" },
    { to: "/cart", label: "Cart", protected: true },
    { to: "/notifications", label: "Signals", protected: true },
    { to: "/admin", label: "Command", adminOnly: true },
];

const Navigation = () => {
    const navigate = useNavigate();
    const user = getCurrentUser();

    const handleLogout = () => {
        clearToken();
        navigate("/login", { replace: true });
    };

    const renderLink = (item) => {
        if (item.adminOnly && user?.role !== "admin") return null;
        if (item.protected && !user) return null;

        return (
            <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                    [
                        "px-4 py-2 text-sm font-medium rounded-full transition",
                        isActive
                            ? "bg-white/10 text-white shadow-glow"
                            : "text-slate-300 hover:text-white hover:bg-white/5",
                    ].join(" ")
                }
            >
                {item.label}
            </NavLink>
        );
    };

    return (
        <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-[#030712]/70 border-b border-white/10">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
                <Link to="/" className="text-xl font-display font-bold tracking-tight text-white">
                    E‑Shop
                </Link>
                <nav className="hidden md:flex gap-2">{navItems.map(renderLink)}</nav>
                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <div className="text-right">
                                <p className="text-sm font-semibold">{user.name || "Explorer"}</p>
                                <p className="text-xs text-slate-400">{user.role}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-brand to-brand-accent rounded-full shadow-glow hover:scale-105 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate("/login")}
                                className="px-4 py-2 text-sm font-semibold text-white/80 hover:text-white transition"
                            >
                                Sign in
                            </button>
                            <button
                                onClick={() => navigate("/register")}
                                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-brand to-brand-accent rounded-full shadow-glow hover:scale-105 transition"
                            >
                                Join
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className="md:hidden px-4 pb-4 flex flex-wrap gap-2">
                {navItems.map(renderLink)}
            </div>
        </header>
    );
};

export default Navigation;

