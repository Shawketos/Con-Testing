import React, { useState } from "react";
import { api, handleApiError } from "../../lib/api";

const initialProduct = { name: "", description: "", price: "", stock: "" };
const initialNotification = { title: "", message: "", type: "public", userId: "" };

const Admin = () => {
    const [product, setProduct] = useState(initialProduct);
    const [notification, setNotification] = useState(initialNotification);
    const [status, setStatus] = useState("");

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleNotificationChange = (e) => {
        const { name, value } = e.target;
        setNotification((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "type" && value === "public" ? { userId: "" } : {}),
        }));
    };

    const submitProduct = async () => {
        try {
            await api.post("/product", {
                ...product,
                price: Number(product.price),
                stock: Number(product.stock),
            });
            setProduct(initialProduct);
            setStatus("Product published.");
        } catch (error) {
            setStatus(handleApiError(error));
        }
    };

    const submitNotification = async () => {
        try {
            await api.post("/notifications/create", notification);
            setNotification(initialNotification);
            setStatus("Notification sent.");
        } catch (error) {
            setStatus(handleApiError(error));
        }
    };

    return (
        <section className="max-w-5xl mx-auto space-y-10">
            <header className="space-y-2">
                <p className="text-sm uppercase tracking-[0.3em] text-brand-accent">Admin</p>
                <h2 className="text-3xl font-display font-semibold">Command Console</h2>
                <p className="text-slate-400">Launch drops, broadcast signals, and orchestrate content.</p>
            </header>

            {status && <p className="text-sm text-brand-accent">{status}</p>}

            <div className="grid gap-8 md:grid-cols-2">
                <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-white">Release product</h3>
                    <input
                        name="name"
                        value={product.name}
                        onChange={handleProductChange}
                        placeholder="Product name"
                        className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-brand"
                    />
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleProductChange}
                        placeholder="Tell the story"
                        rows={4}
                        className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-brand"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleProductChange}
                            placeholder="Price"
                            className="rounded-2xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-brand"
                        />
                        <input
                            type="number"
                            name="stock"
                            value={product.stock}
                            onChange={handleProductChange}
                            placeholder="Stock"
                            className="rounded-2xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-brand"
                        />
                    </div>
                    <button
                        onClick={submitProduct}
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-brand to-brand-accent text-white font-semibold shadow-glow"
                    >
                        Publish product
                    </button>
                </article>

                <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-white">Broadcast notification</h3>
                    <input
                        name="title"
                        value={notification.title}
                        onChange={handleNotificationChange}
                        placeholder="Headline"
                        className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-brand"
                    />
                    <textarea
                        name="message"
                        value={notification.message}
                        onChange={handleNotificationChange}
                        placeholder="Message"
                        rows={4}
                        className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-brand"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <select
                            name="type"
                            value={notification.type}
                            onChange={handleNotificationChange}
                            className="rounded-2xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-brand"
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                        {notification.type === "private" && (
                            <input
                                name="userId"
                                value={notification.userId}
                                onChange={handleNotificationChange}
                                placeholder="Target user ID"
                                className="rounded-2xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-brand"
                            />
                        )}
                    </div>
                    <button
                        onClick={submitNotification}
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold shadow-glow"
                    >
                        Send notification
                    </button>
                </article>
            </div>
        </section>
    );
};

export default Admin;

