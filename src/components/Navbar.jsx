import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {user ? (
          <>
            <Link to="/milk/add" className="text-white text-lg font-bold">
              Add Milk Data
            </Link>
            <Link to="/milk" className="text-white text-lg font-bold">
              Milk Report
            </Link>
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
