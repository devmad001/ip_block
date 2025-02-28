import { useEffect, useMemo, useState, useCallback } from "react";
import React from "react";
import { Activity, Fingerprint, Percent, Star } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";
import { useWebsite } from "../../contexts/websiteContext";
import { RecentEventsTable } from "./Dashboard";
import { websiteService } from "../../services/websiteService";
import LoadingOverlay from "../../components/ui/loadingOverlay";
import ErrorMessage from "../../components/ui/errorMessage";

const eventTypes = [
    { value: "all", label: "All Events" },
    { value: "click", label: "Clicks" },
    { value: "form", label: "Form Submissions" },
    { value: "scroll", label: "Scroll Events" },
    { value: "custom", label: "Custom Events" },
];

export default function EventsPage() {
    const { selectedWebsite } = useWebsite();
    const [events, setEvents] = useState([]);
    const [selectedType, setSelectedType] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEvents = useCallback(async () => {
        try {
            const data = await websiteService.getEventsData(selectedWebsite.id);
            setEvents(data);
            setError(null);
        } catch (err) {
            setError(err.message || "Failed to load events");
        } finally {
            setLoading(false);
        }
    }, [selectedWebsite?.id]);

    useEffect(() => {
        if (!selectedWebsite?.id) return;
        setLoading(true);
        fetchEvents();
    }, [selectedWebsite?.id]);

    const metrics = useMemo(() => {
        const uniqueSessions = new Set(events?.map((e) => e.sessionId)).size;
        return [
            {
                title: "Total Events",
                value: events.length,
                icon: Activity,
                subtitle: "+14.2% vs previous period",
            },
            {
                title: "Unique Events",
                value: uniqueSessions,
                icon: Fingerprint,
                subtitle: "3 new events this week",
            },
            {
                title: "Conversion Rate",
                value: "12.4%",
                icon: Percent,
                subtitle: "+2.8% vs previous period",
            },
            {
                title: "Top Event",
                value: "Button Click",
                icon: Star,
                subtitle: "1,243 occurrences",
            },
        ];
    }, [events]);

    if (loading) return <LoadingOverlay />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Event Tracking</h1>

            <EventFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                eventTypes={eventTypes}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {metrics.map((metric, index) => (
                    <EventMetricCard key={`metric-${index}`} {...metric} />
                ))}
            </div>

            <RecentEventsTable
                title={"Filtered Events"}
                description={"Detailed view of individual events"}
                events={events}
            />
        </div>
    );
}

const EventMetricCard = ({ title, value, icon: Icon, subtitle }) => (
    <Card>
        <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4" />
        </CardHeader>
        <CardContent>
            <div className="text-3xl font-bold">{value}</div>
            {subtitle && (
                <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
        </CardContent>
    </Card>
);

const EventFilters = React.memo(
    ({
        searchQuery,
        setSearchQuery,
        selectedType,
        setSelectedType,
        eventTypes,
    }) => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="md:col-span-2"
            />
            <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                    {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                            {type.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    ),
);
