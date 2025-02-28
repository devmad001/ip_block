import React from "react";
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
import { Monitor, Globe, Clock, Activity } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const SessionDetails = () => {
    const session = {
        id: "24657b56-eae4-4bc5-81aa-55e4efa69ef4",
        websiteId: "3523d779-46a0-41a9-83c5-4b5536750d99",
        userAgent:
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
        country: "AU",
        region: "VIC",
        city: "Melbourne",
        deviceType: "desktop",
        os: "Linux",
        browser: "Chrome",
        screen: "1536x864",
        language: "en-US",
        duration: 0,
        createdAt: "2025-01-26T11:21:20.399Z",
        lastActivity: "2025-01-26T11:22:29.338Z",
        pageViews: [
            {
                url: "vedant@gmail.com",
                createdAt: "2025-01-26T11:21:20.410Z",
            },
            {
                url: "vedant@gmail.com",
                createdAt: "2025-01-26T11:21:57.889Z",
            },
            {
                url: "vedant@gmail.com",
                createdAt: "2025-01-26T11:22:20.200Z",
            },
            {
                url: "vedant@gmail.com",
                createdAt: "2025-01-26T11:22:24.205Z",
            },
        ],
        events: [
            {
                type: "event",
                createdAt: "2025-01-26T11:21:21.622Z",
            },
            {
                type: "event",
                createdAt: "2025-01-26T11:21:59.163Z",
            },
            {
                type: "event",
                createdAt: "2025-01-26T11:22:20.187Z",
            },
            {
                type: "event",
                createdAt: "2025-01-26T11:22:24.162Z",
            },
            {
                type: "event",
                createdAt: "2025-01-26T11:22:27.635Z",
            },
            {
                type: "event",
                createdAt: "2025-01-26T11:22:29.347Z",
            },
        ],
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const calculateDuration = (start, end) => {
        const duration = new Date(end) - new Date(start);
        return `${Math.floor(duration / 1000)} seconds`;
    };

    const timelineData = [...session.pageViews, ...session.events]
        .map((item) => ({
            timestamp: new Date(item.createdAt).getTime(),
            type: item.url ? "Page View" : "Event",
        }))
        .sort((a, b) => a.timestamp - b.timestamp)
        .map((item, index) => ({
            ...item,
            index,
        }));

    const activities = [
        ...session.pageViews.map((view) => ({
            ...view,
            type: "Page View",
            timestamp: new Date(view.createdAt).getTime(),
        })),
        ...session.events.map((event) => ({
            ...event,
            url: "N/A",
            type: "Event",
            timestamp: new Date(event.createdAt).getTime(),
        })),
    ].sort((a, b) => a.timestamp - b.timestamp);

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">Session Details</h2>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                            <div className="space-y-1">
                                <div className="flex gap-2 items-center">
                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                    <p className="text-sm font-medium">
                                        Location
                                    </p>
                                </div>
                                <p className="text-lg">
                                    {session.city}, {session.region},{" "}
                                    {session.country}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <Monitor className="h-4 w-4 text-muted-foreground" />
                                    <p className="text-sm font-medium">
                                        Device
                                    </p>
                                </div>
                                <p className="text-lg">
                                    {session.deviceType} - {session.os}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <Activity className="h-4 w-4 text-muted-foreground" />
                                    <p className="text-sm font-medium">
                                        Activity
                                    </p>
                                </div>
                                <p className="text-lg">
                                    {session.pageViews.length} views,{" "}
                                    {session.events.length} events
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <p className="text-sm font-medium">
                                        Duration
                                    </p>
                                </div>
                                <p className="text-lg">
                                    {calculateDuration(
                                        session.createdAt,
                                        session.lastActivity,
                                    )}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Timeline Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Session Timeline</CardTitle>
                    <CardDescription>
                        Visualization of page views and events over time
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={timelineData}>
                                <XAxis
                                    dataKey="timestamp"
                                    type="number"
                                    domain={["dataMin", "dataMax"]}
                                    tickFormatter={(timestamp) =>
                                        new Date(timestamp).toLocaleTimeString()
                                    }
                                />
                                <YAxis dataKey="index" />
                                <Tooltip
                                    labelFormatter={(timestamp) =>
                                        new Date(timestamp).toLocaleString()
                                    }
                                    formatter={(value, name) => [value, name]}
                                />
                                <Line
                                    type="stepAfter"
                                    dataKey="index"
                                    stroke="hsl(var(--primary))"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Technical Details */}
            <Card>
                <CardHeader>
                    <CardTitle>Technical Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Browser
                            </p>
                            <p>{session.browser}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Screen Resolution
                            </p>
                            <p>{session.screen}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Language
                            </p>
                            <p>{session.language}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Session Start
                            </p>
                            <p>{formatDate(session.createdAt)}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Last Activity
                            </p>
                            <p>{formatDate(session.lastActivity)}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Session ID
                            </p>
                            <p className="truncate">{session.id}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Session Details */}
            <Card>
                <CardHeader>
                    <CardTitle>Session Activity Log</CardTitle>
                    <CardDescription>
                        Chronological list of all page views and events
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>URL/Details</TableHead>
                                    <TableHead>Elapsed Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {activities.map((activity, index) => {
                                    const elapsedTime =
                                        index === 0
                                            ? "0s"
                                            : `${Math.floor(
                                                  (activity.timestamp -
                                                      activities[0].timestamp) /
                                                      1000,
                                              )}s`;

                                    return (
                                        <TableRow key={activity.timestamp}>
                                            <TableCell>
                                                {new Date(
                                                    activity.timestamp,
                                                ).toLocaleTimeString()}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                                        activity.type ===
                                                        "Page View"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-green-100 text-green-700"
                                                    }`}>
                                                    {activity.type}
                                                </span>
                                            </TableCell>
                                            <TableCell className="font-mono text-sm">
                                                {activity.url}
                                            </TableCell>
                                            <TableCell>{elapsedTime}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SessionDetails;
