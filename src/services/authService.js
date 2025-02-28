import api from "../api/axios";

export const authService = {
    getStoredToken: () => localStorage.getItem("token"),
    setAuthHeader: (token) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    clearAuthHeader: () => {
        delete api.defaults.headers.common["Authorization"];
    },
    storeToken: (token) => {
        localStorage.setItem("token", token);
    },
    clearToken: () => {
        localStorage.removeItem("token");
    },
    fetchUser: async (token) => {
        const { data } = await api.get("/api/v1/users/me", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data.user;
    },
};
