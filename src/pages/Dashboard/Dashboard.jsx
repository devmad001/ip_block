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
import { useWebsite } from "../../contexts/websiteContext";
import { format } from "date-fns";
import { websiteService } from "../../services/websiteService";

const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
});

const STATS_CONFIG = [
    { title: "Total Visits", key: "totalVisits", icon: Users },
    { title: "Blocked Visits", key: "blockedVisits", icon: Lock },
    { title: "Bot Traffic", key: "botTraffic", icon: Satellite },
    { title: "Same IP Visits", key: "sameIpVisits", icon: MousePointerClick },
    { title: "Suspicious Activity", key: "suspiciousActivity", icon: FileText },
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
        events: [
            // Sample events data
        ],
        loading: false,
    });

    useEffect(() => {
        if (!selectedWebsite?.id) return;

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            try {
                const [overview, events] = await Promise.all([
                    websiteService.getOverviewData(selectedWebsite.id),
                    websiteService.getEventsData(selectedWebsite.id),
                ]);

                setDashboardData({
                    overview,
                    events,
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
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className="h-5 w-5 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stat.value}
                                </div>
                                <div className="flex items-center gap-1 text-sm mt-2">
                                    <span
                                        className={`${
                                            stat.trend === "up"
                                                ? "text-green-500"
                                                : "text-red-500"
                                        } flex items-center`}>
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
