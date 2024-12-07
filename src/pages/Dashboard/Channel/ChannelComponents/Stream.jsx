import { ChannelContext } from "@/providers/ChannelProvider/ChannelContext";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, SendHorizonal, Settings, UsersIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import { axiosCommon } from "@/hooks/useAxiosCommon";
import { BsThreeDotsVertical } from "react-icons/bs";
import settingsLogo from "../../../../assets/settings.svg";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Stream = () => {
    const { channel, refetch } = useContext(ChannelContext);
    const [newAnnouncement, setNewAnnouncement] = useState("");
    const { toast } = useToast();
    const { user } = useAuth();
    const [expandedComments, setExpandedComments] = useState({}); // Track expanded comments
    const [commentText, setCommentText] = useState({}); // Track comment input for posts

    const copyChannelCode = () => {
        if (channel?.channelInfo?.channelCode) {
            navigator.clipboard.writeText(channel.channelInfo.channelCode);
            toast({
                title: "Channel code copied!",
                description: "You can now share this code with others.",
                status: "success",
            });
        } else {
            toast({
                title: "Channel code not available!",
                description: "Please try again later.",
                status: "error",
            });
        }
    };
console.log(channel)
    const copyPostCode = (channelCode, postCode) => {
        navigator.clipboard.writeText(`${window.location.origin}/dashboard/ch/${channelCode}/p/${postCode}`)
        toast({
            title: "Link copied!",
            description: "You can now share this link with others.",
            status: "success",
        });
    };

    const generateRandomCode = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    const handlePostAnnouncement = async () => {
        if (newAnnouncement.trim()) {
            const post = {
                type: "announcement",
                content: newAnnouncement,
                timestamp: new Date().toISOString(),
                author: {
                    name: user?.displayName,
                    image: user?.photoURL || "https://robohash.org/default-user?set=set1&size=400x400",
                },
                attachments: [],
                postCode: generateRandomCode(),
                channelCode: channel.channelInfo.channelCode || "N/A",
                comments: [],
            };

            try {
                await axiosCommon.post(`/channels/${channel.channelInfo.channelCode}/posts`, post);
                toast({
                    title: "Post created!",
                    description: "Your announcement was successfully posted.",
                    status: "success",
                });
                refetch();
                setNewAnnouncement("");
            } catch {
                toast({
                    title: "Failed to post!",
                    description: "Something went wrong while posting your announcement.",
                    status: "error",
                });
            }
        } else {
            alert("Please enter a valid announcement.");
        }
    };

    const toggleComments = (index) => {
        setExpandedComments((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleCommentChange = (index, value) => {
        setCommentText((prev) => ({
            ...prev,
            [index]: value,
        }));
    };

    const handleAddComment = async (index) => {
        const comment = commentText[index]?.trim();
        if (!comment) {
            return toast({
                title: "Comment cannot be empty!",
                status: "error",
            });
        }

        const post = channel.posts[index];

        try {
            await axiosCommon.post(
                `/channels/${channel.channelInfo.channelCode}/posts/${post.postCode}/comments`,
                {
                    author: user?.displayName,
                    image: user?.photoURL || "https://robohash.org/default-user?set=set1&size=400x400",
                    content: comment,
                }
            );
            toast({
                title: "Comment added!",
                description: "Your comment was successfully posted.",
                status: "success",
            });
            refetch();
            handleCommentChange(index, ""); // Clear the input field for this post
        } catch (error) {
            console.error("Error adding comment:", error);
            toast({
                title: "Failed to add comment!",
                description: "Something went wrong while adding your comment.",
                status: "error",
            });
        }
    };

    if (!channel) {
        return <div>No stream data available.</div>;
    }

    return (
        <>
            <Card
                className="relative mb-8 bg-cover bg-center border-none"
                style={{
                    backgroundImage: `url('https://www.gstatic.com/classroom/themes/img_code.jpg')`,
                }}
            >
                <CardHeader className="relative z-10">
                    <CardTitle className="text-4xl font-bold text-white">
                        {channel.channelInfo.name || "Channel Page"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                    <p className="text-white text-lg">
                        {channel.channelInfo.section && `${channel.channelInfo.section}`}
                    </p>
                    <p className="text-white text-lg">
                        {channel.channelInfo.courseID && `${channel.channelInfo.courseID}`}
                    </p>
                    <p className="text-white text-lg">
                        {channel.channelInfo.roomID && `Room : ${channel.channelInfo.roomID}`}
                    </p>
                </CardContent>
            </Card>

            <div className="flex flex-col flex-wrap lg:flex-nowrap md:flex-row gap-5">
                {/* Channel Code Section */}
                <Card className="max-h-44">
                    <CardHeader>
                        <CardTitle>Channel Code:</CardTitle>
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
                    <Card>
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
                            <Button onClick={handlePostAnnouncement}>
                                Post
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Updates Section */}
                    {Array.isArray(channel?.posts) && channel.posts?.length > 0 ? (
                        channel.posts.map((post, index) => (
                            <Card key={index} className="shadow-md border">
                                <CardContent className="p-4">
                                    {/* Post Header */}
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={post.author.image}
                                                alt={post.author.name}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div>
                                                <span className="font-bold">{post.author.name}</span>
                                                <p className="text-sm text-gray-500">
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
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button variant="ghost" size="sm" className="rounded-full">
                                                    <BsThreeDotsVertical />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className='w-fit h-fit p-1 absolute right-0'>
                                                <Button variant="ghost" size="sm" onClick={() => copyPostCode(post.channelCode, post.postCode)}>
                                                    Copy Link
                                                </Button>
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    {/* Post Content */}
                                    <p className="mb-4">{post.content}</p>
                                    <hr className="my-3" />

                                    {/* Comment Section */}
                                    <div>
                                        {post.comments?.length > 0 && (
                                            <Button
                                                variant="ghost"
                                                onClick={() => toggleComments(index)}
                                                className="mb-3"
                                            >
                                                <UsersIcon />  {` ${post.comments?.length || 0} Comments`}
                                            </Button>
                                        )}
                                        <ul className="space-y-4">
                                            {(expandedComments[index]
                                                ? post.comments || [] // Ensure post.comments is an array
                                                : (post.comments || []).slice(0, 1) // Show only the first comment if collapsed
                                            ).map((comment, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex justify-between items-center text-sm"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={
                                                                comment.image ||
                                                                "https://robohash.org/default-user?set=set1&size=400x400"
                                                            }
                                                            alt={comment.author}
                                                            className="w-8 h-8 rounded-full"
                                                        />
                                                        <div>
                                                            <span className="font-semibold">
                                                                {comment.author}
                                                            </span>{" "}
                                                            <span className="text-gray-500 text-xs">
                                                                {new Date(comment.timestamp).toLocaleTimeString([], {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                            </span>
                                                            <p>{comment.content}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex items-center mt-4 gap-2">
                                            <img
                                                src={
                                                    user?.photoURL ||
                                                    "https://robohash.org/default-user?set=set1&size=400x400"
                                                }
                                                alt="Your profile"
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <Textarea
                                                rows={1}
                                                value={commentText[index] || ""}
                                                onChange={(e) =>
                                                    handleCommentChange(index, e.target.value)
                                                }
                                                placeholder="Write a comment..."
                                                className="w-full"
                                            />
                                            <Button
                                                onClick={() => handleAddComment(index)}
                                                className="ml-2"
                                                variant="ghost"
                                            >
                                                <SendHorizonal size={20} />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Card className="flex justify-center items-center flex-col md:flex-row p-4 bg-gray-50 shadow-md border rounded">
                            <CardHeader className="">
                                <img src={settingsLogo} alt="settings" className="w-32 h-32 " />
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-2 mt-5">
                                    <CardTitle className="text-2xl font-light">
                                        This is where you can talk to your class
                                    </CardTitle>
                                    <p className="text-sm">
                                        Use the stream to share announcements, post assignments, and
                                        respond to student questions.
                                    </p>
                                </div>
                                <div className="mt-5 float-end btn btn-outline">
                                    <Settings size={20} /> Settings
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
};

export default Stream;