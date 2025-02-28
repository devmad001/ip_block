import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SessionList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const sessions = [
        {
            id: "24657b56-eae4-4bc5-81aa-55e4efa69ef4",
            country: "AU",
            city: "Melbourne",
            deviceType: "desktop",
            browser: "Chrome",
            createdAt: "2025-01-26T11:21:20.399Z",
            lastActivity: "2025-01-26T11:22:29.338Z",
            pageViews: 4,
            events: 6,
        },
        {
            id: "4663111f-caaf-4c69-bb50-46ca4c4b6f37",
            country: "US",
            city: "New York",
            deviceType: "mobile",
            browser: "Safari",
            createdAt: "2025-01-26T10:15:20.399Z",
            lastActivity: "2025-01-26T10:22:29.338Z",
            pageViews: 3,
            events: 4,
        },
    ];

    const getDeviceIcon = (deviceType) => {
        switch (deviceType.toLowerCase()) {
            case "desktop":
                return <Monitor className="h-4 w-4" />;
            case "mobile":
                return <Smartphone className="h-4 w-4" />;
            case "tablet":
                return <Tablet className="h-4 w-4" />;
            default:
                return <Monitor className="h-4 w-4" />;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const calculateDuration = (start, end) => {
        const duration = new Date(end) - new Date(start);
        return `${Math.floor(duration / 1000)}s`;
    };

    const handleRowClick = (sessionId) => {
        navigate(`/dashboard/sessions-details/${sessionId}`);
    };

    const filteredSessions = sessions.filter(
        (session) =>
            session.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            session.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
            session.browser.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Active Sessions</h1>
                    <p className="text-muted-foreground">
                        View and analyze user sessions
                    </p>
                </div>
                <Input
                    placeholder="Search by location or browser..."
                    className="w-full sm:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Device</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Browser</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Activity</TableHead>
                                <TableHead>Last Active</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredSessions.map((session) => (
                                <TableRow
                                    key={session.id}
                                    className="cursor-pointer hover:bg-muted/50"
                                    onClick={() => handleRowClick(session.id)}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {getDeviceIcon(session.deviceType)}
                                            <span className="capitalize">
                                                {session.deviceType}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {session.city}, {session.country}
                                    </TableCell>
                                    <TableCell>{session.browser}</TableCell>
                                    <TableCell>
                                        {calculateDuration(
                                            session.createdAt,
                                            session.lastActivity,
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <span className="text-sm">
                                                {session.pageViews} views
                                            </span>
                                            <span className="text-muted-foreground">
                                                •
                                            </span>
                                            <span className="text-sm">
                                                {session.events} events
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(session.lastActivity)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default SessionList;
