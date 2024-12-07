import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UsersIcon, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosCommon } from "@/hooks/useAxiosCommon";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import { MdAnnouncement } from "react-icons/md";

const Post = () => {
    const { channelCode, postCode } = useParams();
    const { toast } = useToast();
    const { user } = useAuth();
    const [newComment, setNewComment] = useState("");

    // Fetch the post details
    const { data: post, isLoading, isError, refetch } = useQuery({
        queryKey: ["postDetails", channelCode, postCode],
        queryFn: async () => {
            const response = await axiosCommon.get(`/channels/${channelCode}/posts/${postCode}`);
            return response.data;
        },
    });

    const handleAddComment = async () => {
        const trimmedComment = newComment.trim();
        if (!trimmedComment) {
            return toast({
                title: "Comment cannot be empty!",
                status: "error",
            });
        }

        try {
            await axiosCommon.post(`/channels/${channelCode}/posts/${postCode}/comments`, {
                author: user?.displayName,
                image: user?.photoURL || "https://robohash.org/default-user?set=set1&size=400x400",
                content: trimmedComment,
            });

            toast({
                title: "Comment added!",
                description: "Your comment was successfully posted.",
                status: "success",
            });

            setNewComment(""); // Clear the input
            refetch(); // Refresh comments
        } catch (error) {
            console.error("Error adding comment:", error);
            toast({
                title: "Failed to add comment!",
                description: "Something went wrong while adding your comment.",
                status: "error",
            });
        }
    };

    const formatDate = (timestamp) => {
        const postDate = new Date(timestamp);
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);

        const isToday = postDate.getDate() === now.getDate() &&
                        postDate.getMonth() === now.getMonth() &&
                        postDate.getFullYear() === now.getFullYear();

        const isYesterday = postDate.getDate() === yesterday.getDate() &&
                            postDate.getMonth() === yesterday.getMonth() &&
                            postDate.getFullYear() === yesterday.getFullYear();

        if (isToday) {
            return `Today, ${postDate.toLocaleTimeString([], {
                hour: 'numeric',
                minute: 'numeric',
            })}`;
        } else if (isYesterday) {
            return `Yesterday, ${postDate.toLocaleTimeString([], {
                hour: 'numeric',
                minute: 'numeric',
            })}`;
        } else {
            return `${postDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            })}, ${postDate.toLocaleTimeString([], {
                hour: 'numeric',
                minute: 'numeric',
            })}`;
        }
    };

    if (isLoading) {
        return <div className="text-center">Loading post...</div>;
    }

    if (isError || !post) {
        return <div className="text-center">Error loading post. Please try again later.</div>;
    }


    return (
        <div className="container mx-auto p-6 max-w-4xl">
            {/* Post Card */}
            <Card className="shadow-lg border rounded-lg">
                {/* Header */}
                <CardHeader className="p-6 border-b">
                    <div className="flex items-center gap-2">
                        {/* Demo Announcement Logo */}
                        <div className="w-10 h-10 border rounded-full flex items-center justify-center font-bold">
                            <MdAnnouncement className="text-2xl" />
                        </div>
                        <div>
                            <span className="font-semibold text-3xl capitalize">{post.type}</span>
                            <p className="text-sm opacity-70">
                                {post.author.name} {"| "}
                                {new Date(post.timestamp).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                })},{" "}
                                {new Date(post.timestamp).toLocaleTimeString([], {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                })}
                            </p>
                        </div>
                    </div>
                </CardHeader>

                {/* Content */}
                <CardContent className="p-6">
                    <p className="text-lg">{post.content}</p>
                    {post.attachments?.length > 0 && (
                        <div className="mt-4 space-y-2">
                            {post.attachments.map((attachment, index) => (
                                <a
                                    key={index}
                                    href={attachment.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block underline"
                                >
                                    {attachment.name || "Attachment"}
                                </a>
                            ))}
                        </div>
                    )}
                </CardContent>

                {/* Footer */}
                <CardFooter className="p-6 border-t">
                    <div className="w-full">
                        <h3 className="text-md font-semibold mb-4">
                            <UsersIcon className="inline-block mr-2" /> Comments ({post.comments?.length || 0})
                        </h3>
                        <ul className="space-y-6">
                            {post.comments?.map((comment, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <img
                                        src={
                                            comment.image || "https://robohash.org/default-user?set=set1&size=400x400"
                                        }
                                        alt={comment.author}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <span className="font-semibold">{comment.author}</span>{" "}
                                        <span className="text-xs">
                                            {formatDate(comment.timestamp)}
                                        </span>
                                        <p>{comment.content}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Add Comment Section */}
                        <div className="mt-6 flex items-center gap-4">
                            <img
                                src={
                                    user?.photoURL ||
                                    "https://robohash.org/default-user?set=set1&size=400x400"
                                }
                                alt="Your profile"
                                className="w-10 h-10 rounded-full"
                            />
                            <Textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write a comment..."
                                className="flex-grow"
                                rows={1}
                            />
                            <Button onClick={handleAddComment} variant="ghost">
                                <SendHorizonal size={20} />
                            </Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Post;