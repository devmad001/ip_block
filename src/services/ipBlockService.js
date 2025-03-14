import api from "../api/axios";

export const ipBlockService = {
    // Get all blocked IPs for a website
    getBlockedIps: async (websiteId) => {
        const { data } = await api.get(`/api/ip-monitor/`);
        return data;
    },

    // Block an IP address
    blockIp: async (websiteId, ipData) => {
        const { data } = await api.post(`/api/v1/ip-block/block`, ipData);
        return data;
    },

    // Unblock an IP address
    unblockIp: async (websiteId, ip) => {
        const { data } = await api.post(`/api/ip-monitor/status`, { ip });
        return data;
    },

    // Get IP block rules
    getBlockRules: async (websiteId) => {
        const { data } = await api.get(`/api/v1/ip-block/rules`);
        return data;
    },

    // Add a new IP block rule
    addBlockRule: async (websiteId, rule) => {
        const { data } = await api.post(`/api/v1/ip-block/rules`, rule);
        return data;
    },

    // Delete an IP block rule
    deleteBlockRule: async (websiteId, ruleId) => {
        const { data } = await api.delete(`/api/v1/ip-block/rules/${ruleId}`);
        return data;
    },

    // Get IP block statistics
    getBlockStats: async (websiteId) => {
        const { data } = await api.get(`/api/v1/ip-block/stats`);
        return data;
    },

    // Toggle IP blocking status
    toggleBlocking: async (websiteId, enabled) => {
        const { data } = await api.put(`/api/v1/ip-block/toggle`, { enabled });
        return data;
    }
}; 