import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Stream from "./ChannelComponents/Stream";
import Classwork from "./ChannelComponents/ClassWork";
import People from "./ChannelComponents/People";
import { useContext } from "react";
import { ChannelProvider } from "@/providers/ChannelProvider/ChannelProvider";
import { ChannelContext } from "@/providers/ChannelProvider/ChannelContext";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, SettingsIcon, VideoIcon } from "lucide-react";
import useAuth from "@/hooks/useAuth";

const Channel = () => {
    return (
        <ChannelProvider>
            <div className="h-screen">
                <ChannelContent />
            </div>
        </ChannelProvider>
    );
};

const ChannelContent = () => {
    const { channel, isLoading, isError } = useContext(ChannelContext);
    const { user } = useAuth ();
    const navigate = useNavigate();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !channel) {
        return <div>Error fetching channel. Please check the code or try again.</div>;
    }

    const isOwner = user.email === channel.channelInfo.creatorUserEmail;

    const handleCalendarClick = () => {
        navigate("/dashboard/calendar");
    };

    const handleMeetClick = () => {
        // Logic to join a meeting
    };

    return (
        <div className="relative h-full flex flex-col pb-24">
            {/* Tabs and TabsContent within the same Tabs component */}
            <Tabs defaultValue="stream" className="flex flex-col h-full">
                {/* Tabs List (Sticky at the top) */}
                <div className="sticky top-0 z-10 pt-4 px-5 flex items-center justify-between">
                    <TabsList className="h-12 flex items-center justify-start px-4">
                        <TabsTrigger value="stream">Stream</TabsTrigger>
                        <TabsTrigger value="classwork">Classwork</TabsTrigger>
                        <TabsTrigger value="people">People</TabsTrigger>
                    </TabsList>
                    <div className="flex flex-wrap items-center gap-3">
                        {isOwner ? (
                            <>
                                <CalendarIcon className="cursor-pointer" onClick={handleCalendarClick} />
                                <SettingsIcon className="cursor-pointer" />
                            </>
                        ) : (
                            <>
                                <CalendarIcon className="cursor-pointer" onClick={handleCalendarClick} />
                                <VideoIcon className="cursor-pointer" onClick={handleMeetClick} />
                            </>
                        )}
                    </div>
                </div>

                {/* Tabs Content (Scrollable Section) */}
                <div className="flex-grow overflow-y-auto p-5">
                    <TabsContent value="stream">
                        <Stream />
                    </TabsContent>
                    <TabsContent value="classwork">
                        <Classwork />
                    </TabsContent>
                    <TabsContent value="people">
                        <People />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};

export default Channel;