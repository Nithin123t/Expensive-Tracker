import React from "react";
import { Link } from "react-router-dom";

const Header = ({ user, onLogout }) => {
  if (!user) {
    return null;
  }
  return (
    <header className="flex justify-between items-center max-w-md mx-auto mb-6 p-4 bg-white rounded shadow">
      <div className="flex items-center space-x-4">
        {user.profilePic ? (
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-600">
            {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
          </div>
        )}
        <h1 className="text-xl font-semibold text-gray-800">
          {user.name ? user.name : user.email}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Show Profile link only if user has both name and profilePic */}
        {(user.name && user.profilePic) && (
          <Link
            to="/profile"
            className="text-blue-600 hover:underline"
          >
            Profile
          </Link>
        )}

        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
