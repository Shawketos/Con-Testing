import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";

const AppShell = () => {
    return (
        <div className="min-h-screen bg-[#030712] text-slate-100">
            <Navigation />
            <main className="pt-24 pb-16 px-4 sm:px-8 lg:px-12">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default AppShell;

