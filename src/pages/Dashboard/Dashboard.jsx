import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    Users,
    MousePointerClick,
    Layout,
    Satellite,
    RefreshCw,
    FileText,
    Clock1,
    MousePointer,
    Globe,
    Lock,
    Shield,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "../../components/ui/card";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableHeader,
} from "../../components/ui/table";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from "recharts";
import { useWebsite } from "../../contexts/websiteContext";
import { format } from "date-fns";
import { websiteService } from "../../services/websiteService";
import { ipBlockService } from "../../services/ipBlockService";
import { toast } from "react-toastify";

const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
});

const STATS_CONFIG = [
    {
        title: "Total Visits",
        key: "totalVisits",
        icon: Users,
        color: "bg-blue-100 text-blue-600",
        bodyColor: "bg-blue-50",
        trendColor: "text-blue-600",
    },
    {
        title: "Blocked Visits",
        key: "blockedVisits",
        icon: Lock,
        color: "bg-red-100 text-red-600",
        bodyColor: "bg-red-50",
        trendColor: "text-red-600",
    },
    {
        title: "Bot Traffic",
        key: "botTraffic",
        icon: Satellite,
        color: "bg-purple-100 text-purple-600",
        bodyColor: "bg-purple-50",
        trendColor: "text-purple-600",
    },
    {
        title: "Same IP Visits",
        key: "sameIpVisits",
        icon: MousePointerClick,
        color: "bg-amber-100 text-amber-600",
        bodyColor: "bg-amber-50",
        trendColor: "text-amber-600",
    },
    {
        title: "Suspicious Activity",
        key: "suspiciousActivity",
        icon: FileText,
        color: "bg-emerald-100 text-emerald-600",
        bodyColor: "bg-emerald-50",
        trendColor: "text-emerald-600",
    },
];

