import React from "react";
import axios from "axios";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Pagination from "../../components/Pagination";

const Report = ({user,setUser}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });
  
  const params = {
    startDate: formData.startDate,
    endDate: formData.endDate,
    // page: currentPage,
    // limit: 3,
  };
  const [error, setError] = useState("");
  const [reportData, setReportData] = useState([]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("/api/milk", {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Handle the response (e.g., display the report)
      setReportData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Generating report failed");
    }
  };
  const handleReset = () => {
    setFormData({ startDate: "", endDate: "" });
    setReportData([]);
    setError("");
  }
  return (
     <div>
      <Sidebar user={user} setUser={setUser}/>
    <div className="ml-20 md:ml-64 p-8 bg-gray-100 min-h-screen flex-1">
      <div className="">
        <h1 className="text-3xl font-bold text-gray-800"> Milk Report Page</h1>
        {error && (
          <p className="text-red-700 p-3 rounded mb-4 text-center">{error}</p>
        )}
        <form className="mt-6 max-w-md" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="reportDate"
              className="block text-sm text-left font-medium text-gray-700 mb-1"
            >
              From Date
            </label>
            <input
              type="date"
              id="reportDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 border-gray-300 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="reportDateTo"
              className="block text-sm text-left font-medium text-gray-700 mb-1"
            >
              To Date
            </label>
            <input
              type="date"
              id="reportDateTo"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 border-gray-300 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <button className="w-50 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 cursor-pointer">
              Generate Report
            </button>
            <button onClick={handleReset} className="w-50 bg-gray-600 text-white py-2 rounded hover:bg-amber-700 transition duration-200 cursor-pointer">
              Reset
            </button>
          </div>
          
        </form>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-blue-200 p-4 font-bold">
              Total Price: {reportData.totalPriceSum || 0}
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-green-200 p-4 font-bold">
              Total Days : {reportData.totalDays || 0}
            </div>  
        </div>         
          
          <table className="min-w-full bg-white mt-6">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 text-center">Date</th>
                <th className="py-2 px-4 border-b border-gray-200">
                  Quantity (mls)
                </th>
                <th className="py-2 px-4 border-b border-gray-200">
                  Price (Per Lit)
                </th>
                <th className="py-2 px-4 border-b border-gray-200">
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody>
              {reportData.entries.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="py-4 px-4 border-b border-gray-200 text-center text-gray-500"
                  >
                    No data available for the selected date range.
                  </td>
                </tr>
              ) : (
                reportData.entries.map((entry, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-200">                      
                      {new Date(entry.milkInDate).getDate()}/
                      {new Date(entry.milkInDate).getMonth() + 1}/
                      {new Date(entry.milkInDate).getFullYear()}
                      
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {entry.quantity}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {entry.pricePerLiter}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {(entry.quantity / 1000) * entry.pricePerLiter}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="h-16">
          <Pagination 
          totalPages={reportData.entries.totalPages} 
          currentPage={reportData.entries.page}
          onPageChange={setCurrentPage}  
          />
      </div> */}
    </div>
    </div>    
  );
};

export default Report;
