import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BsChevronDown } from "react-icons/bs";

function UserTag({ imgLink, onLogout, userRole }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    onLogout();
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [dropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Avatar and Dropdown Toggle */}
      <div
        onClick={toggleDropdown}
        className="flex items-center cursor-pointer space-x-2 hover:opacity-80 transition-opacity"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDropdown();
          }
        }}
      >
        <img
          src={imgLink}
          alt="User Avatar"
          className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
          onError={(e) => {
            e.target.src = "/path/to/default/avatar.jpg";
          }}
        />
        <BsChevronDown 
          className={`text-lg text-gray-600 transition-transform duration-200 ${
            dropdownOpen ? 'rotate-180' : ''
          }`} 
        />
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-[200px] bg-white border border-gray-200 rounded-md shadow-lg z-50 animate-in fade-in-0 zoom-in-95">
          <div className="flex flex-col py-2">
            {/* User Role Indicator */}
            <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100 bg-gray-50">
              {userRole === 'admin' ? 'Administrator' : 'User'}
            </div>
            
            {/* Navigation Link based on role */}
            {userRole === 'admin' ? (
              <Link
                to="/admin-dashboard"
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                onClick={() => setDropdownOpen(false)}
              >
                <span>Admin Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/profile"
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                onClick={() => setDropdownOpen(false)}
              >
                <span>Profile</span>
              </Link>
            )}
            
            {/* Settings Link */}
            <Link
              to="/settings"
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
              onClick={() => setDropdownOpen(false)}
            >
              <span>Settings</span>
            </Link>
            
            {/* Divider */}
            <div className="border-t border-gray-100 my-1"></div>
            
            {/* Logout Button */}
            <button
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left flex items-center"
              onClick={handleLogout}
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserTag;