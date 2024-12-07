import { ChannelContext } from "@/providers/ChannelProvider/ChannelContext";
import { useContext } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

const People = () => {
    const { channel, isLoading, isError } = useContext(ChannelContext);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !channel) {
        return <div>Error fetching people. Please check the code or try again.</div>;
    }

    return (
        <div className="space-y-6 container mx-auto px-20">
            {/* Teachers Section */}
            <Card className='border-none shadow-lg'>
                <CardHeader>
                    <CardTitle className="text-3xl font-semibold">Teachers</CardTitle>
                </CardHeader>
                <CardContent>
                    {channel.teachers?.length > 0 ? (
                        <ul className="space-y-4">
                            {channel.teachers.map((teacher, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between p-4 border rounded"
                                >
                                    <div className="flex items-center justify-between space-x-4">
                                        {/* Teacher Avatar */}
                                        <Avatar>
                                            <AvatarImage src={teacher.image} alt={teacher.name} />
                                            <AvatarFallback>{teacher.name?.[0] || "T"}</AvatarFallback>
                                        </Avatar>
                                        <p className="font-semibold text-lg">{teacher.name}</p>
                                    </div>
                                    <div className="flex justify-center items-center text-gray-500 rounded-full p-2 hover:bg-gray-200">
                                        {teacher.email && (
                                            <a href={`mailto:${teacher.email}`}>
                                                <Mail size={20} />
                                            </a>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No teachers available.</p>
                    )}
                </CardContent>
            </Card>

            {/* Students Section */}
            <Card className='border-none shadow-xl'>
                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle className="text-3xl font-semibold">Students</CardTitle>
                    <span className="text-md">
                        {channel.students?.length || 0} students
                    </span>
                </CardHeader>
                <CardContent>
                    {channel.students?.length > 0 ? (
                        <ul className="space-y-4">
                            {channel.students.map((student, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between p-4 border rounded"
                                >
                                    <div className="flex items-center justify-between space-x-4">
                                        {/* Student Avatar */}
                                        <Avatar>
                                            <AvatarImage
                                                src={student.image}
                                                alt={student.name || "Student"}
                                            />
                                            <AvatarFallback>
                                                {student.name?.[0] || "S"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <p className="font-semibold text-lg">
                                            {student.name || "Unnamed Student"}
                                        </p>
                                    </div>
                                    <div className="flex justify-center items-center text-gray-500 rounded-full p-2 hover:bg-gray-200">
                                        {student.email && (
                                            <a href={`mailto:${student.email}`}>
                                                <Mail size={20} />
                                            </a>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No students available.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default People;