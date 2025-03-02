import api from "../api/axios";

export const ipBlockService = {
    // Get all blocked IPs for a website
    getBlockedIps: async (websiteId) => {
        const { data } = await api.get(`/api/v1/ip-block/${websiteId}/list`);
        return data;
    },

    // Block an IP address
    blockIp: async (websiteId, ipData) => {
        const { data } = await api.post(`/api/v1/ip-block/${websiteId}/block`, ipData);
        return data;
    },

    // Unblock an IP address
    unblockIp: async (websiteId, ip) => {
        const { data } = await api.delete(`/api/v1/ip-block/${websiteId}/unblock/${ip}`);
        return data;
    },

    // Get IP block rules
    getBlockRules: async (websiteId) => {
        const { data } = await api.get(`/api/v1/ip-block/${websiteId}/rules`);
        return data;
    },

    // Add a new IP block rule
    addBlockRule: async (websiteId, rule) => {
        const { data } = await api.post(`/api/v1/ip-block/${websiteId}/rules`, rule);
        return data;
    },

    // Delete an IP block rule
    deleteBlockRule: async (websiteId, ruleId) => {
        const { data } = await api.delete(`/api/v1/ip-block/${websiteId}/rules/${ruleId}`);
        return data;
    },

    // Get IP block statistics
    getBlockStats: async (websiteId) => {
        const { data } = await api.get(`/api/v1/ip-block/${websiteId}/stats`);
        return data;
    }
}; 