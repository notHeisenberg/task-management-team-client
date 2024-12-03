"use client"

import DashboardCard from "@/components/DashboardCard/DashboardCard";
import { DashboardContext } from "@/providers/DashboardProvider/DashboardContext";
import { squircle } from "ldrs";
import { useContext } from "react";

squircle.register()

const DashboardHome = () => {
    const { channels, isLoading, isError } = useContext(DashboardContext);

    const handleEdit = (channelId) => {
        console.log(`Edit channel: ${channelId}`);
    };

    const handleCopy = (channelId) => {
        console.log(`Copy channel: ${channelId}`);
    };

    const handleArchive = (channelId) => {
        console.log(`Archive channel: ${channelId}`);
    };

    return (
        <div className="p-5 h-screen overflow-hidden">
            {isLoading && (
                <div className="h-full flex justify-center items-center">
                    <div>
                        <l-squircle
                            size="37"
                            stroke="5"
                            stroke-length="0.15"
                            bg-opacity="0.1"
                            speed="0.9"
                            color="blue"
                        ></l-squircle></div>
                </div>
            )}
            {isError && <p>Error loading channels.</p>}
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 overflow-y-auto max-h-full">
                {channels?.length > 0 &&
                    channels.map((channel) => (
                        <DashboardCard
                            key={channel._id}
                            channel={channel}
                            onEdit={() => handleEdit(channel._id)}
                            onCopy={() => handleCopy(channel._id)}
                            onArchive={() => handleArchive(channel._id)}
                        />
                    ))}
            </div>
        </div>
    );
};

export default DashboardHome;