import React from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../lib/auth";

const stats = [
    { label: "Products curated", value: "12K" },
    { label: "Active shoppers", value: "280K" },
    { label: "Avg. delivery", value: "48h" },
];

const highlights = [
    {
        title: "Realtime marketplace",
        body: "Live inventory, dynamic pricing, and product signals tailored to your habits.",
    },
    {
        title: "Adaptive notifications",
        body: "Fine-grained notification controls keep every shopper informed without noise.",
    },
    {
        title: "Admin command",
        body: "A powerful control center for launching drops, pinning promos, and nudging buyers.",
    },
];

const Landing = () => {
    const navigate = useNavigate();
    const user = getCurrentUser();

    return (
        <section className="max-w-6xl mx-auto grid gap-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-brand-accent/80">
                        New Era Commerce
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold leading-tight">
                        Shop the <span className="text-brand">Future</span> —
                        <br />
                        a cinematic marketplace experience.
                    </h1>
                    <p className="text-lg text-slate-300">
                        Built for modern shoppers and agile admins. Discover immersive product collections, responsive
                        notifications, and a design-forward cart & checkout flow.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => navigate("/explore")}
                            className="px-6 py-3 rounded-full bg-gradient-to-r from-brand to-brand-accent text-white font-semibold shadow-glow hover:scale-105 transition"
                        >
                            Explore Collections
                        </button>
                        {!user && (
                            <button
                                onClick={() => navigate("/register")}
                                className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition"
                            >
                                Create account
                            </button>
                        )}
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand/30 to-brand-accent/30 blur-3xl" />
                    <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 space-y-6 shadow-2xl">
                        <h3 className="text-xl font-semibold">Marketplace Radar</h3>
                        <p className="text-slate-300 text-sm">
                            Live signals highlight trending collections, personalized suggestions, and curated drops.
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            {stats.map((stat) => (
                                <div key={stat.label} className="rounded-2xl bg-white/5 p-4 text-center border border-white/5">
                                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                                    <p className="text-xs text-slate-400">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {highlights.map((item) => (
                    <div key={item.title} className="rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent p-8">
                        <h4 className="text-lg font-semibold text-white mb-3">{item.title}</h4>
                        <p className="text-sm text-slate-400">{item.body}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Landing;

