import { Globe, Terminal, Copy, Check, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Progress } from "./ui/progress";
import { useWebsite } from "../contexts/websiteContext";

const WebsiteIntegrationFlow = ({ showDialog, setShowDialog }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [newWebsite, setNewWebsite] = useState("");
    const { handleAddWebsite } = useWebsite();
    const [response, setResponse] = useState(null);

    const trackingScript = `<script>
    window.analyticsConfig = {
      websiteId: '${response?.website?.id}',
      endpoint: 'http://54.219.2.190/api/v1/track',
      respectDoNotTrack: true
    };
  </script>
  <script async src="http://54.219.2.190/tracking.js"></script>`;

    const handleContinue = async () => {
        try {
            const data = await handleAddWebsite(newWebsite);
            if (data) {
                setResponse(data);
                setCurrentStep(1);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const steps = [
        {
            title: "Set Up Website Tracking",
            description:
                "Start by registering your website domain to begin tracking visitor analytics",
            component: (
                <WebsiteRegistrationStep
                    newWebsite={newWebsite}
                    setNewWebsite={setNewWebsite}
                    onContinue={handleContinue}
                />
            ),
        },
        {
            title: "Install Tracking Code",
            description: "Integrate our analytics script with your website",
            component: (
                <TrackingCodeStep
                    trackingScript={trackingScript}
                    onComplete={() => setCurrentStep(2)}
                    websiteDomain={response?.website?.domain}
                />
            ),
        },
        {
            title: "Tracking Activated!",
            description: "Your website analytics are now being collected",
            component: (
                <CompletionStep
                    onComplete={() => {
                        setCurrentStep(0);
                        setShowDialog(false);
                    }}
                />
            ),
        },
    ];

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent className="max-w-[640px]">
                <DialogHeader className="pb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                            <StepIcon step={currentStep} />
                        </div>
                        <div className="space-y-1">
                            <DialogTitle className="text-lg">
                                {steps[currentStep].title}
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground">
                                {steps[currentStep].description}
                            </p>
                        </div>
                    </div>
                    <Progress
                        value={(currentStep + 1) * 33.33}
                        className="h-1.5"
                    />
                </DialogHeader>

                <div className="space-y-6">
                    {steps[currentStep].component}

                    {currentStep === 1 && (
                        <p className="text-xs text-muted-foreground text-center px-8">
                            Need help? Contact our support team or visit our
                            documentation for detailed integration guides.
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default WebsiteIntegrationFlow;

const StepIcon = ({ step }) => {
    const icons = {
        0: <Globe className="h-5 w-5" />,
        1: <Terminal className="h-5 w-5" />,
        2: <ShieldCheck className="h-5 w-5" />,
    };

    return icons[step] || null;
};

const WebsiteRegistrationStep = ({ newWebsite, setNewWebsite, onContinue }) => {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label className="text-sm font-medium">Website Domain</Label>
                <Input
                    placeholder="example.com"
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                    className="h-10"
                />
                <p className="text-xs text-muted-foreground">
                    Enter your full domain name without http:// or https://
                </p>
            </div>
            <Button className="w-full" onClick={onContinue}>
                Continue Setup
            </Button>
        </div>
    );
};

const TrackingCodeStep = ({ trackingScript, onComplete, websiteDomain }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(trackingScript);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                        <Copy className="h-4 w-4" /> Step 1: Add Tracking Script
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Place this code in your website's{" "}
                        <code className="text-xs bg-muted px-1 py-0.5 rounded">
                            &lt;head&gt;
                        </code>{" "}
                        section
                    </p>
                    <div className="relative group">
                        <pre className="p-4 text-sm bg-muted rounded-md overflow-x-auto font-mono">
                            {trackingScript}
                        </pre>
                        <Button
                            size="sm"
                            className="absolute top-2 right-2 gap-1"
                            onClick={handleCopy}>
                            {copied ? (
                                <Check className="h-4 w-4" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                            {copied ? "Copied!" : "Copy"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" /> Step 2: Verify
                        Installation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        After installing the script, visit your website to
                        trigger initial data collection
                    </p>
                    <div className="flex flex-col gap-2">
                        <Button onClick={onComplete}>
                            I've Installed the Script
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() =>
                                window.open(websiteDomain, "_blank")
                            }>
                            Visit Website
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

const CompletionStep = ({ onComplete }) => {
    return (
        <div className="flex flex-col items-center text-center gap-4">
            <div className="bg-green-100 p-4 rounded-full">
                <Check className="h-12 w-12 text-green-600" strokeWidth={2} />
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Setup Complete!</h3>
                <p className="text-muted-foreground">
                    Analytics data will start appearing in your dashboard within
                    24 hours.
                    <br />
                    We'll notify you when your first data points arrive.
                </p>
            </div>
            <Button className="w-full" onClick={onComplete}>
                Return to Dashboard
            </Button>
        </div>
    );
};
