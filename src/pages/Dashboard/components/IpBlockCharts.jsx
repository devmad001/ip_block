import React from "react";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "../../../components/ui/card";

// Dummy data for IP blocks by hour
const hourlyData = [
    { hour: "00:00", blocks: 15 },
    { hour: "03:00", blocks: 8 },
    { hour: "06:00", blocks: 5 },
    { hour: "09:00", blocks: 12 },
    { hour: "12:00", blocks: 25 },
    { hour: "15:00", blocks: 30 },
    { hour: "18:00", blocks: 22 },
    { hour: "21:00", blocks: 18 },
];

// Dummy data for weekly IP block trends
const weeklyTrendData = [
    { day: "Mon", blocks: 45, attempts: 120 },
    { day: "Tue", blocks: 52, attempts: 140 },
    { day: "Wed", blocks: 38, attempts: 95 },
    { day: "Thu", blocks: 65, attempts: 160 },
    { day: "Fri", blocks: 48, attempts: 130 },
    { day: "Sat", blocks: 35, attempts: 85 },
    { day: "Sun", blocks: 42, attempts: 110 },
];

// Custom Bar component for 3D effect
const Custom3DBar = (props) => {
    const { x, y, width, height, fill } = props;
    const depth = 20; // Depth of the 3D effect

    return (
        <g>
            {/* Front face */}
            <rect x={x} y={y} width={width} height={height} fill={fill} />

            {/* Top face */}
            <path
                d={`M ${x},${y} l ${depth / 2},${-depth / 2} l ${width},0 l ${-depth / 2},${depth / 2} Z`}
                fill={fill}
                fillOpacity={0.8}
            />

            {/* Right face */}
            <path
                d={`M ${x + width},${y} l ${depth / 2},${-depth / 2} l 0,${height} l ${-depth / 2},${depth / 2} Z`}
                fill={fill}
                fillOpacity={0.6}
            />
        </g>
    );
};

const IpBlockCharts = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* IP Blocks by Hour */}
            <Card>
                <CardHeader>
                    <CardTitle>IP Blocks by Hour</CardTitle>
                    <CardDescription>
                        Distribution of IP blocks throughout the day
                    </CardDescription>
                </CardHeader>
                <CardContent className="bg-gradient-to-br from-white to-blue-100">
                    <div
                        className="h-[300px] relative"
                        style={{ perspective: "1500px" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={hourlyData}
                                style={{
                                    transform: "rotateX(20deg) rotateY(-30deg)",
                                    transformStyle: "preserve-3d",
                                    transformOrigin: "center center",
                                }}>
                                <defs>
                                    <linearGradient
                                        id="barGradient"
                                        x1="0"
                                        y1="0"
                                        x2="1"
                                        y2="1">
                                        <stop
                                            offset="0%"
                                            stopColor="hsl(var(--primary))"
                                            stopOpacity={1}
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="hsl(var(--primary))"
                                            stopOpacity={0.8}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={true}
                                    horizontal={true}
                                    style={{
                                        opacity: 0.3,
                                        transform: "translateZ(-20px)",
                                    }}
                                />
                                <XAxis
                                    dataKey="hour"
                                    style={{
                                        transform: "translateZ(-10px)",
                                    }}
                                />
                                <YAxis
                                    style={{
                                        transform: "translateZ(-10px)",
                                    }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor:
                                            "hsl(var(--background))",
                                        borderColor: "hsl(var(--border))",
                                        borderRadius: "8px",
                                        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                                    }}
                                />
                                <Legend />
                                <Bar
                                    dataKey="blocks"
                                    fill="url(#barGradient)"
                                    name="Blocked IPs"
                                    shape={<Custom3DBar />}
                                    style={{
                                        filter: "drop-shadow(4px 8px 8px rgba(0,0,0,0.3))",
                                    }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Weekly IP Block Trends */}
            <Card>
                <CardHeader>
                    <CardTitle>Weekly IP Block Trends</CardTitle>
                    <CardDescription>
                        Comparison of blocked IPs vs. suspicious attempts over
                        the past week
                    </CardDescription>
                </CardHeader>
                <CardContent className="bg-gradient-to-br from-white to-blue-100">
                    <div
                        className="h-[300px] relative"
                        style={{ perspective: "1500px" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={weeklyTrendData}
                                style={{
                                    transform: "rotateX(20deg) rotateY(-30deg)",
                                    transformStyle: "preserve-3d",
                                    transformOrigin: "center center",
                                }}>
                                <defs>
                                    <linearGradient
                                        id="lineGradient1"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1">
                                        <stop
                                            offset="0%"
                                            stopColor="hsl(var(--primary))"
                                            stopOpacity={1}
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="hsl(var(--primary))"
                                            stopOpacity={0.6}
                                        />
                                    </linearGradient>
                                    <linearGradient
                                        id="lineGradient2"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1">
                                        <stop
                                            offset="0%"
                                            stopColor="hsl(var(--destructive))"
                                            stopOpacity={1}
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="hsl(var(--destructive))"
                                            stopOpacity={0.6}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    style={{
                                        opacity: 0.3,
                                        transform: "translateZ(-20px)",
                                    }}
                                />
                                <XAxis
                                    dataKey="day"
                                    style={{
                                        transform: "translateZ(-10px)",
                                    }}
                                />
                                <YAxis
                                    style={{
                                        transform: "translateZ(-10px)",
                                    }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor:
                                            "hsl(var(--background))",
                                        borderColor: "hsl(var(--border))",
                                        borderRadius: "8px",
                                        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                                    }}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="blocks"
                                    stroke="url(#lineGradient1)"
                                    name="Blocked IPs"
                                    strokeWidth={4}
                                    dot={{
                                        strokeWidth: 3,
                                        r: 6,
                                        fill: "hsl(var(--primary))",
                                    }}
                                    style={{
                                        filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.3))",
                                        transform: "translateZ(10px)",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="attempts"
                                    stroke="url(#lineGradient2)"
                                    name="Suspicious Attempts"
                                    strokeWidth={4}
                                    dot={{
                                        strokeWidth: 3,
                                        r: 6,
                                        fill: "hsl(var(--destructive))",
                                    }}
                                    style={{
                                        filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.3))",
                                        transform: "translateZ(5px)",
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default IpBlockCharts;
