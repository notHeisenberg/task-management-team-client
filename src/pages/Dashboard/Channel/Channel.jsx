import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Stream from "./ChannelComponents/Stream";
import Classwork from "./ChannelComponents/ClassWork";
import People from "./ChannelComponents/People";
import { useContext } from "react";
import { ChannelProvider } from "@/providers/ChannelProvider/ChannelProvider";
import { ChannelContext } from "@/providers/ChannelProvider/ChannelContext";

const Channel = () => {
    return (
        <ChannelProvider>
            <div className="p-4">
                <ChannelContent />
            </div>
        </ChannelProvider>
    );
};

const ChannelContent = () => {
    const { channel, isLoading, isError } = useContext(ChannelContext);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !channel) {
        return <div>Error fetching channel. Please check the code or try again.</div>;
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">{channel.channelInfo.name || "Channel Page"}</h1>
            <Tabs defaultValue="stream" className="w-full">
                <TabsList>
                    <TabsTrigger value="stream">Stream</TabsTrigger>
                    <TabsTrigger value="classwork">Classwork</TabsTrigger>
                    <TabsTrigger value="people">People</TabsTrigger>
                </TabsList>
                <TabsContent value="stream">
                    <Stream />
                </TabsContent>
                <TabsContent value="classwork">
                    <Classwork />
                </TabsContent>
                <TabsContent value="people">
                    <People />
                </TabsContent>
            </Tabs>
        </>
    );
};

export default Channel;