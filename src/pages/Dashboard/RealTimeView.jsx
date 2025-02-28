// app/dashboard/real-time/page.tsx
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
} from "recharts";

const initialData = [
    {
        id: "1",
        country: "US",
        device: "desktop",
        page: "/home",
        duration: 127,
        referrer: "Google",
    },
    {
        id: "2",
        country: "IN",
        device: "mobile",
        page: "/blog",
        duration: 45,
        referrer: "Twitter",
    },
    {
        id: "3",
        country: "DE",
        device: "desktop",
        page: "/pricing",
        duration: 89,
        referrer: "Direct",
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
            };

            setSessions((prev) => [newSession, ...prev.slice(0, 9)]);
            setVisitorCount((prev) => prev + 1);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const countryData = sessions.reduce((acc, session) => {
        acc[session.country] = (acc[session.country] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(countryData).map(([name, count]) => ({
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

                    {/* Live Activity Map */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Geographic Distribution</CardTitle>
                            <CardDescription>
                                Real-time visitor locations
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        className="stroke-muted"
                                    />
                                    <XAxis dataKey="name" stroke="#64748b" />
                                    <YAxis stroke="#64748b" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor:
                                                "hsl(var(--background))",
                                            borderColor: "hsl(var(--border))",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Bar
                                        dataKey="count"
                                        fill="hsl(var(--primary))"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
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
