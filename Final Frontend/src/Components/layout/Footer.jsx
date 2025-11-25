import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const footerLinks = [
        { label: "About", to: "#" },
        { label: "Support", to: "#" },
        { label: "Status", to: "#" },
    ];

    return (
        <footer className="border-t border-white/10 mt-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-sm text-slate-400">
                <p>© {new Date().getFullYear()} E‑Shop Nebula. Built for the modern marketplace.</p>
                <div className="flex gap-4">
                    {footerLinks.map((link) => (
                        <Link key={link.label} to={link.to} className="hover:text-white transition">
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;

