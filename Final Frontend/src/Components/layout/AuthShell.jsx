import React from "react";
import { Outlet } from "react-router-dom";

const AuthShell = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 px-4">
        <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-brand/20 p-10">
            <Outlet />
        </div>
    </div>
);

export default AuthShell;

