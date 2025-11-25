import React, { useEffect, useState } from "react";
import { api, handleApiError } from "../../lib/api";

const Cart = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const fetchCart = async () => {
        try {
            setLoading(true);
            const { data } = await api.get("/cart");
            setItems(data.cartDetail || data.items || []);
        } catch (error) {
            setMessage(handleApiError(error));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const removeItem = async (productId) => {
        try {
            await api.delete("/cart", { data: { productId } });
            setItems((prev) => prev.filter((item) => item.productId !== productId));
        } catch (error) {
            setMessage(handleApiError(error));
        }
    };

    const checkout = async () => {
        try {
            const { data } = await api.post("/cart/checkout");
            setItems([]);
            setMessage(`Checkout successful. Total: $${data.total?.toFixed?.(2) || data.total}`);
        } catch (error) {
            setMessage(handleApiError(error));
        }
    };

    if (loading) {
        return <div className="text-center py-16 text-slate-400">Syncing your cart...</div>;
    }

    return (
        <section className="max-w-5xl mx-auto space-y-8">
            <header className="space-y-2">
                <p className="text-sm uppercase tracking-[0.3em] text-brand-accent">Cart</p>
                <h2 className="text-3xl font-display font-semibold">Command Center</h2>
                <p className="text-slate-400">Review, edit, and finalize your selections.</p>
            </header>

            {message && <p className="text-sm text-brand-accent">{message}</p>}

            {items.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-white/10 p-10 text-center text-slate-500">
                    Your cart is empty. Explore collections to add gear.
                </div>
            ) : (
                <div className="space-y-4">
                    {items.map((item) => {
                        const label = item.name || item.product?.name || "Product";
                        const priceValue = Number(item.price ?? item.product?.price ?? 0);
                        return (
                        <article
                            key={item.productId}
                            className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div>
                                    <h3 className="text-lg font-semibold text-white">{label}</h3>
                                <p className="text-sm text-slate-400">Qty: {item.quantity}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                    <p className="text-xl font-semibold text-brand-accent">${priceValue.toFixed(2)}</p>
                                <button
                                    onClick={() => removeItem(item.productId)}
                                    className="px-4 py-2 rounded-full border border-red-500/40 text-sm font-semibold text-red-300 hover:bg-red-500/20 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </article>
                        );
                    })}
                    <button
                        onClick={checkout}
                        className="w-full md:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-brand to-brand-accent text-white font-semibold shadow-glow hover:scale-[1.02] transition"
                    >
                        Checkout
                    </button>
                </div>
            )}
        </section>
    );
};

export default Cart;

