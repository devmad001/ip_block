import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { ipBlockService } from "../services/ipBlockService";
import { IpBlockRules } from "../components/IpBlockRules";
import { toast } from "react-toastify";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table";
import { format } from "date-fns";

export default function IPBlockManagement() {
    const [websiteId, setWebsiteId] = useState(""); // This should come from your auth context or route params
    const [isBlockingEnabled, setIsBlockingEnabled] = useState(false);
    const [rules, setRules] = useState([]);
    const [blockedIps, setBlockedIps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [blockedIpsData] = await Promise.all([
                // ipBlockService.getBlockRules(websiteId),
                // ipBlockService.getBlockStats(websiteId),
                ipBlockService.getBlockedIps(websiteId),
            ]);
            // setRules(rulesData);
            // setIsBlockingEnabled(statsData.isEnabled);
            setBlockedIps(blockedIpsData);
            console.log(blockedIpsData);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to load IP block data",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleToggleBlocking = async () => {
        try {
            await ipBlockService.toggleBlocking(websiteId, !isBlockingEnabled);
            setIsBlockingEnabled(!isBlockingEnabled);
            toast({
                title: "Success",
                description: `IP blocking ${!isBlockingEnabled ? "enabled" : "disabled"}`,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to toggle IP blocking",
                variant: "destructive",
            });
        }
    };

    const handleUnblockIp = async (ip) => {
        try {
            await ipBlockService.unblockIp(websiteId, ip);
            toast({
                title: "Success",
                description: `Successfully unblocked IP: ${ip}`,
            });
            // Refresh the blocked IPs list
            const blockedIpsData =
                await ipBlockService.getBlockedIps(websiteId);
            setBlockedIps(blockedIpsData);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to unblock IP",
                variant: "destructive",
            });
        }
    };

    const handleBlockIp = async (ip) => {
        try {
            await ipBlockService.blockIp(websiteId, ip);
            toast({
                title: "Success",
                description: `Successfully blocked IP: ${ip}`,
            });
            // Refresh the blocked IPs list
            const blockedIpsData =
                await ipBlockService.getBlockedIps(websiteId);
            setBlockedIps(blockedIpsData);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to block IP",
                variant: "destructive",
            });
        }
    };

    const handleRulesChange = () => {
        loadData();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6 space-y-6 max-w-[1400px]">
            <h1 className="text-3xl font-bold">IP Block Management</h1>

            <Card>
                <CardHeader>
                    <CardTitle>IP Blocking Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Enable or disable IP blocking for your website
                            </p>
                        </div>
                        <Switch
                            checked={isBlockingEnabled}
                            onCheckedChange={handleToggleBlocking}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Blocked IPs List */}
            <Card>
                <CardHeader>
                    <CardTitle>Currently Blocked IPs</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">
                                    IP Address
                                </TableHead>
                                <TableHead className="w-[150px]">
                                    Country
                                </TableHead>
                                <TableHead className="w-[150px]">
                                    City
                                </TableHead>
                                <TableHead className="w-[200px]">ISP</TableHead>
                                <TableHead className="w-[180px]">
                                    Last Seen
                                </TableHead>
                                <TableHead className="w-[100px]">
                                    Status
                                </TableHead>
                                <TableHead className="w-[100px] text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blockedIps.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-center">
                                        No IPs are currently blocked
                                    </TableCell>
                                </TableRow>
                            ) : (
                                blockedIps.map((ip) => (
                                    <TableRow key={ip.ip}>
                                        <TableCell className="font-medium">
                                            {ip.ip}
                                        </TableCell>
                                        <TableCell>
                                            {ip.country || "Unknown"}
                                        </TableCell>
                                        <TableCell>
                                            {ip.city || "Unknown"}
                                        </TableCell>
                                        <TableCell>
                                            {ip.isp || "Unknown"}
                                        </TableCell>
                                        <TableCell>
                                            {ip.last_seen
                                                ? format(
                                                      new Date(ip.last_seen),
                                                      "PPpp",
                                                  )
                                                : "Never"}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${
                                                    ip.isActive
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-green-100 text-green-700"
                                                }`}>
                                                {ip.isActive
                                                    ? "Blocked"
                                                    : "Active"}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    handleUnblockIp(ip.ip)
                                                }
                                                className={`${
                                                    ip.isActive
                                                        ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        : "text-green-600 hover:text-green-700 hover:bg-green-50"
                                                }`}>
                                                {ip.isActive
                                                    ? "Unblock"
                                                    : "Block"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* IP Block Rules */}
            <IpBlockRules
                websiteId={websiteId}
                rules={rules}
                onRulesChange={handleRulesChange}
            />
        </div>
    );
}
