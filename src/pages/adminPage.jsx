import { Link, Route, Routes } from "react-router-dom";
import AdminProductPage from "./admin/adminProductPage";
import { FaProductHunt, FaUsers, FaBox, FaStar } from 'react-icons/fa'; 
import AdminUserPage from "./admin/adminUserPage";
import AddProduct from "./admin/addProductPage";
import EditProduct from "./admin/product/editProduct";
import AdminOrderPage from "./admin/product/adminOrderPage";

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="h-full w-[250px] bg-gray-800 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold text-center mb-8 text-white">Admin Dashboard</h2>
        <div className="flex flex-col space-y-6">
          <Link
            to="/admin/product"
            className="flex items-center text-lg font-semibold hover:bg-gray-700 p-2 rounded-md"
          >
            <FaProductHunt className="mr-3 text-xl" />
            Products
          </Link>
          <Link
            to="/admin/user"
            className="flex items-center text-lg font-semibold hover:bg-gray-700 p-2 rounded-md"
          >
            <FaUsers className="mr-3 text-xl" />
            Users
          </Link>
          <Link
            to="/admin/order"
            className="flex items-center text-lg font-semibold hover:bg-gray-700 p-2 rounded-md"
          >
            <FaBox className="mr-3 text-xl" />
            Orders
          </Link>
          <Link
            to="/admin/review"
            className="flex items-center text-lg font-semibold hover:bg-gray-700 p-2 rounded-md"
          >
            <FaStar className="mr-3 text-xl" />
            Reviews
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="h-full w-[calc(100%-250px)] bg-white p-6">
        <Routes>
          <Route path="/product" element={<AdminProductPage />} />
          <Route path="/user" element={<AdminUserPage/>} />
          <Route path="/order" element={<AdminOrderPage/>} />
          <Route path="/review" element={<h1 className="text-2xl">Reviews Page</h1>} />
          <Route path="/add-product" element={<AddProduct/>} />
          <Route path="/edit-product" element={<EditProduct/>} />
        </Routes>
      </div>
    </div>
  );
}
