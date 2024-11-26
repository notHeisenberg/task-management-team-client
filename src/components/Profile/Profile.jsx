import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { axiosCommon } from "@/hooks/useAxiosCommon";
import axios from "axios";

const Profile = () => {
    const { user, profileUpdate, setLoading } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        userName: user?.displayName || "",
        email: user?.email || "",
        photoURL: user?.photoURL || "",
    });

    const IMGBB_API_KEY = "1f0d5a689a825b7724009d022a6172b9";

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const response = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                    formData
                );

                setFormData({
                    ...formData,
                    photoURL: response.data.data.url,
                });
            } catch (error) {
                console.error("Error uploading file to ImgBB: ", error);
            }
        }
    };

    const handleSave = () => {
        axiosCommon
            .put(`/updateUser`, { ...formData, email: user.email }, {})
            .then(() => {
                profileUpdate(formData.userName, formData.photoURL);
                setLoading(false);
                setEditMode(false);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            })
            .catch((error) => {
                console.error("Error updating user data:", error);
            });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Profile</h2>
                <Button
                    variant={editMode ? "destructive" : "outline"}
                    onClick={() => setEditMode(!editMode)}
                >
                    {editMode ? "Cancel" : "Edit"}
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center">
                    <img
                        src={formData.photoURL || "/placeholder.png"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border border-gray-300 object-cover"
                    />
                    {editMode && (
                        <div className="mt-4 w-full">
                            <Label htmlFor="photoFile" className="mb-2">
                                Profile Picture
                            </Label>
                            <Input
                                id="photoFile"
                                type="file"
                                onChange={handleFileChange}
                                className="mt-2"
                            />
                        </div>
                    )}
                </div>

                {/* Form Fields */}
                <div className="flex-1 space-y-4">
                    {/* Username */}
                    <div>
                        <Label htmlFor="userName">Username</Label>
                        {editMode ? (
                            <Input
                                id="userName"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="mt-2"
                            />
                        ) : (
                            <p className="mt-2">{user?.displayName || "No Name"}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className={!editMode && `flex items-center gap-2`}>
                        <Label htmlFor="email">Email:</Label>
                        <Input
                            id="email"
                            name="email"
                            value={formData.email}
                            disabled
                            className="max-w-52 overflow-hidden mt-2"
                        />
                    </div>

                    {/* Save Button */}
                    {editMode && (
                        <Button
                            variant="default"
                            onClick={handleSave}
                            className="w-full mt-4"
                        >
                            Save Changes
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;