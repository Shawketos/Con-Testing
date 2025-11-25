import React, { useEffect, useState, useRef } from "react";
import { api, handleApiError } from "../lib/api";

const Explore = () => {
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState("");
    const searchTimeoutRef = useRef(null);

    const fetchProducts = async (searchTerm = query) => {
        try {
            setLoading(true);
            const params = searchTerm ? { query: searchTerm } : {};
            const { data } = await api.get("/product/search", { params });
            setProducts(data.products || []);
            if (data.products?.length) {
                const message = searchTerm
                    ? `Found ${data.products.length} product${data.products.length !== 1 ? "s" : ""}`
                    : `Showing all ${data.products.length} product${data.products.length !== 1 ? "s" : ""}`;
                setFeedback(message);
                // Clear success message after 3 seconds
                setTimeout(() => setFeedback(""), 3000);
            } else {
                setFeedback(
                    searchTerm
                        ? "No products found. Try a different keyword or clear to see all."
                        : "No products available yet."
                );
            }
        } catch (error) {
            setProducts([]);
            setFeedback(handleApiError(error));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addToCart = async (productId) => {
        try {
            await api.post("/cart", { productId });
            setFeedback("Added to cart.");
            setTimeout(() => setFeedback(""), 2000);
        } catch (error) {
            setFeedback(handleApiError(error));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const term = query.trim();
        fetchProducts(term);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        
        // Clear existing timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        
        // Debounce search - wait 500ms after user stops typing
        searchTimeoutRef.current = setTimeout(() => {
            const term = value.trim();
            fetchProducts(term);
        }, 500);
    };

    useEffect(() => {
        // Cleanup timeout on unmount
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    const handleClearSearch = () => {
        // Cancel any pending search
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        setQuery("");
        fetchProducts("");
    };

    return (
        <section className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-6 mb-10">
                <div className="space-y-2">
                    <p className="text-sm text-brand-accent uppercase tracking-[0.3em]">Collections</p>
                    <h2 className="text-3xl md:text-4xl font-display font-semibold">Explore curated drops</h2>
                    <p className="text-slate-400 max-w-2xl">
                        Browse all products or search to filter. Type to search, clear to see everything.
                    </p>
                </div>
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            placeholder="Search products or leave empty to see all…"
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-white placeholder:text-slate-500 focus:border-brand focus:ring-2 focus:ring-brand/30 outline-none"
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-brand to-brand-accent text-white font-semibold shadow-glow hover:scale-[1.02] transition"
                    >
                        Search
                    </button>
                </form>
                {feedback && <p className="text-sm text-brand-accent">{feedback}</p>}
            </div>

            {loading ? (
                <div className="py-20 text-center text-slate-400">Loading curated items…</div>
            ) : products.length ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <article
                            key={product._id}
                            className="rounded-3xl border border-white/5 bg-white/[0.04] backdrop-blur-xl p-6 flex flex-col gap-4 hover:border-brand/40 transition"
                        >
                            <div>
                                <p className="text-xs uppercase tracking-[0.4em] text-brand-accent">Featured</p>
                                <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                            </div>
                            <p className="text-sm text-slate-400 flex-1">{product.description}</p>
                            <div className="flex items-center justify-between">
                                <p className="text-lg font-semibold text-brand-accent">${Number(product.price).toFixed(2)}</p>
                                <button
                                    onClick={() => addToCart(product._id)}
                                    className="px-4 py-2 rounded-full border border-brand-accent/40 text-sm font-semibold text-white hover:bg-brand hover:border-brand transition"
                                >
                                    Add to cart
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center text-slate-500">No items to display.</div>
            )}
        </section>
    );
};

export default Explore;

