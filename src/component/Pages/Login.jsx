import { Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-black/40 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-xl">
        
        <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6 flex items-center justify-center gap-2">
          <LogIn className="w-6 h-6" /> Login
        </h1>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm mb-1 text-gray-300">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-400 focus:ring-cyan-400 outline-none"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block text-sm mb-1 text-gray-300">Password</label>
          <input
            type={showPass ? "text" : "password"}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-400 outline-none"
            placeholder="Enter password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-11 text-gray-400 hover:text-white"
          >
            {showPass ? <EyeOff /> : <Eye />}
          </button>
        </div>

        {/* Login Button */}
        <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition">
          Login
        </button>

        {/* Switch to Signup */}
        <p className="mt-4 text-center text-gray-400">
          Don’t have an account?{" "}
          <Link to="/create" className="text-cyan-400 hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
