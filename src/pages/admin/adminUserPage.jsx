import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminUserPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/users_get")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="w-full h-full max-h-full overflow-y-auto p-6">
      <table className="min-w-full table-auto bg-white border-separate border-spacing-0 rounded-lg shadow-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left">User Id</th>
            <th className="px-6 py-3 text-left">First Name</th>
            <th className="px-6 py-3 text-left">Last Name</th>
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
                  <td className="px-6 py-3">{user.firstName}</td>
                  <td className="px-6 py-3">{user.firstName}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">{user.role}</td>
                  <td className="px-6 py-3">
                    <img src={user.img[0]} className="w-[100px] h-[100px] object-cover rounded-md" />
                  </td>
                  <td className="px-6 py-3 flex space-x-2">
                    <button className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition">
                      Delete
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
