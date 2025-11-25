import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, handleApiError } from "../../lib/api";
import { setToken } from "../../lib/auth";

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            setLoading(true);
            const { data } = await api.post("/user/register", form);
            if (data.token) {
                setToken(data.token);
                navigate("/cart", { replace: true });
            } else {
                navigate("/login", { replace: true });
            }
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <header className="space-y-2 text-center">
                <p className="text-sm text-brand-accent uppercase tracking-[0.3em]">Create account</p>
                <h1 className="text-3xl font-display font-semibold text-white">Join the Nebula marketplace</h1>
                <p className="text-slate-400 text-sm">Unlock personalized drops, signals, and a futuristic cart.</p>
            </header>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand outline-none"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand outline-none"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand outline-none"
                    required
                />
                {error && <p className="text-sm text-red-400">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-brand to-brand-accent text-white font-semibold shadow-glow disabled:opacity-60"
                >
                    {loading ? "Creating account…" : "Create account"}
                </button>
            </form>
            <p className="text-center text-sm text-slate-400">
                Already have access?{" "}
                <Link to="/login" className="text-brand-accent font-semibold">
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default Register;

