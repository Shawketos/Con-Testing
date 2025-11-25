import React, { useEffect, useState } from "react";
import { api, handleApiError } from "../../lib/api";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data } = await api.get("/notifications/get");
                setNotifications(data.notifications || []);
            } catch (err) {
                setError(handleApiError(err));
            }
        };
        fetchNotifications();
    }, []);

    return (
        <section className="max-w-4xl mx-auto space-y-8">
            <header className="space-y-2">
                <p className="text-sm uppercase tracking-[0.3em] text-brand-accent">Signals</p>
                <h2 className="text-3xl font-display font-semibold">Notification Stream</h2>
                <p className="text-slate-400">Public and private updates arrive in a cinematic feed.</p>
            </header>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <div className="space-y-4">
                {notifications.length === 0 ? (
                    <div className="rounded-3xl border border-white/10 p-8 text-center text-slate-500">
                        No updates yet. Stay tuned for drops and alerts.
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <article
                            key={notification._id}
                            className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.05] to-transparent p-6"
                        >
                            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500 mb-2">
                                <span>{notification.type}</span>
                                <span>{new Date(notification.createdAt).toLocaleString()}</span>
                            </div>
                            <h3 className="text-xl text-white font-semibold">{notification.title}</h3>
                            <p className="text-slate-300 mt-2">{notification.message}</p>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
};

export default Notifications;

