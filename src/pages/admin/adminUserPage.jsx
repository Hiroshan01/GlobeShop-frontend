import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function AdminUserPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/users_get")
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [isLoading]);

  function deleteUser(userId) {
    const token = localStorage.getItem("token")
    if (token == null) {
      toast.error("Please Login first")
      return
    }

    axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/users/" + userId, {
      headers: {
        "Authorization": "Bearer " + token
      }

    }).then(() => {
      toast.success("User deleted successfully")
      setIsLoading(true)
    }).catch((e) => {
      toast.error(e.response.data.message)
    })
  }
  return (
    <div className="w-full h-screen flex max-h-full overflow-y-auto p-1">
      <table className="min-w-full table-auto bg-white border-separate border-spacing-0 rounded-lg shadow-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left">User Id</th>
            <th className="px-6 py-3 text-left">First Name</th>

            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Role</th>
            <th className="px-6 py-3 text-left">Image</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3">{user._id}</td>
                  <td className="px-6 py-3">{user.firstName + " " + user.lastName}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">{user.role}</td>
                  <td className="px-6 py-3">
                    {user.img ? (
                      <img
                        src={user.img}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-[100px] h-[100px] object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-[100px] h-[100px] bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-gray-500 text-sm">No Image</span>
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-3 flex space-x-2">
                    <button className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition">
                      <FaRegEdit onClick={() => {
                        navigate("/admin/edit-user", {
                          state: user //bring item data
                        })

                      }} />
                    </button>
                    <button className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition">
                      <FaRegTrashCan onClick={() => {
                        deleteUser(user._id)
                      }} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-3 text-center text-gray-500">No users found</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}
