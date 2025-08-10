import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../../utils/meadUpload";
import toast from 'react-hot-toast';
import axios from "axios";

export default function EditUser() {
    const location = useLocation()
    const [userId, setUserId] = useState(location.state._id);
    const [userFirstName, setUserFirstName] = useState(location.state.firstName);
    const [userLastName, setUserLastName] = useState(location.state.lastName);
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [role, setRole] = useState(location.state.role);
    const [currentImageUrl, setCurrentImageUrl] = useState(location.state.img);
    const navigate = useNavigate()

    async function editUser(e) {
        e.preventDefault();

        const token = localStorage.getItem("token")
        if (token == null) {
            toast.error("Please Login first")
            return;
        }

        try {
            let imageUrl = currentImageUrl;

            if (image) {
                toast.loading("Uploading image...");
                imageUrl = await mediaUpload(image);
                toast.dismiss();
            }

            // Prepare user data
            const user = {
                userFirstName: userFirstName,
                userLastName: userLastName,
                role: role,
                img: imageUrl,
                password: password
            }

            if (password && password.trim() !== "") {
                user.password = password;
            }

            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`,
                user,
                {
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    }
                }
            );

            toast.success("User updated successfully")
            navigate("/admin/user")

        } catch (error) {
            toast.dismiss();
            console.error("Update error:", error);

            if (error.response?.data?.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Failed to update user. Please try again.")
            }
        }
    }


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                toast.error("Please select a valid image file (JPEG, PNG, GIF, or WebP)");
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image size must be less than 5MB");
                return;
            }

            setImage(file);
        }
    }

    return (
        <div className="w-full h-full p-6 flex flex-col justify-center items-center space-y-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold text-gray-800">Update User</h2>

            <div className="w-full max-w-md space-y-4">
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">User ID</label>
                    <input
                        type="text"
                        disabled
                        placeholder="Enter User ID"
                        value={userId}
                        className="p-3 rounded-md border border-gray-300 bg-gray-100 shadow-sm cursor-not-allowed"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">First Name</label>
                    <input
                        type="text"
                        placeholder="Enter First name"
                        value={userFirstName}
                        onChange={(e) => setUserFirstName(e.target.value)}
                        className="p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">Last Name</label>
                    <input
                        type="text"
                        placeholder="Enter Last name"
                        value={userLastName}
                        onChange={(e) => setUserLastName(e.target.value)}
                        className="p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">Password</label>
                    <input
                        type="password"
                        placeholder="Enter new password (leave empty to keep current)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <small className="text-gray-500 mt-1">Leave empty to keep current password</small>
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">User Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {currentImageUrl && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                            <img
                                src={currentImageUrl}
                                alt="Current user"
                                className="w-20 h-20 object-cover rounded-md border"
                            />
                        </div>
                    )}
                    {image && (
                        <p className="text-sm text-green-600 mt-1">
                            New image selected: {image.name}
                        </p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">User Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                    </select>
                </div>

                <div className="w-full flex justify-between items-center mt-6">
                    <Link
                        to="/admin/user"
                        className="bg-gray-300 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                    >
                        Cancel
                    </Link>

                    <button
                        onClick={editUser}
                        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        Update User
                    </button>
                </div>
            </div>
        </div>
    );
}