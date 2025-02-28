import React from "react";
import { motion } from "framer-motion";
import {
    Key,
    User,
    Lock,
    Trash2,
    Eye,
    EyeOff,
    UploadCloud,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";

export default function Settings() {
    const [apiKeys, setApiKeys] = React.useState([
        {
            id: "1",
            name: "Production",
            key: "sk_live_*******",
            permissions: ["read", "write"],
            expires: "2025-01-01",
            status: "active",
        },
        {
            id: "2",
            name: "Test",
            key: "sk_test_*******",
            permissions: ["read"],
            expires: "2023-12-01",
            status: "expired",
        },
    ]);

    const [showKey, setShowKey] = React.useState(false);
    const [currentPassword, setCurrentPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");

    return (
        <div className="p-6 space-y-6 mx-auto">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">Account Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account preferences and security settings
                </p>
            </div>

            <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="profile">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="security">
                        <Lock className="w-4 h-4 mr-2" />
                        Security
                    </TabsTrigger>
                    <TabsTrigger value="api">
                        <Key className="w-4 h-4 mr-2" />
                        API Keys
                    </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>
                                Update your public profile details
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <img
                                        className="h-24 w-24 rounded-full border-2 border-muted"
                                        src="/avatar-placeholder.png"
                                        alt="Profile"
                                    />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <UploadCloud className="text-white h-6 w-6" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Profile Picture</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Recommended size: 500x500px (JPEG or
                                        PNG)
                                    </p>
                                    <Button variant="outline" size="sm">
                                        Upload New Photo
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>First Name</Label>
                                    <Input defaultValue="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Last Name</Label>
                                    <Input defaultValue="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input
                                    defaultValue="john@example.com"
                                    type="email"
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button variant="outline">Cancel</Button>
                                <Button>Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>
                                Manage password and security preferences
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Current Password</Label>
                                    <div className="relative">
                                        <Input
                                            type={showKey ? "text" : "password"}
                                            value={currentPassword}
                                            onChange={(e) =>
                                                setCurrentPassword(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-2 top-2 h-6 w-6"
                                            onClick={() =>
                                                setShowKey(!showKey)
                                            }>
                                            {showKey ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>New Password</Label>
                                    <Input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">
                                        Password must contain at least 8
                                        characters
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">
                                        Include at least one special character
                                    </span>
                                </div>

                                <Separator className="my-4" />

                                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                    <div className="space-y-1">
                                        <Label>Two-Factor Authentication</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Add an extra layer of security to
                                            your account
                                        </p>
                                    </div>
                                    <Button variant="outline">
                                        Enable 2FA
                                    </Button>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button variant="outline">Cancel</Button>
                                <Button>Update Security Settings</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* API Keys Tab */}
                <TabsContent value="api">
                    <Card>
                        <CardHeader>
                            <CardTitle>API Key Management</CardTitle>
                            <CardDescription>
                                Create and manage your API access keys
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Button className="gap-2">
                                <Key className="h-4 w-4" />
                                Generate New Key
                            </Button>

                            <div className="space-y-4">
                                {apiKeys.map((key) => (
                                    <motion.div
                                        key={key.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">
                                                    {key.name}
                                                </span>
                                                <Badge
                                                    variant={
                                                        key.status === "active"
                                                            ? "default"
                                                            : "secondary"
                                                    }>
                                                    {key.status}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span>{key.key}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-6 w-6 p-1">
                                                    <Eye className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span>
                                                    Permissions:{" "}
                                                    {key.permissions.join(", ")}
                                                </span>
                                                <span>·</span>
                                                <span>
                                                    Expires: {key.expires}
                                                </span>
                                            </div>
                                        </div>
                                        <Button variant="destructive" size="sm">
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Revoke
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="p-4 bg-muted/50 rounded-lg">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <AlertCircle className="h-4 w-4" />
                                    <span>
                                        API keys provide full access to your
                                        account. Keep them secure!
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
