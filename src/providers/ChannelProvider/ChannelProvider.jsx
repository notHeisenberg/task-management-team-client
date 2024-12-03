import { useQuery } from "@tanstack/react-query";
import { axiosCommon } from "@/hooks/useAxiosCommon";
import { useLocation } from "react-router-dom";
import { ChannelContext } from "./ChannelContext";
import PropTypes from "prop-types";

export const ChannelProvider = ({ children }) => {
    const location = useLocation();

    // Extract the channel code from the pathname
    const channelCode = location.pathname.split("/").pop();

    // Fetch channel data using React Query
    const {
        data: channel,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["channel", channelCode],
        queryFn: async () => {
            const response = await axiosCommon.get(`/channels/${channelCode}`);
            return response.data;
        },
        enabled: !!channelCode,
    });

    // Provide channel data and states
    const value = { channel, isLoading, isError };

    return (
        <ChannelContext.Provider value={value}>
            {children}
        </ChannelContext.Provider>
    );
};

ChannelProvider.propTypes = {
    children: PropTypes.node.isRequired,
};