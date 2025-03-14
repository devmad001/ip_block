import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "./ui/card";
import { toast } from "react-toastify";
import api from "../api/axios";

export const BlockIPForm = () => {
    const [ip, setIp] = useState("");
    const [reason, setReason] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.post("api/ip-monitor/block", {
                ip,
                reason,
            });

            toast.success("IP blocked successfully");
            setIp("");
            setReason("");
        } catch (error) {
            console.error("Error blocking IP:", error);
            toast.error(error.response?.data?.error || "Failed to block IP");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Block IP Address</CardTitle>
                <CardDescription>
                    Enter an IP address to block it from accessing your website
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="ip" className="text-sm font-medium">
                            IP Address
                        </label>
                        <Input
                            id="ip"
                            placeholder="Enter IP address (e.g., 192.168.1.1)"
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="reason" className="text-sm font-medium">
                            Reason for Blocking
                        </label>
                        <Input
                            id="reason"
                            placeholder="Enter reason for blocking this IP"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Blocking..." : "Block IP"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};
