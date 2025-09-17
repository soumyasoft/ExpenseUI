import React from "react";
import { FaBars, FaCog, FaHome, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LuMilk } from "react-icons/lu";
import { FcCalendar } from "react-icons/fc";

const Sidebar = ({user,setUser}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setUser(null);
    navigate("/");
  };
  

  const menuItems = [
    { path: "/dashboard", icon: <FaHome size={24} />, text: "Home" },
    { path: "/profile", icon: <FaUserAlt size={24} />, text: "Profile" },
    { path: "/expenses", icon: <FcCalendar size={24} />, text: "Manage Expenses" },
    { path: "/milk/add", icon: <LuMilk size={24} />, text: "Manage Milk" },
  ];

  return (
    <div className="flex">
      <div className={`fixed top-0 left-0 h-full md:w-64 bg-gray-800 transition-width duration-300 min-h-screen text-white ${isOpen ? "w-64" : "w-20"}`}>
        <div className="flex justify-between items-center p-4">
          <h2 className={`text-xl font-bold md:block ${isOpen ? "block" : "hidden"}`}>EXPENSE APP</h2>
          <button className="block md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen?<IoCloseSharp size={24} />:<FaBars size={24} />}
          </button>
        </div>
        <hr className="border-t border-gray-700" />
        <nav className="mt-4">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center p-4 cursor-pointer
                    ${isActive ? 'bg-amber-700' : 'hover:bg-amber-700'}
                  `}
                >
                  {item.icon}
                  <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>
                    {item.text}
                  </span>
                </NavLink>
              </li>
            ))}

            <li className="flex items-center p-4 hover:bg-amber-700 cursor-pointer">
              <FaCog size={24} />
              <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Settings</span>
            </li>            
            <li className="flex items-center p-4 hover:bg-amber-700 cursor-pointer" onClick={handleLogout}>
              <FaSignOutAlt size={24} />
              <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Logout</span>
            </li>
          </ul>
        </nav>
      </div>
      
    </div>
  );
};

export default Sidebar;
