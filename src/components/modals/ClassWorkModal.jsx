import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { useForm, FormProvider } from "react-hook-form";
import PropTypes from "prop-types";
import { MdOutlineAssignment, MdOutlineBook, MdOutlineQuiz } from "react-icons/md";
import { FileQuestion } from "lucide-react";
import MainSection from "./MainSection";
import AsideSection from "./AsideSection";
import { Button } from "../ui/button";
import useAuth from "@/hooks/useAuth";
import { useContext } from "react";
import { ChannelContext } from "@/providers/ChannelProvider/ChannelContext";

const ClassworkModal = ({ isOpen, onClose, type, onSubmit, channelName }) => {
    const methods = useForm();
    const { channel } = useContext(ChannelContext);
    const { user } = useAuth();

    const generateRandomCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

    // Handle modal submission
    const handleModalSubmit = (data) => {
        let postData;

        if (type === "topic") {
            // If the type is topic, only save the topic name
            postData = {
                type,
                name: data.name,
            };
        } else {
            // For other types, include all relevant information
            postData = {
                ...data,
                type,
                timestamp: new Date().toISOString(),
                author: {
                    name: user?.displayName || "Unknown Author",
                    image: user?.photoURL || "",
                },
                attachments: data.attachments || [],
                postCode: generateRandomCode(),
                channelCode: channel?.channelInfo?.channelCode || "N/A",
                comments: [],
            };
        }

        console.log("Data to Submit:", postData);

        // Send the data to the parent or backend
        onSubmit(postData);

        // Reset the form and close the modal
        methods.reset();
        onClose();
    };

    const isTopic = type === "topic";

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={isTopic ? "max-w-sm" : "h-full min-w-full"}>
                <DialogHeader>
                    <DialogTitle className="flex items-center text-2xl">
                        {type === "assignment" ? (
                            <>
                                <MdOutlineAssignment className="mr-2 w-8 h-8" /> Assignment
                            </>
                        ) : type === "quiz" ? (
                            <>
                                <MdOutlineQuiz className="mr-2 w-8 h-8" /> Quiz
                            </>
                        ) : type === "poll" ? (
                            <>
                                <FileQuestion className="mr-2 w-8 h-8" /> Question (Poll)
                            </>
                        ) : type === "material" ? (
                            <>
                                <MdOutlineBook className="mr-2 w-8 h-8" /> Upload Material
                            </>
                        ) : (
                            "Topic"
                        )}
                    </DialogTitle>
                    <DialogDescription className="border-b pb-2">
                        {type === "assignment"
                            ? "Fill in the details to create an assignment."
                            : type === "quiz"
                                ? "Fill in the details to create a quiz."
                                : type === "poll"
                                    ? "Fill in the details to create a question (poll)."
                                    : type === "material"
                                        ? "Upload study material for the class."
                                        : "Add a new topic for organization."}
                    </DialogDescription>
                </DialogHeader>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleModalSubmit)} className="p-6">
                        {!isTopic ? (
                            <div className="flex gap-6 h-screen">
                                {/* Main Section */}
                                <div className="w-5/6 h-full border-r">
                                    <MainSection type={type} />
                                </div>
                                {/* Aside Section */}
                                <div className="flex-1">
                                    <AsideSection
                                        type={type}
                                        channelName={channelName}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Topic Name</label>
                                <input
                                    {...methods.register("name", { required: "Topic name is required" })}
                                    type="text"
                                    placeholder="Enter topic name"
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                        )}
                        <div className="flex justify-end gap-2 fixed bottom-3 right-5">
                            <Button
                                variant="outline"
                                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-blue-500 text-white hover:bg-blue-600"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

ClassworkModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    channelName: PropTypes.string,
};

export default ClassworkModal;