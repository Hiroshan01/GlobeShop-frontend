import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import ProductPage from "./client/productPage";
import ProductOverview from "./client/productOverview";
import Cart from "./client/cart";
import CheckoutPage from "./client/checkoutPage";
import Footer from "../components/footer";
import HomePage from "./home/homePage";
import ProfilePage from "../components/userProfile";
import AboutPage from "./home/about";
import ContactPage from "./home/contactPage";
import ForgotPassword from "./foretPassword";
import SellerDashboard from "./seller/sellerDashboard";
import SearchProductPage from "./client/searchProduct";


export default function Home() {

    return (
        <div className="w-full h-[calc[100vh-80px] flex flex-col items-center">


            <Routes path="/*">
                <Route path="/" element={<HomePage />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/forget_password" element={<ForgotPassword />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile/:userId" element={<ProfilePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/search" element={<SearchProductPage />} />
                <Route path="/overview/:id" element={<ProductOverview />} />

                <Route path="/*" element={<h1>404 Not Found</h1>} />
            </Routes>
            <Footer />

        </div>
    )
}