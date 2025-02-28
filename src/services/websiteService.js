import api from "../api/axios";

export const websiteService = {
    getWebsites: async () => {
        const { data } = await api.get("/api/v1/websites/get");
        return data;
    },

    createWebsite: async (domain) => {
        const { data } = await api.post("/api/v1/websites/create", { domain });
        return data;
    },

    getOverviewData: async (websiteId) => {
        const { data } = await api.get(`/api/v1/analytics/stats/${websiteId}`);
        return data;
    },

    getTimeseries: async (websiteId) => {
        const { data } = await api.get(
            `/api/v1/analytics/timeseries/${websiteId}`,
        );
        return data;
    },

    getSessions: async (websiteId) => {
        const { data } = await api.get(
            `/api/v1/analytics/sessions/${websiteId}`,
        );
        return data;
    },

    getEventsData: async (websiteId) => {
        const { data } = await api.get(`/api/v1/analytics/events/${websiteId}`);
        return data;
    },

    getPageViewsData: async (websiteId) => {
        const { data } = await api.get(
            `/api/v1/analytics/pageviews/${websiteId}`,
        );
        return data;
    },
};
