import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function UserTag() {
  const [user, setUser] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Get user info when component loads
  useEffect(() => {
    getUserInfo()
  }, [])

  // Get token from localStorage
  const getToken = () => {
    return localStorage.getItem("token")
  }

  // Get user email from token
  const getUserEmail = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.email
    } catch (error) {
      console.log('Error reading token:', error)
      return null
    }
  }

  // Get user data from API
  const getUserInfo = async () => {
    const token = getToken()

    if (!token) {
      setLoading(false)
      return
    }

    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/users/users_get",
        {
          headers: { Authorization: "Bearer " + token }
        }
      )

      const userEmail = getUserEmail(token)
      let userData = response.data
      console.log('User data:', userData)

      // If API returns array, find current user
      if (Array.isArray(response.data)) {
        userData = response.data.find(u => u.email === userEmail) || response.data[0]
      }

      if (userData) {
        setUser({
          userId: userData._id,
          name: userData.firstName + " " + userData.lastName,
          role: userData.role,
          email: userData.email,
          lastName: userData.lastName,
          firstName: userData.firstName,
          phone: userData.phone,
          address: userData.address,
          city: userData.city,
          country: userData.country,
          bio: userData.bio,
          image: userData.img,
          createdAt: userData.createdAt
        })
      }
    } catch (error) {
      console.log('Error getting user:', error)
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setShowDropdown(false)
    window.location.href = '/login'
  }

  // Go to dashboard based on role
  const goToDashboard = () => {
    setShowDropdown(false)
    if (user.role === 'admin') {
      window.location.href = '/admin'
    } else {
      window.location.href = '/user-dashboard'
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="w-20 h-4 bg-gray-300 rounded ml-2 animate-pulse"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="hidden md:flex space-x-2">
        <Link
          to="/login"
          className="px-4 py-2 text-purple-900 border border-purple-600 rounded hover:bg-purple-50"
        >
          Login
        </Link>
        <Link
          to="/sign-up"
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Sign Up
        </Link>
      </div>
    )
  }


  // Logged in - show user dropdown
  return (
    <div className="relative">
      {/* User Info Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center p-2 rounded-lg hover:bg-gray-100"
      >
        <img
          src={user.image || "/default-avatar.png"}
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="ml-2 font-medium">{user.name}</span>
        <svg
          className={`w-4 h-4 ml-1 transform transition-transform ${showDropdown ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">

          {/* Admin Dropdown */}
          {user.role === 'admin' && (
            <>
              <button
                onClick={goToDashboard}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Admin Dashboard
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false)
                  window.location.href = '/manage-users'
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Manage Users
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false)
                  window.location.href = '/reports'
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Reports
              </button>
              <Link
                to={`/profile/${user.userId}`}
                state={{ user }} // Pass user data via state
                onClick={() => setShowDropdown(false)}
                className='w-full text-left px-4 py-2 hover:bg-gray-100'
              >

                Profile
              </Link>
            </>
          )}

          {/* Customer Dropdown */}
          {user.role === 'customer' && (
            <>
              <button
                onClick={goToDashboard}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                My Dashboard
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false)
                  window.location.href = '/checkout'
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                My Orders
              </button>
              <Link
                to={`/profile/${user.userId}`}
                state={{ user }} // Pass user data via state
                onClick={() => setShowDropdown(false)}
                className='w-full text-left px-4 py-2 hover:bg-gray-100'
              >

                Profile
              </Link>
            </>
          )}

          {/* Common for both */}
          <hr className="my-1" />
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default UserTag