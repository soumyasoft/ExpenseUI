import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaList } from "react-icons/fa";
import { useToast } from "../../context/ToastContext";

const Create = ({user,setUser}) => {
  const [formData, setFormData] = useState({
    quantity: "",
    pricePerLiter: "",
    milkInDate: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { triggerToast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post("/api/milk", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData({ quantity: "", pricePerLiter: "", milkInDate: "" });
      navigate("/milk/add");
      triggerToast("Milk data added successfully","success");
    } catch (err) {
      triggerToast(err.response?.data?.message || "Adding milk data failed","error");
    }
  };
  return (
    <div>
      <Sidebar user={user} setUser={setUser}/>
      <div className="ml-20 md:ml-64 p-8 bg-gray-100 min-h-screen flex-1">
        
        <div className="">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Add Milk Data
          </h2>
          <div className="flex justify-end">          
            <Link to="/milk" className="text-blue-600 ">
              <button className="flex items-center bg-amber-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 cursor-pointer">
                <FaList className="mr-2" />
                View Milk Report
              </button>
            </Link>
          </div>
          {error && (
            <p className="text-red-700 p-3 rounded mb-4 text-center">{error}</p>
          )}
          {success && (
            <p className="text-green-700 p-3 rounded mb-4 text-center">
              {success}
            </p>
          )}

          <form className="mt-6 max-w-md" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity (in mls)
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 border-gray-300 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                placeholder="Enter quantity"
                required            
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="pricePerLit"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price (Per Lit)
              </label>
              <input
                type="number"
                step="0.1"
                id="pricePerLiter"
                name="pricePerLiter"
                value={formData.pricePerLiter}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 border-gray-300 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                placeholder="Enter price(per lit)"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="milkInDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date
              </label>
              <input
                type="date"
                id="milkInDate"
                name="milkInDate"
                value={formData.milkInDate}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 border-gray-300 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button className="w-20 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 cursor-pointer">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;