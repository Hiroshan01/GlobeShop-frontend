import { Link, Route, Routes } from "react-router-dom";
import { FaProductHunt, FaUsers, FaBox, FaStar } from 'react-icons/fa';
import SellerProductPage from "./sellerProductPage";
import SellerDashboardSum from "./sellerDashboardSum";
import AddProductSeller from "./productSeller/addSellerProduct";
import EditSellerProduct from "./productSeller/editSellerProduct";
import SellerOrderPage from "./sellerOder/sellerOder";

export default function SellerDashboard() {


    return (
        <div className="w-full h-screen flex bg-gray-100 overflow-hidden">
            {/* Sidebar */}
            <div className="h-full w-64 bg-gray-800 text-white flex flex-col shadow-lg">
                <div className="p-6">
                    <Link to="/seller" className="text-2xl font-bold text-center block text-white hover:text-gray-200 transition-colors">
                        Seller Dashboard
                    </Link>
                </div>

                <nav className="flex-1 px-4 pb-4">
                    <div className="flex flex-col space-y-2">
                        <Link
                            to="/seller/product"
                            className="flex items-center text-base font-medium hover:bg-gray-700 p-3 rounded-lg transition-colors group"
                        >
                            <FaProductHunt className="mr-3 text-lg group-hover:scale-110 transition-transform" />
                            Products
                        </Link>

                        <Link
                            to="/seller/order"
                            className="flex items-center text-base font-medium hover:bg-gray-700 p-3 rounded-lg transition-colors group"
                        >
                            <FaBox className="mr-3 text-lg group-hover:scale-110 transition-transform" />
                            Orders
                        </Link>
                        <Link
                            to="/seller/review"
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
                        <Route path="/" element={<SellerDashboardSum />} />
                        <Route path="/product" element={<SellerProductPage />} />
                        <Route path="/add-product" element={<AddProductSeller />} />
                        <Route path="/edit-product" element={<EditSellerProduct />} />
                        <Route path="/order" element={<SellerOrderPage />} />
                        {/* <Route path="/user" element={<AdminUserPage />} />
                        
                        <Route path="/review" element={
                            <div className="p-6">
                                <h1 className="text-2xl font-bold text-gray-900">Reviews Page</h1>
                            </div>
                        } />
                        <Route path="/add-product" element={<AddProduct />} />
                        
                        <Route path="/edit-user" element={<EditUser />} /> */}
                    </Routes>
                </div>
            </div>
        </div >
    )
}