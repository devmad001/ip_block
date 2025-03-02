"use client";

import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "../../components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import ErrorMessage from "../../components/ui/errorMessage";
import LoadingOverlay from "../../components/ui/loadingOverlay";
import { useWebsite } from "../../contexts/websiteContext";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Plus, Ban, Unlock, AlertTriangle } from "lucide-react";
import { ipBlockService } from "../../services/ipBlockService";
import { toast } from "react-toastify";

const ipVisitsData = [
    { ip: "192.168.1.1", visits: 300 },
    { ip: "198.51.100.12", visits: 120 },
    { ip: "203.0.113.5", visits: 200 },
];

export default function IpBlockReport() {
    const { selectedWebsite } = useWebsite();
    const [newIp, setNewIp] = useState("");
    const [blockReason, setBlockReason] = useState("");

    // Dummy Data to be used for the report
    const dummyData = {
        totalVisits: 5000,
        blockedIps: [
            {
                ip: "192.168.1.1",
                country: "USA",
                attempts: 15,
                lastAccess: "2025-02-28 12:00:00",
            },
            {
                ip: "172.16.0.1",
                country: "Germany",
                attempts: 8,
                lastAccess: "2025-02-28 14:30:00",
            },
            {
                ip: "203.0.113.5",
                country: "India",
                attempts: 20,
                lastAccess: "2025-02-28 13:00:00",
            },
        ],
        suspiciousActivity: [
            {
                ip: "192.168.1.1",
                attempts: 15,
                firstAttempt: "2025-02-28 10:00:00",
                lastAttempt: "2025-02-28 12:00:00",
            },
            {
                ip: "198.51.100.12",
                attempts: 18,
                firstAttempt: "2025-02-28 11:30:00",
                lastAttempt: "2025-02-28 13:00:00",
            },
        ],
        ipVisits: [
            { ip: "192.168.1.1", visits: 300 },
            { ip: "198.51.100.12", visits: 120 },
            { ip: "203.0.113.5", visits: 200 },
        ],
    };

    // State initialization
    const [reportState, setReportState] = useState({
        data: dummyData,
        loading: false,
        error: null,
    });

    const handleBlockIp = async () => {
        try {
            await ipBlockService.blockIp(selectedWebsite.id, {
                ip: newIp,
                reason: blockReason,
            });
            toast({
                title: "IP Blocked",
                description: `Successfully blocked IP address: ${newIp}`,
            });
            // Refresh data
            fetchData();
            setNewIp("");
            setBlockReason("");
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to block IP address",
                variant: "destructive",
            });
        }
    };

    const handleUnblockIp = async (ip) => {
        try {
            await ipBlockService.unblockIp(selectedWebsite.id, ip);
            toast({
                title: "IP Unblocked",
                description: `Successfully unblocked IP address: ${ip}`,
            });
            // Refresh data
            fetchData();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to unblock IP address",
                variant: "destructive",
            });
        }
    };

    const fetchData = async () => {
        if (!selectedWebsite?.id) return;

        setReportState((prev) => ({ ...prev, loading: true }));
        try {
            const [blockedIps, stats, rules] = await Promise.all([
                ipBlockService.getBlockedIps(selectedWebsite.id),
                ipBlockService.getBlockStats(selectedWebsite.id),
                ipBlockService.getBlockRules(selectedWebsite.id),
            ]);

            setReportState({
                data: {
                    ...reportState.data,
                    blockedIps,
                    stats,
                    rules,
                },
                loading: false,
                error: null,
            });
        } catch (error) {
            setReportState((prev) => ({
                ...prev,
                loading: false,
                error: "Failed to fetch IP block data",
            }));
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedWebsite?.id]);

    if (reportState.loading) {
        return <LoadingOverlay />;
    }

    if (reportState.error) {
        return <ErrorMessage message={reportState.error} />;
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold">IP Block Report</h1>
                    <p className="text-muted-foreground">
                        Insights into IP-related traffic and blocked access
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Enter IP address"
                        value={newIp}
                        onChange={(e) => setNewIp(e.target.value)}
                    />
                    <Input
                        placeholder="Block reason"
                        value={blockReason}
                        onChange={(e) => setBlockReason(e.target.value)}
                    />
                    <Button onClick={handleBlockIp}>
                        <Plus className="h-4 w-4 mr-2" />
                        Block IP
                    </Button>
                </div>
            </div>

            <KeyMetrics metrics={reportState.data} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <IpVisitsChart ipVisits={reportState.data.ipVisits} />
                <SuspiciousActivityTable
                    activities={reportState.data.suspiciousActivity}
                />
            </div>

            <BlockedIpsTable
                blockedIps={reportState.data.blockedIps}
                onUnblock={handleUnblockIp}
            />
        </div>
    );
}

// Key Metrics Component
export const KeyMetrics = ({ metrics }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Visits
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">
                        {metrics.totalVisits}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// IP Visits Chart Component
export const IpVisitsChart = ({ ipVisits }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>IP Visits Overview</CardTitle>
                <CardDescription>
                    Visit counts from different IP addresses
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* Add your chart here */}
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ipVisits}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                className="stroke-muted"
                            />
                            <XAxis dataKey="ip" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--background))",
                                    borderColor: "hsl(var(--border))",
                                    borderRadius: "8px",
                                }}
                            />
                            <Bar
                                dataKey="visits"
                                fill="hsl(var(--primary))"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

// Suspicious Activity Table Component
export const SuspiciousActivityTable = ({ activities }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Suspicious Activity</CardTitle>
                <CardDescription>
                    Possible malicious activity detected based on IP behavior
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>IP Address</TableHead>
                            <TableHead>Attempts</TableHead>
                            <TableHead>First Attempt</TableHead>
                            <TableHead>Last Attempt</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activities.map((activity) => (
                            <TableRow key={activity.ip}>
                                <TableCell>{activity.ip}</TableCell>
                                <TableCell>{activity.attempts}</TableCell>
                                <TableCell>{activity.firstAttempt}</TableCell>
                                <TableCell>{activity.lastAttempt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

// Enhanced Blocked IPs Table Component with unblock functionality
export const BlockedIpsTable = ({ blockedIps, onUnblock }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Blocked IPs</CardTitle>
                <CardDescription>
                    IPs that have been blocked due to suspicious behavior
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>IP Address</TableHead>
                            <TableHead>Country</TableHead>
                            <TableHead>Attempts</TableHead>
                            <TableHead>Last Access</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {blockedIps.map((ip) => (
                            <TableRow key={ip.ip}>
                                <TableCell>{ip.ip}</TableCell>
                                <TableCell>{ip.country}</TableCell>
                                <TableCell>{ip.attempts}</TableCell>
                                <TableCell>{ip.lastAccess}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                        {ip.reason || "Suspicious Activity"}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onUnblock(ip.ip)}>
                                        <Unlock className="h-4 w-4 mr-2" />
                                        Unblock
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