const Dashboard = () => {
    const { selectedWebsite } = useWebsite();

    const [dashboardData, setDashboardData] = useState({
        overview: {
            totalVisits: 5000,
            blockedVisits: 200,
            botTraffic: 100,
            sameIpVisits: 50,
            suspiciousActivity: 30,
        },
        blockStats: {
            total: 250,
            byReason: [
                { name: "Suspicious Activity", value: 120 },
                { name: "Bot Traffic", value: 80 },
                { name: "Manual Block", value: 50 },
            ],
            byCountry: [
                { name: "United States", value: 85 },
                { name: "China", value: 65 },
                { name: "Russia", value: 45 },
                { name: "India", value: 35 },
                { name: "Others", value: 20 },
            ],
        },
        events: [
            {
                id: "1",
                data: {
                    element: "BUTTON",
                    href: "/api/admin",
                    text: "Admin Access Attempt",
                },
                session: {
                    country: "RU",
                    deviceType: "desktop",
                    browser: "Chrome",
                },
                createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
            },
            {
                id: "2",
                data: {
                    element: "NAVIGATION",
                    href: "/login",
                    text: "Repeated Login Attempts",
                },
                session: {
                    country: "CN",
                    deviceType: "mobile",
                    browser: "Safari",
                },
                createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
            },
            {
                id: "3",
                data: {
                    element: "A",
                    href: "/user/data",
                    text: "Unauthorized Data Access",
                },
                session: {
                    country: "US",
                    deviceType: "desktop",
                    browser: "Firefox",
                },
                createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
            },
            {
                id: "4",
                data: {
                    element: "BUTTON",
                    href: "/settings",
                    text: "Multiple Settings Changes",
                },
                session: {
                    country: "IN",
                    deviceType: "tablet",
                    browser: "Edge",
                },
                createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
            },
            {
                id: "5",
                data: {
                    element: "NAVIGATION",
                    href: "/api/users",
                    text: "API Scan Attempt",
                },
                session: {
                    country: "BR",
                    deviceType: "desktop",
                    browser: "Chrome",
                },
                createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
            },
        ],
        loading: false,
    });

    useEffect(() => {
        if (!selectedWebsite?.id) return;

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            try {
                const [overview, events, blockStats] = await Promise.all([
                    websiteService.getOverviewData(selectedWebsite.id),
                    websiteService.getEventsData(selectedWebsite.id),
                    ipBlockService.getBlockStats(selectedWebsite.id),
                ]);

                setDashboardData({
                    overview,
                    events,
                    blockStats,
                    loading: false,
                });
            } catch (error) {
                if (!signal.aborted) {
                    setDashboardData((prev) => ({ ...prev, loading: false }));
                }
            }
        };

        setDashboardData((prev) => ({ ...prev, loading: true }));
        fetchData();

        return () => controller.abort();
    }, [selectedWebsite?.id]);

    const stats = useMemo(
        () =>
            STATS_CONFIG.map((config) => ({
                ...config,
                value: dashboardData.overview?.[config.key] ?? "-",
                metric: "2.4% ↑",
                trend: "up",
            })),
        [dashboardData.overview],
    );

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">IP Block Dashboard</h1>
                <p className="text-muted-foreground">
                    Monitor and analyze suspicious and malicious traffic on your
                    website.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <motion.div key={stat.title} {...fadeIn(index * 0.1)}>
                        <Card className="hover:shadow-lg transition-shadow border-none overflow-hidden">
                            <CardHeader
                                className={`flex flex-row items-center justify-between space-y-0 pb-2 ${stat.color}`}>
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className="h-5 w-5" />
                            </CardHeader>
                            <CardContent className={`pt-4 ${stat.bodyColor}`}>
                                <div
                                    className={`text-3xl font-bold ${stat.trendColor}`}>
                                    {stat.value}
                                </div>
                                <div className="flex items-center gap-1 text-sm mt-2">
                                    <span
                                        className={`${stat.trendColor} flex items-center font-medium`}>
                                        <RefreshCw className="h-4 w-4 mr-1" />
                                        {stat.metric}
                                    </span>
                                    <span className="text-muted-foreground">
                                        vs previous period
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* IP Block Status Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div {...fadeIn(0.3)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                IP Block Distribution by Reason
                            </CardTitle>
                            <CardDescription>
                                Distribution of blocked IPs categorized by
                                blocking reason
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={
                                                dashboardData.blockStats
                                                    .byReason
                                            }
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="hsl(var(--primary))"
                                            label>
                                            {dashboardData.blockStats.byReason.map(
                                                (entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={`hsl(${index * 40}, 70%, 50%)`}
                                                    />
                                                ),
                                            )}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor:
                                                    "hsl(var(--background))",
                                                borderColor:
                                                    "hsl(var(--border))",
                                                borderRadius: "8px",
                                            }}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div {...fadeIn(0.4)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                IP Block Distribution by Country
                            </CardTitle>
                            <CardDescription>
                                Geographical distribution of blocked IP
                                addresses
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={
                                                dashboardData.blockStats
                                                    .byCountry
                                            }
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="hsl(var(--primary))"
                                            label>
                                            {dashboardData.blockStats.byCountry.map(
                                                (entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={`hsl(${index * 40}, 70%, 50%)`}
                                                    />
                                                ),
                                            )}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor:
                                                    "hsl(var(--background))",
                                                borderColor:
                                                    "hsl(var(--border))",
                                                borderRadius: "8px",
                                            }}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <motion.div {...fadeIn(0.4)}>
                <RecentEventsTable
                    events={dashboardData.events.slice(0, 5)}
                    title={"Recent Suspicious Activity"}
                    description={
                        "Latest suspicious or malicious activities detected"
                    }
                    loading={dashboardData.loading}
                />
            </motion.div>
        </div>
    );
};

export default Dashboard;

const getEventIcon = (eventType, element) => {
    if (element === "A" || element === "BUTTON")
        return <MousePointer className="h-4 w-4 text-muted-foreground" />;
    if (element === "NAVIGATION")
        return <Globe className="h-4 w-4 text-muted-foreground" />;
    return <FileText className="h-4 w-4 text-muted-foreground" />;
};

const getEventType = (data) => {
    if (data.element === "A") return "Link Click";
    if (data.element === "BUTTON") return "Button Click";
    if (data.element === "NAVIGATION") return "Page View";
    return "Interaction";
};

export const RecentEventsTable = ({ events, title, description }) => {
    const transformedData = events.map((event) => ({
        id: event?.id,
        eventType: getEventType(event.data),
        page: event.data.href || "Current Page",
        timestamp: format(new Date(event.createdAt), "MMM d, yyyy HH:mm:ss"),
        details: {
            element: event.data.element,
            text: event.data.text,
            country: event.session.country,
            device: event.session.deviceType,
            browser: event.session.browser,
        },
    }));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}>
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Event Type</TableHead>
                                <TableHead>Page</TableHead>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transformedData.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className="hover:bg-muted/50">
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            {getEventIcon(
                                                row.eventType,
                                                row.details.element,
                                            )}
                                            {row.eventType}
                                        </div>
                                    </TableCell>
                                    <TableCell>{row.page}</TableCell>
                                    <TableCell>{row.timestamp}</TableCell>
                                    <TableCell>
                                        <pre className="text-sm text-muted-foreground">
                                            {JSON.stringify(
                                                row.details,
                                                null,
                                                2,
                                            )}
                                        </pre>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </motion.div>
    );
};
