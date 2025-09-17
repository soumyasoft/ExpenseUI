import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import Create from "./pages/milk/Create";
import Report from "./pages/milk/Report";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Expense from "./pages/expenses/Expense";
import ExpenseReport from "./pages/expenses/ExpenseReport";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      if (token) {
        try {
          const res = await axios.get("/api/users/" + id, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(res.data.user);
        } catch (err) {
          setError("Failed to fetch user");
          localStorage.removeItem("token");
          localStorage.removeItem("id");
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <Router>
      {/* <Navbar user={user} setUser={setUser} /> */}
      {/* {user ? <Sidebar user={user} />:null} */}
      <Routes>
        <Route path="/dashboard" element={user ? <Dashboard user={user} setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/" />} />
        <Route
          path="/milk/add"
          element={user ? <Create user={user}  setUser={setUser}/> : <Navigate to="/" />}
        />
        <Route
          path="/expenses"
          element={user ? <ExpenseReport user={user} setUser={setUser}  /> : <Navigate to="/" />}
        />
        <Route
          path="/expenses/add"
          element={user ? <Expense user={user} setUser={setUser}  /> : <Navigate to="/" />}
        />
        <Route
          path="/milk"
          element={user ? <Report user={user} setUser={setUser}  /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
