// app/dashboard/reports/page.tsx
"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "../../components/ui/card";
import { useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import { useWebsite } from "../../contexts/websiteContext";
import { websiteService } from "../../services/websiteService";
import ErrorMessage from "../../components/ui/errorMessage";
import LoadingOverlay from "../../components/ui/loadingOverlay";

export default function Reports() {
    const { selectedWebsite } = useWebsite();
    const [analyticsState, setAnalyticsState] = useState({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchAnalytics = async () => {
            if (!selectedWebsite?.id) {
                setAnalyticsState({ data: null, loading: false, error: null });
                return;
            }

            setAnalyticsState((prev) => ({
                ...prev,
                loading: true,
                error: null,
            }));

            try {
                const rawData = await websiteService.getPageViewsData(
                    selectedWebsite.id,
                );
                const processedData = processAnalyticsData(rawData);

                if (!signal.aborted) {
                    setAnalyticsState({
                        data: processedData,
                        loading: false,
                        error: null,
                    });
                }
            } catch (error) {
                if (!signal.aborted) {
                    setAnalyticsState({
                        data: null,
                        loading: false,
                        error: error.message || "Failed to load analytics data",
                    });
                }
            }
        };

        fetchAnalytics();

        return () => controller.abort();
    }, [selectedWebsite?.id]);

    if (analyticsState.loading) {
        return <LoadingOverlay />;
    }

    if (analyticsState.error) {
        return <ErrorMessage message={analyticsState.error} />;
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
                    <p className="text-muted-foreground">
                        Real-time visitor insights
                    </p>
                </div>
            </div>

            <KeyMetrics metrics={analyticsState.data} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DeviceChart devices={analyticsState.data.devices} />
                <LocationTable locations={analyticsState.data.locations} />
            </div>

            <TopPages pages={analyticsState.data.topPages} />
        </div>
    );
}

export const processAnalyticsData = (events) => {
    const uniqueSessions = new Set(events.map((event) => event.sessionId));
    const devices = events.reduce((acc, event) => {
        const { deviceType } = event.session;
        acc[deviceType] = (acc[deviceType] || 0) + 1;
        return acc;
    }, {});

    const locations = events.reduce((acc, event) => {
        const { country } = event.session;
        acc[country] = (acc[country] || 0) + 1;
        return acc;
    }, {});

    const paths = events.reduce((acc, event) => {
        acc[event.path] = (acc[event.path] || 0) + 1;
        return acc;
    }, {});

    return {
        totalVisitors: events.length,
        uniqueVisitors: uniqueSessions.size,
        devices: Object.entries(devices).map(([device, visitors]) => ({
            device,
            visitors,
        })),
        locations: Object.entries(locations).map(([country, visitors]) => ({
            country,
            visitors,
            duration: "2m 30s", // Mock duration since not provided in data
        })),
        topPages: Object.entries(paths)
            .map(([page, visitors]) => ({
                page,
                visitors,
                bounceRate: Math.floor(Math.random() * 60) + 20,
                conversions: Math.floor(visitors * 0.1),
            }))
            .sort((a, b) => b.visitors - a.visitors)
            .slice(0, 5),
    };
};

export const KeyMetrics = ({ metrics }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Views
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">
                        {metrics.totalVisitors.toLocaleString()}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                        Unique Visitors
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">
                        {metrics.uniqueVisitors.toLocaleString()}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export const DeviceChart = ({ devices }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>
                    Visitor distribution by platform
                </CardDescription>
            </CardHeader>
            <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={devices}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            className="stroke-muted"
                        />
                        <XAxis dataKey="device" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                            dataKey="visitors"
                            fill="hsl(var(--primary))"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export const LocationTable = ({ locations }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Top visitor locations</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Country</TableHead>
                            <TableHead>Visitors</TableHead>
                            <TableHead>Avg. Duration</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {locations.map((location) => (
                            <TableRow key={location.country}>
                                <TableCell>{location.country}</TableCell>
                                <TableCell>
                                    {location.visitors.toLocaleString()}
                                </TableCell>
                                <TableCell>{location.duration}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export const TopPages = ({ pages }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Performing Pages</CardTitle>
                <CardDescription>
                    Most visited pages with engagement metrics
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Page</TableHead>
                            <TableHead>Visitors</TableHead>
                            <TableHead>Bounce Rate</TableHead>
                            <TableHead>Conversions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pages.map((page) => (
                            <TableRow key={page.page}>
                                <TableCell>{page.page}</TableCell>
                                <TableCell>
                                    {page.visitors.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {page.bounceRate}%
                                        <div className="w-20 h-2 bg-muted rounded-full">
                                            <div
                                                className="h-2 bg-primary rounded-full"
                                                style={{
                                                    width: `${page.bounceRate}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{page.conversions}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
