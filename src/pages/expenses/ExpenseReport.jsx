import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";

const ExpenseReport = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: ""
  });
  const [reportData, setReportData] = useState({
    expenses: [],
    totalAmount: 0,
    totalTransactions: 0
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/expenses", {
        params: { 
          startDate: formData.startDate,
          endDate: formData.endDate
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setReportData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch report");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ startDate: "", endDate: "" });
    setReportData({
      expenses: [],
      totalAmount: 0,
      totalTransactions: 0
    });
    setError("");
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'EEE, dd MMM yyyy');
  };

  return (
    <div>
      <Sidebar user={user} setUser={setUser} />
      <div className="ml-20 md:ml-64 p-8 bg-gray-100 min-h-screen flex-1">
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-gray-800">
            Expense Report Page
          </h1>
          <Link to="/expenses/add">
            <button className="flex items-center bg-amber-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 cursor-pointer mt-4">
              Add New Expense
            </button>
          </Link>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Start Date:
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    End Date:
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    required
                    min={formData.startDate}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Generating..." : "Generate Report"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800">Total Expenses</h2>
            <p className="text-3xl font-bold text-blue-600">₹{reportData.totalAmount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800">Total Transactions</h2>
            <p className="text-3xl font-bold text-green-600">{reportData.total}</p>
          </div>
        </div>

        {/* Expense Table */}
        <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Expense Details</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expense Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportData.expenses.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      No expenses found for the selected date range
                    </td>
                  </tr>
                ) : (
                  reportData.expenses.map((expense, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(expense.expenseDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">{expense.expenseName}</td>
                      <td className="px-6 py-4">{expense.description}</td>
                      <td className="px-6 py-4">₹{expense.amount}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseReport;