import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsCart4 } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import UserTag from './userData/userTag';


function Header() {
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <header className="w-full h-[80px] shadow-2xl flex justify-between items-center px-4 relative bg-white">
      {/* Hamburger Menu - Mobile Only */}
      <RxHamburgerMenu
        className='h-6 w-6 text-2xl md:hidden cursor-pointer hover:text-gray-600 transition-colors z-10'
        onClick={() => setDrawerOpen(true)}
      />

      {/* Logo - Centered on mobile, left-aligned on desktop */}
      <div className="absolute left-1/2 transform -translate-x-1/2 md:relative md:left-0 md:transform-none mx-5">
        <img
          onClick={() => navigate("/")}
          src="/logo.png"
          alt="logo"
          className='w-[60px] h-[60px] md:w-[80px] md:h-[80px] object-cover cursor-pointer hover:opacity-80 transition-opacity '
        />
      </div>

      {/* Desktop Navigation */}
      <nav className='hidden md:flex flex-1 justify-center items-center space-x-8'>
        <Link to="/" className='text-lg font-semibold hover:text-purple-500 transition-colors text-purple-900'>
          Home
        </Link>
        <Link to="/product" className='text-lg font-semibold hover:text-purple-500 transition-colors text-purple-900'>
          Product
        </Link>
        <Link to="/search" className='text-lg font-semibold hover:text-purple-500 transition-colors text-purple-900'>
          Search
        </Link>
        <Link to="/about" className='text-lg font-semibold hover:text-purple-500 transition-colors text-purple-900'>
          About
        </Link>
        <Link to="/contact" className='text-lg font-semibold hover:text-purple-500transition-colors text-purple-900'>
          Contact
        </Link>
      </nav>

      {/* Right side actions */}
      <div className='flex items-center space-x-3'>
        {/* Cart - Hidden on mobile, shown in drawer */}
        <Link
          to="/cart"
          className='hidden md:flex text-2xl hover:text-primary transition-colors'
        >
          <BsCart4 />
        </Link>

        <div className=''>
          <UserTag imgLink="https://w7.pngwing.com/pngs/529/832/png-transparent-computer-icons-avatar-user-profile-avatar.png" /> {/* Pass user's profile image here */}
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className='fixed inset-0 h-screen w-full bg-[#00000060] flex md:hidden z-50'>
          <div className='w-[280px] sm:w-[320px] bg-white h-full shadow-xl'>
            {/* Drawer Header */}
            <div className='w-full h-[80px] shadow-md flex justify-between items-center px-4 border-b'>
              <img
                onClick={() => {
                  setDrawerOpen(false)
                  navigate("/")
                }}
                src="/logo.png"
                alt="logo"
                className='w-[60px] h-[60px] object-cover cursor-pointer '
              />
              <RxHamburgerMenu
                className='h-6 w-6 text-2xl cursor-pointer hover:text-gray-600 transition-colors'
                onClick={() => setDrawerOpen(false)}
              />
            </div>

            {/* Drawer Navigation */}
            <nav className='w-full flex flex-col py-4'>
              <Link
                to="/"
                className='text-lg font-semibold py-4 px-6 hover:bg-gray-50 border-b border-gray-100 transition-colors text-purple-900'
                onClick={() => setDrawerOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/product"
                className='text-lg font-semibold py-4 px-6 hover:bg-gray-50 border-b border-gray-100 transition-colors text-purple-900'
                onClick={() => setDrawerOpen(false)}
              >
                Product
              </Link>
              <Link
                to="/about"
                className='text-lg font-semibold py-4 px-6 hover:bg-gray-50 border-b border-gray-100 transition-colors text-purple-900'
                onClick={() => setDrawerOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className='text-lg font-semibold py-4 px-6 hover:bg-gray-50 border-b border-gray-100 transition-colors text-purple-900'
                onClick={() => setDrawerOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/cart"
                className='flex items-center text-lg font-semibold py-4 px-6 hover:bg-gray-50 border-b border-gray-100 transition-colors text-purple-900'
                onClick={() => setDrawerOpen(false)}
              >
                <BsCart4 className="mr-3" />
                Cart
              </Link>
            </nav>

            {/* Drawer Auth Section */}
            <div className='px-6 py-4 border-t border-gray-100 mt-auto'>
              <div className='flex flex-col space-y-3'>
                <Link
                  to="/login"
                  className='w-full text-center py-2 px-4 border bg-gradient-to-r from-purple-600 to-blue-600 hover:bg-blue-700 transition-colors  font-medium'
                  onClick={() => setDrawerOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/sign-up"
                  className='w-full text-center py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:bg-blue-700 transition-colors font-medium'
                  onClick={() => setDrawerOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>

          {/* Overlay - Click to close */}
          <div
            className='flex-1 h-full'
            onClick={() => setDrawerOpen(false)}
          />
        </div>
      )}
    </header>
  )
}

export default Header;
