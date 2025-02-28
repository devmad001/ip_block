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
const ipVisitsData = [
    { ip: "192.168.1.1", visits: 300 },
    { ip: "198.51.100.12", visits: 120 },
    { ip: "203.0.113.5", visits: 200 },
];

export default function IpBlockReport() {
    const { selectedWebsite } = useWebsite();

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

    // Simulate loading state
    useEffect(() => {
        setReportState({
            data: dummyData,
            loading: false,
            error: null,
        });
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
            </div>

            <KeyMetrics metrics={reportState.data} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <IpVisitsChart ipVisits={reportState.data.ipVisits} />
                <SuspiciousActivityTable
                    activities={reportState.data.suspiciousActivity}
                />
            </div>

            <BlockedIpsTable blockedIps={reportState.data.blockedIps} />
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

// Blocked IPs Table Component
export const BlockedIpsTable = ({ blockedIps }) => {
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {blockedIps.map((ip) => (
                            <TableRow key={ip.ip}>
                                <TableCell>{ip.ip}</TableCell>
                                <TableCell>{ip.country}</TableCell>
                                <TableCell>{ip.attempts}</TableCell>
                                <TableCell>{ip.lastAccess}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
