import React, { useActionState, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useToast } from "../context/ToastContext";

const Profile = ({user,setUser}) => {
    const [error, setError] = useState("");

    const { triggerToast } = useToast();

    const handleSubmit = async (previousData,formData) => {
        const token = localStorage.getItem("token");    
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        if(!name || !email || !password){
            triggerToast("All fields are required","error");
            return;
        }
        try {
          const res = await axios.put("/api/users/" + user._id, {name, email, password}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          });
            // Handle success (e.g., show a success message)
            console.log("Profile updated successfully");
        } catch (err) {
            // Handle error (e.g., show an error message)
            setError("Profile update failed");
            console.error("Profile update failed", err);
        }
    };

    const [data, action,pending] = useActionState(handleSubmit,undefined);


    
  return (
    <div>
      <Sidebar user={user} setUser={setUser}/>
      <div className="ml-20 md:ml-64 p-8 bg-gray-100 min-h-screen flex-1">
        <h2 className="text-4xl font-bold">Profile</h2>
        <p className="text-2xl font-bold">Welcome to your profile page!</p>
        {error && <p className="text-red-500">{error}</p>}
        <form className="mt-6 max-w-md" action={action}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">   
                Name
            </label>
            <input defaultValue={user.name} className="shadow appearance-none border rounded w-full py-2 px-3 border-gray-300 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500" id="name" name="name" type="text" placeholder="name" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
            </label>
            <input defaultValue={user.email} className="shadow appearance-none border rounded w-full py-2 px-3 border-gray-300 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500" name="email" id="email" type="email" placeholder="Email" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 border-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500" name="password" id="password" type="password" placeholder="******************" />
          </div>

          <div className="flex items-center justify-between">
            <button disabled={pending} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer">
                Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
