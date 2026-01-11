"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy, Download, Share2 } from "lucide-react";
import { useEffect, useEffectEvent, useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "sonner";

export default function ShareButton({ formId }: { formId: string }) {
    const [mounted, setMounted] = useState(false);
    const [publicUrl, setPublicUrl] = useState("");

    const onMount = useEffectEvent(() => {
        setMounted(true);
        setPublicUrl(`${window.location.origin}/f/${formId}`);
    })

    useEffect(() => {
        onMount();
    }, [formId]);

    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(publicUrl);
        setCopied(true);
        toast.success("Link copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    const handleCopyEmbed = () => {
        const embedCode = `<div style="width:100%;height:100%;min-height:600px;"><iframe src="${publicUrl}" style="width:100%;height:100%;border:none;border-radius:8px;"></iframe></div>`;
        navigator.clipboard.writeText(embedCode);
        toast.success("Embed code copied to clipboard");
    };

    const handleDownloadQr = () => {
        const svg = document.getElementById("qr-code");
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.download = `qrcode-${formId}.png`;
            downloadLink.href = pngFile;
            downloadLink.click();
        };

        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    if (!mounted) {
        // Avoid hydration mismatch by rendering a placeholder or disabled button
        return (
            <Button size="sm" disabled>
                <Share2 className="mr-2 h-4 w-4" />
                Share
            </Button>
        );
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share Form</DialogTitle>
                    <DialogDescription>
                        Anyone with the link can view and submit this form.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="link" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="link">Link</TabsTrigger>
                        <TabsTrigger value="embed">Embed</TabsTrigger>
                        <TabsTrigger value="qr">QR Code</TabsTrigger>
                    </TabsList>

                    <TabsContent value="link" className="space-y-4 pt-4">
                        <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="sr-only">
                                    Link
                                </Label>
                                <Input
                                    id="link"
                                    defaultValue={publicUrl}
                                    readOnly
                                />
                            </div>
                            <Button type="submit" size="sm" className="px-3" onClick={handleCopyLink}>
                                <span className="sr-only">Copy</span>
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="embed" className="space-y-4 pt-4">
                        <div className="rounded-md bg-muted p-4 text-xs font-mono break-all border overflow-auto max-h-37.5">
                            {`<div style="width:100%;height:100%;min-height:600px;">
  <iframe src="${publicUrl}" style="width:100%;height:100%;border:none;border-radius:8px;"></iframe>
</div>`}
                        </div>
                        <Button className="w-full" onClick={handleCopyEmbed}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Embed Code
                        </Button>
                    </TabsContent>

                    <TabsContent value="qr" className="space-y-4 pt-4 flex flex-col items-center">
                        <div className="bg-white p-4 rounded-lg shadow-sm border">
                            <QRCode
                                id="qr-code"
                                value={publicUrl}
                                size={200}
                                viewBox={`0 0 256 256`}
                            />
                        </div>
                        <Button variant="outline" onClick={handleDownloadQr}>
                            <Download className="mr-2 h-4 w-4" />
                            Download QR Code
                        </Button>
                    </TabsContent>
                </Tabs>

            </DialogContent>
        </Dialog>
    );
}
