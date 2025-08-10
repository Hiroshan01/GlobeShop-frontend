import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import mediaUpload from '../utils/meadUpload'
import toast from 'react-hot-toast'

function ProfilePage() {
    const location = useLocation()
    const { userId } = useParams()
    const navigate = useNavigate()

    // Get user data from navigation state or initialize empty
    const [user, setUser] = useState(location.state?.user || null)
    const [loading, setLoading] = useState(!location.state?.user)
    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState({})
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [imageUploading, setImageUploading] = useState(false)

    // Get token from localStorage
    const getToken = () => {
        return localStorage.getItem("token")
    }

    // Validate userId and redirect if invalid
    useEffect(() => {
        console.log('userId from params:', userId)
        console.log('location.state:', location.state)

        // Check if userId is valid (not undefined, null, or "undefined" string)
        if (!userId || userId === 'undefined' || userId === 'null') {
            console.error('Invalid userId:', userId)
            toast.error('Invalid user ID')
            navigate('/') // or wherever you want to redirect
            return
        }

        // Validate MongoDB ObjectId format (24 character hex string)
        const objectIdRegex = /^[0-9a-fA-F]{24}$/
        if (!objectIdRegex.test(userId)) {
            console.error('Invalid userId format:', userId)
            toast.error('Invalid user ID format')
            navigate('/')
            return
        }

        if (!user && userId) {
            fetchUserData()
        } else if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                role: user.role || '',
            })
        }
    }, [userId, user, navigate])

    // Fetch user data from API
    const fetchUserData = async () => {
        const token = getToken()

        if (!token) {
            toast.error('Please login to view profile')
            navigate('/login')
            return
        }

        // Double check userId before making API call
        if (!userId || userId === 'undefined') {
            console.error('Cannot fetch user data: Invalid userId')
            toast.error('Invalid user ID')
            navigate('/')
            return
        }

        try {
            setLoading(true)
            console.log('Fetching user data for userId:', userId)

            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )

            const userData = response.data
            setUser({
                userId: userData._id,
                name: `${userData.firstName} ${userData.lastName}`,
                role: userData.role,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                image: userData.img || "/default-avatar.png",
                isBlock: userData.isBlock,
                createdAt: userData.createdAt
            })

            setFormData({
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                email: userData.email || '',
            })
        } catch (error) {
            console.error('Error fetching user data:', error)
            if (error.response?.status === 401) {
                toast.error('Session expired. Please login again.')
                navigate('/login')
            } else if (error.response?.status === 404) {
                toast.error('User not found')
                navigate('/')
            } else {
                toast.error('Failed to load user data')
            }
        } finally {
            setLoading(false)
        }
    }

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // Handle image upload and preview
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error('Please select a valid image file');
                return;
            }

            // Validate file size (e.g., max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size should be less than 5MB');
                return;
            }

            // Set image file for preview
            setImageFile(file);

            // Create image preview using FileReader
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Update user profile
    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        const token = getToken()

        if (!token) {
            toast.error('Please login to update profile')
            navigate('/login')
            return
        }

        // Validate userId before making update request
        if (!userId || userId === 'undefined') {
            console.error('Cannot update profile: Invalid userId')
            toast.error('Invalid user ID')
            return
        }

        try {
            setUpdateLoading(true)
            let imageUrl = user.image; // Keep existing image URL as default

            // Upload image to Supabase first if a new image is selected
            if (imageFile) {
                try {
                    setImageUploading(true)
                    toast.loading('Uploading image...', { id: 'image-upload' })

                    imageUrl = await mediaUpload(imageFile)
                    toast.success('Image uploaded successfully', { id: 'image-upload' })
                } catch (error) {
                    console.error('Error uploading image:', error)
                    toast.error(`Image upload failed: ${error}`, { id: 'image-upload' })
                    return // Don't proceed if image upload fails
                } finally {
                    setImageUploading(false)
                }
            }

            // Prepare update data
            const updateData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                image: imageUrl
            }

            console.log('Updating profile for userId:', userId)
            console.log('Update data:', updateData)

            // Send update request to backend
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`,
                updateData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            // Update user state with new data
            const responseData = response.data

            setUser(prevUser => ({
                ...prevUser,
                firstName: responseData.firstName,
                lastName: responseData.lastName,
                email: responseData.email,
                name: `${responseData.firstName} ${responseData.lastName}`,
                image: responseData.image || imageUrl
            }))

            setEditing(false)
            setImageFile(null)
            setImagePreview(null)

            toast.success("Profile updated successfully")

        } catch (error) {
            console.error('Error updating profile:', error)
            toast.error(error.response?.data?.message || "Failed to update profile")
        } finally {
            setUpdateLoading(false)
        }
    }

    // Cancel editing
    const handleCancelEdit = () => {
        setEditing(false)
        setImageFile(null)
        setImagePreview(null)
        // Reset form data to original user data
        setFormData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
        })
    }

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        )
    }

    // User not found
    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h2>
                    <p className="text-gray-600 mb-6">The user profile you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen md:w-full h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
                        </div>
                        {!editing && (
                            <button
                                onClick={() => setEditing(true)}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span>Edit Profile</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Profile Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Profile Image and Basic Info */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="text-center">
                                {/* Profile Image */}
                                <div className="relative inline-block">
                                    <img
                                        src={imagePreview || user.image || "/default-avatar.png"}
                                        alt={user.name}
                                        className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-200"
                                    />
                                    {editing && (
                                        <label className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2 cursor-pointer hover:bg-purple-700">
                                            {imageUploading ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            ) : (
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                                disabled={imageUploading || updateLoading}
                                            />
                                        </label>
                                    )}
                                </div>

                                <h2 className="mt-4 text-xl font-bold text-gray-900">{user.name}</h2>
                                <p className="text-gray-600 capitalize">{user.role}</p>
                                {user.createdAt && (
                                    <p className="text-sm text-gray-500 mt-2">
                                        Member since {new Date(user.createdAt).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Profile Details */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm">
                            {editing ? (
                                /* Edit Form */
                                <form onSubmit={handleUpdateProfile} className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Edit Profile</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* First Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                required
                                            />
                                        </div>

                                        {/* Last Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                required
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                required
                                            />
                                        </div>

                                        {/* Role */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Role
                                            </label>
                                            <input
                                                disabled
                                                type="text"
                                                name="role"
                                                value={user.role}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex justify-end space-x-4 mt-6 pt-6 border-t">
                                        <button
                                            type="button"
                                            onClick={handleCancelEdit}
                                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                            disabled={updateLoading || imageUploading}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={updateLoading || imageUploading}
                                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center space-x-2"
                                        >
                                            {(updateLoading || imageUploading) && (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            )}
                                            <span>
                                                {imageUploading ? 'Uploading Image...' :
                                                    updateLoading ? 'Updating...' : 'Save Changes'}
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                /* View Mode */
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>

                                    <div className="space-y-6">
                                        {/* Personal Information */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                                <p className="text-gray-900">{user.firstName || 'Not provided'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                                <p className="text-gray-900">{user.lastName || 'Not provided'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                <p className="text-gray-900">{user.email}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                                <p className="text-gray-900">{user.role || 'Not provided'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage