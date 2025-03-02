import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Plus, Trash2 } from "lucide-react";
import { ipBlockService } from "../services/ipBlockService";
import { toast } from "react-toastify";

const RULE_TYPES = [
    { value: "ip", label: "Single IP" },
    { value: "range", label: "IP Range" },
    { value: "subnet", label: "Subnet" },
    { value: "country", label: "Country" },
];

export function IpBlockRules({ websiteId, rules = [], onRulesChange }) {
    const [newRule, setNewRule] = useState({
        type: "ip",
        value: "",
        description: "",
    });

    const handleAddRule = async () => {
        try {
            await ipBlockService.addBlockRule(websiteId, newRule);
            toast({
                title: "Rule Added",
                description: "Successfully added new IP block rule",
            });
            // Reset form
            setNewRule({ type: "ip", value: "", description: "" });
            // Refresh rules
            if (onRulesChange) onRulesChange();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add IP block rule",
                variant: "destructive",
            });
        }
    };

    const handleDeleteRule = async (ruleId) => {
        try {
            await ipBlockService.deleteBlockRule(websiteId, ruleId);
            toast({
                title: "Rule Deleted",
                description: "Successfully deleted IP block rule",
            });
            // Refresh rules
            if (onRulesChange) onRulesChange();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete IP block rule",
                variant: "destructive",
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>IP Block Rules</CardTitle>
                <CardDescription>
                    Configure automatic IP blocking rules
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Add New Rule Form */}
                <div className="flex items-center gap-2">
                    <Select
                        value={newRule.type}
                        onValueChange={(value) =>
                            setNewRule({ ...newRule, type: value })
                        }>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Rule Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {RULE_TYPES.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Input
                        placeholder={getPlaceholder(newRule.type)}
                        value={newRule.value}
                        onChange={(e) =>
                            setNewRule({ ...newRule, value: e.target.value })
                        }
                    />
                    <Input
                        placeholder="Description"
                        value={newRule.description}
                        onChange={(e) =>
                            setNewRule({
                                ...newRule,
                                description: e.target.value,
                            })
                        }
                    />
                    <Button onClick={handleAddRule}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Rule
                    </Button>
                </div>

                {/* Existing Rules List */}
                <div className="space-y-2">
                    {rules.map((rule) => (
                        <div
                            key={rule.id}
                            className="flex items-center justify-between p-2 rounded bg-muted">
                            <div>
                                <p className="font-medium">
                                    {RULE_TYPES.find(
                                        (t) => t.value === rule.type,
                                    )?.label || rule.type}
                                    : {rule.value}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {rule.description}
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteRule(rule.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

function getPlaceholder(type) {
    switch (type) {
        case "ip":
            return "Enter IP address (e.g. 192.168.1.1)";
        case "range":
            return "Enter IP range (e.g. 192.168.1.0-192.168.1.255)";
        case "subnet":
            return "Enter subnet (e.g. 192.168.1.0/24)";
        case "country":
            return "Enter country code (e.g. US)";
        default:
            return "Enter value";
    }
}
