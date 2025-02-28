import { createContext, useContext, useEffect, useState } from "react";
import { websiteService } from "../services/websiteService";
import { useAuth } from "./authContext";
import WebsiteIntegrationFlow from "../components/WebsiteIntegrationFlow";

const WebsiteContext = createContext();

export const WebsiteProvider = ({ children }) => {
    const { user } = useAuth();
    const [websites, setWebsites] = useState(null);
    const [selectedWebsite, setSelectedWebsite] = useState(null);
    const [isAddingWebsite, setIsAddingWebsite] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);

    useEffect(() => {
        if (!user) {
            setWebsites(null);
            setSelectedWebsite(null);
            return;
        }

        let isMounted = true;

        const fetchUserWebsites = async () => {
            try {
                const userWebsites = await websiteService.getWebsites();
                if (!isMounted) return;
                setWebsites(userWebsites);
                setSelectedWebsite(userWebsites[0] ?? null);
            } catch (error) {
                console.error("Failed to load websites:", error);
            }
        };

        fetchUserWebsites();

        return () => {
            isMounted = false;
        };
    }, [user]);

    const handleAddWebsite = async (domain) => {
        setIsAddingWebsite(true);
        try {
            const newWebsite = await websiteService.createWebsite(domain);
            setWebsites((prev) =>
                prev ? [...prev, newWebsite] : [newWebsite],
            );
            setSelectedWebsite(newWebsite);
            return newWebsite;
        } catch (error) {
            console.error("Website creation failed:", error);
            throw error;
        } finally {
            setIsAddingWebsite(false);
        }
    };

    return (
        <WebsiteContext.Provider
            value={{
                websites,
                selectedWebsite,
                isAddingWebsite,
                handleAddWebsite,
                setSelectedWebsite,
                setIsShowModal,
                isShowModal,
            }}>
            {children}
            <WebsiteIntegrationFlow
                setShowDialog={setIsShowModal}
                showDialog={isShowModal}
            />
        </WebsiteContext.Provider>
    );
};

export const useWebsite = () => {
    const context = useContext(WebsiteContext);
    if (!context) {
        throw new Error("useWebsite must be used within a WebsiteProvider");
    }
    return context;
};
