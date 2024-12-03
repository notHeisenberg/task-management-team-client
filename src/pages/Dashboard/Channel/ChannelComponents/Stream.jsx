import { ChannelContext } from "@/providers/ChannelProvider/ChannelContext";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Stream = () => {
    const { channel } = useContext(ChannelContext);
    const [newAnnouncement, setNewAnnouncement] = useState("");
    const [updates, setUpdates] = useState(channel?.stream || []);
    const { toast } = useToast()

    const copyChannelCode = () => {
        if (channel?.channelInfo?.channelCode) {
            navigator.clipboard.writeText(channel.channelInfo.channelCode);
            toast({
                title: "Channel code copied!",
                description: "You can now share this code with others.",
                status: "success",
            })
        } else {
            toast({
                title: "Channel code not available!",
                description: "Please try again later.",
                status: "error",
            })
        }
    };

    const handlePostAnnouncement = () => {
        if (newAnnouncement.trim()) {
            const newUpdate = {
                type: "announcement",
                content: newAnnouncement,
                timestamp: new Date().toLocaleString(),
            };
            setUpdates((prev) => [newUpdate, ...prev]);
            setNewAnnouncement("");
        } else {
            alert("Please enter a valid announcement.");
        }
    };

    if (!channel) {
        return <div>No stream data available.</div>;
    }

    return (
        <div className="flex flex-col md:flex-row gap-5">
            {/* Channel Code Section */}
            <Card className='max-h-44'>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Channel Code:</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="flex gap-2 justify-center items-center flex-wrap md:flex-nowrap">
                        <span className="ml-2 font-mono font-semibold text-4xl text-blue-600">
                            {channel.channelInfo?.channelCode || "N/A"}
                        </span>
                        <Button onClick={copyChannelCode} variant="outline">
                            <Copy size={16} />
                        </Button>
                    </p>
                </CardContent>
            </Card>

            <div className="flex flex-col gap-12 w-full">
                {/* Post Announcement Section */}
                <Card className=''>
                    <CardHeader>
                        <CardTitle>Post an Update</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            value={newAnnouncement}
                            onChange={(e) => setNewAnnouncement(e.target.value)}
                            placeholder="Share an announcement with the channel..."
                            className="mb-4"
                        />
                        <Button onClick={handlePostAnnouncement}>Post</Button>
                    </CardContent>
                </Card>

                {/* Updates Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Channel Updates</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {updates.length > 0 ? (
                            <ul className="space-y-4">
                                {updates.map((update, index) => (
                                    <li
                                        key={index}
                                        className="p-4 border rounded bg-gray-50 shadow-sm"
                                    >
                                        <p className="text-gray-800">{update.content}</p>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Posted on {update.timestamp}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No updates yet.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Stream;