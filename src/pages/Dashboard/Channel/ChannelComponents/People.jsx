
import { ChannelContext } from "@/providers/ChannelProvider/ChannelContext";
import { useContext } from "react";

const People = () => {
    const { channel, isLoading, isError } = useContext(ChannelContext);

    if (!channel) {
        return <div>No people data available.</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching people. Please check the code or try again.</div>;
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">People</h2>
            <div>
                <h3 className="text-lg font-semibold mb-2">Teachers:</h3>
                <ul className="space-y-2">
                    {channel.people?.teachers?.map((teacher, index) => (
                        <li key={index} className="p-2 border rounded">{teacher}</li>
                    ))}
                </ul>

                <h3 className="text-lg font-semibold mt-4 mb-2">Students:</h3>
                <ul className="space-y-2">
                    {channel.people?.students?.map((student, index) => (
                        <li key={index} className="p-2 border rounded">{student}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default People;