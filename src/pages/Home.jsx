import React from "react";

const Home = ({ user, error }) => {
    // console.log(user);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl border border-gray-300 text-center">
        {error && (
          <p className="text-red-700 p-3 rounded mb-4 text-center">{error}</p>
        )}
        {user ? (
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {user.name}!
          </h1>
        ) : (
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to the Home Page! Please log in or register.
          </h1>
        )}
      </div>
    </div>
  );
};

export default Home;
