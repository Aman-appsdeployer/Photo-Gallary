import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Create() {
  const [showPass, setShowPass] = useState(false);
  const [showCpass, setShowCpass] = useState(false);

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-black/40 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-xl">
        
        <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6 flex items-center justify-center gap-2">
          <UserPlus className="w-6 h-6" /> Create Account
        </h1>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-300">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-400 outline-none"
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-300">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-400 outline-none"
            placeholder="Enter email"
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label className="block text-sm mb-1 text-gray-300">Password</label>
          <input
            type={showPass ? "text" : "password"}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-400 outline-none"
            placeholder="Create password"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-11 text-gray-400 hover:text-white"
          >
            {showPass ? <EyeOff /> : <Eye />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="mb-6 relative">
          <label className="block text-sm mb-1 text-gray-300">Confirm Password</label>
          <input
            type={showCpass ? "text" : "password"}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-400 outline-none"
            placeholder="Confirm password"
          />
          <button
            type="button"
            onClick={() => setShowCpass(!showCpass)}
            className="absolute right-3 top-11 text-gray-400 hover:text-white"
          >
            {showCpass ? <EyeOff /> : <Eye />}
          </button>
        </div>

        {/* Button */}
        <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition">
          Create Account
        </button>

        {/* Link to Login */}
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
