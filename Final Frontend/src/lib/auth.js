const decodeToken = (token) => {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(window.atob(base64));
    } catch (error) {
        return null;
    }
};

export const getToken = () => localStorage.getItem("token");

export const setToken = (token) => {
    if (token) {
        localStorage.setItem("token", token);
    }
};

export const clearToken = () => {
    localStorage.removeItem("token");
};

export const getCurrentUser = () => {
    const token = getToken();
    if (!token) return null;
    return decodeToken(token);
};

export const isAdmin = () => {
    const user = getCurrentUser();
    return user?.role === "admin";
};

