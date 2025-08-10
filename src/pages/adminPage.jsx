import { Link, Route, Routes } from "react-router-dom";
import AdminProductPage from "./admin/adminProductPage";
import { FaProductHunt, FaUsers, FaBox, FaStar } from 'react-icons/fa';
import AdminUserPage from "./admin/adminUserPage";
import AddProduct from "./admin/addProductPage";
import EditProduct from "./admin/product/editProduct";
import AdminOrderPage from "./admin/product/adminOrderPage";
import EditUser from "./admin/user/editUser";
import { RiAdminLine } from "react-icons/ri";
import AdminDashboard from "./dashboard/adminDashboard";

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="h-full w-64 bg-gray-800 text-white flex flex-col shadow-lg">
        <div className="p-6">
          <Link to="/admin" className="text-2xl font-bold text-center block text-white hover:text-gray-200 transition-colors">
            Admin Dashboard
          </Link>
        </div>

        <nav className="flex-1 px-4 pb-4">
          <div className="flex flex-col space-y-2">
            <Link
              to="/admin/product"
              className="flex items-center text-base font-medium hover:bg-gray-700 p-3 rounded-lg transition-colors group"
            >
              <FaProductHunt className="mr-3 text-lg group-hover:scale-110 transition-transform" />
              Products
            </Link>
            <Link
              to="/admin/user"
              className="flex items-center text-base font-medium hover:bg-gray-700 p-3 rounded-lg transition-colors group"
            >
              <FaUsers className="mr-3 text-lg group-hover:scale-110 transition-transform" />
              Users
            </Link>
            <Link
              to="/admin/order"
              className="flex items-center text-base font-medium hover:bg-gray-700 p-3 rounded-lg transition-colors group"
            >
              <FaBox className="mr-3 text-lg group-hover:scale-110 transition-transform" />
              Orders
            </Link>
            <Link
              to="/admin/review"
              className="flex items-center text-base font-medium hover:bg-gray-700 p-3 rounded-lg transition-colors group"
            >
              <FaStar className="mr-3 text-lg group-hover:scale-110 transition-transform" />
              Reviews
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-full overflow-hidden">
        <div className="h-full overflow-y-auto bg-gray-50">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/product" element={<AdminProductPage />} />
            <Route path="/user" element={<AdminUserPage />} />
            <Route path="/order" element={<AdminOrderPage />} />
            <Route path="/review" element={
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">Reviews Page</h1>
              </div>
            } />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product" element={<EditProduct />} />
            <Route path="/edit-user" element={<EditUser />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}