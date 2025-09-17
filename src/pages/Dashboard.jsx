import React from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = ({user,setUser}) => {
    // console.log(user);
  return (
    <div>
      <Sidebar user={user} setUser={setUser}/>
      <div className="ml-20 md:ml-64 p-8 bg-gray-100 min-h-screen flex-1">
        <h2 className="text-4xl font-bold text-center">Dashboard</h2>
        <p className="text-2xl font-bold text-center">Welcome to the dashboard!</p>
      </div>
    </div>
  );
};

export default Dashboard;
