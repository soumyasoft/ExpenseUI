import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillWave, FaCalendarAlt, FaFileAlt, FaTag } from 'react-icons/fa';
import { useToast } from "../../context/ToastContext";

const Expense = ({ user, setUser }) => {
  // ...existing state code...

  const [formData, setFormData] = useState({
    expenseName: "",
    description: "",
    amount: "",
    expenseDate: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { triggerToast } = useToast();
    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post("/api/expenses", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      });
      triggerToast("Expense added successfully","success");
      setFormData({ expenseName: "", description: "", amount: "", expenseDate: "" });
      navigate("/expenses/add");
    } catch (err) {
      setError(err.response?.data?.message || "Adding expense failed");
    } finally {
      setLoading(false);
    }
    };


  return (
    <div>
      <Sidebar user={user} setUser={setUser} />
      <div className="ml-20 md:ml-64 p-8 bg-gray-100 min-h-screen flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
              <h1 className="text-3xl font-bold text-white">Add New Expense</h1>
              <p className="text-blue-100 mt-2">Enter your expense details below</p>
            </div>

            {error && (
              <div className="mx-6 mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-6">
                <div>
                  <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                    <FaTag className="mr-2 text-blue-500" />
                    Expense Name
                  </label>
                  <input
                    type="text"
                    name="expenseName"
                    value={formData.expenseName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="e.g., Grocery Shopping"
                  />
                </div>

                <div>
                  <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                    <FaFileAlt className="mr-2 text-blue-500" />
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Add more details about the expense..."
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                      <FaMoneyBillWave className="mr-2 text-blue-500" />
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                      <FaCalendarAlt className="mr-2 text-blue-500" />
                      Date
                    </label>
                    <input
                      type="date"
                      name="expenseDate"
                      value={formData.expenseDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-6 rounded-lg text-white font-medium
                    ${loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5'} 
                    transition duration-200 shadow-md`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Add Expense'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;