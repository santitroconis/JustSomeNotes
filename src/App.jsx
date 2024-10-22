import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/SignUp";
import SupaSignUp from "./pages/SupaSignUp";
import SupaLogin from "./pages/SupaLogin";
import Testpage from "./Testpage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/supa/login" element={<SupaLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/supa/signup" element={<SupaSignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/testpage" element={<Testpage />} />
      </Routes>
    </BrowserRouter>
  );
}
