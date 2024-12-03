
import { ChannelContext } from "@/providers/ChannelProvider/ChannelContext";
import { useContext } from "react";


const Classwork = () => {
    const { channel, isLoading, isError } = useContext(ChannelContext);

    if (!channel) {
        return <div>No classwork data available.</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching classwork. Please check the code or try again.</div>;
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Classwork</h2>
            <div>
                <h3 className="text-lg font-semibold mb-2">Assignments:</h3>
                <ul className="space-y-2">
                    {channel.classwork?.assignments?.map((assignment, index) => (
                        <li key={index} className="p-2 border rounded">
                            <strong>{assignment.title}</strong>
                            <p>{assignment.description}</p>
                        </li>
                    ))}
                </ul>

                <h3 className="text-lg font-semibold mt-4 mb-2">Documents:</h3>
                <ul className="space-y-2">
                    {channel.classwork?.documents?.map((doc, index) => (
                        <li key={index} className="p-2 border rounded">{doc}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Classwork;