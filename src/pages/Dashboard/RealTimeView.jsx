"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, Monitor, Smartphone, Clock, Users, MapPin } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import { ScrollArea } from "../../components/ui/scroll-area";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    RadialBarChart,
    RadialBar,
} from "recharts";

const initialData = [
    {
        id: "1",
        country: "US",
        device: "desktop",
        page: "/home",
        duration: 127,
        referrer: "Google",
        ip: "192.168.1.1", // Simulating IP Address
    },
    {
        id: "2",
        country: "IN",
        device: "mobile",
        page: "/blog",
        duration: 45,
        referrer: "Twitter",
        ip: "192.168.1.2",
    },
    {
        id: "3",
        country: "DE",
        device: "desktop",
        page: "/pricing",
        duration: 89,
        referrer: "Direct",
        ip: "192.168.1.3",
    },
];

export default function RealTimePage() {
    const [sessions, setSessions] = useState(initialData);
    const [visitorCount, setVisitorCount] = useState(initialData.length);

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            const newSession = {
                id: String(Date.now()),
                country: ["US", "IN", "DE", "BR", "JP"][
                    Math.floor(Math.random() * 5)
                ],
                device: Math.random() > 0.5 ? "desktop" : "mobile",
                page: ["/home", "/blog", "/pricing"][
                    Math.floor(Math.random() * 3)
                ],
                duration: Math.floor(Math.random() * 300),
                referrer: ["Google", "Twitter", "Direct", "Facebook"][
                    Math.floor(Math.random() * 4)
                ],
                ip: `192.168.1.${Math.floor(Math.random() * 10) + 1}`, // Simulating IP Address
            };

            setSessions((prev) => [newSession, ...prev.slice(0, 9)]);
            setVisitorCount((prev) => prev + 1);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Group by IP address block (e.g., "192.168.1.x")
    const ipBlockData = sessions.reduce((acc, session) => {
        const ipBlock = session.ip.split(".").slice(0, 3).join("."); // Getting the first 3 octets as block
        acc[ipBlock] = (acc[ipBlock] || 0) + 1;
        return acc;
    }, {});

    // Prepare the chart data
    const chartData = Object.entries(ipBlockData).map(([name, count]) => ({
        name,
        count,
    }));

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Real-Time Tracking</h1>
                    <CardDescription className="mt-1">
                        Live monitoring of current website activity
                    </CardDescription>
                </div>
                <Badge variant="outline" className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Live Updates
                </Badge>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Activity Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Current Visitors
                                </CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">
                                    {visitorCount}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    +12.3% from last hour
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Avg. Duration
                                </CardTitle>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">
                                    {Math.floor(
                                        sessions.reduce(
                                            (sum, s) => sum + s.duration,
                                            0,
                                        ) / sessions.length,
                                    )}
                                    s
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    +8.7% from yesterday
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Active Pages
                                </CardTitle>
                                <Globe className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">
                                    {new Set(sessions.map((s) => s.page)).size}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    3 new pages this hour
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* IP Block Distribution Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>IP Block Distribution</CardTitle>
                            <CardDescription>
                                Real-time IP block distribution for visitors
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart
                                    innerRadius="10%"
                                    outerRadius="80%"
                                    data={chartData}
                                    startAngle={180}
                                    endAngle={0}>
                                    <RadialBar
                                        minAngle={15}
                                        label={{
                                            position: "insideStart",
                                            fill: "#fff",
                                        }}
                                        background
                                        clockWise={true}
                                        dataKey="count"
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor:
                                                "hsl(var(--background))",
                                            borderColor: "hsl(var(--border))",
                                            borderRadius: "8px",
                                        }}
                                    />
                                </RadialBarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Live Sessions */}
                <Card className="h-[calc(100vh-200px)]">
                    <CardHeader>
                        <CardTitle>Active Sessions</CardTitle>
                        <CardDescription>
                            {sessions.length} ongoing sessions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[500px]">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Country</TableHead>
                                        <TableHead>Device</TableHead>
                                        <TableHead>Page</TableHead>
                                        <TableHead className="text-right">
                                            Duration
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sessions.map((session, index) => (
                                        <motion.tr
                                            key={session.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: index * 0.05,
                                            }}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                                    {session.country}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {session.device ===
                                                "desktop" ? (
                                                    <Monitor className="h-4 w-4" />
                                                ) : (
                                                    <Smartphone className="h-4 w-4" />
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {session.page}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {session.duration}s
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
