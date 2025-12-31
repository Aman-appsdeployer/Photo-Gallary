import { Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/api";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/admin/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok && data.token) {

        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminName", data.admin?.name || "Admin");

        navigate("/admin/dashboard");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server not responding");
    }
  };

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-black/40 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-xl -mt-28 ">

        <h1 className="text-3xl font-bold text-center text-rose-500 mb-6 flex items-center justify-center gap-2">
          <LogIn className="w-6 h-6" /> Admin Login
        </h1>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm mb-1 text-gray-300">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block text-sm mb-1 text-gray-300">Password</label>
          <input
            type={showPass ? "text" : "password"}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 outline-none"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-11 text-gray-400"
          >
            {showPass ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-rose-500 text-black font-bold rounded-lg"
        >
          Login
        </button>

        <p className="mt-4 text-center text-gray-400">
          Don’t have an account?{" "}
          <Link to="/create" className="text-rose-500 hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}






// import { Eye, EyeOff, LogIn } from "lucide-react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Login() {
//   const [showPass, setShowPass] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/admin/auth/login", {

//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok && data.token) {
//         localStorage.setItem("adminToken", data.token);
//         navigate("/admin/dashboard");
//       } else {
//         alert(data.error || "Invalid credentials");
//       }
//     } catch (error) {
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-900 text-white px-4">
//       <div className="bg-black/40 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-xl">

//         <h1 className="text-3xl font-bold text-center text-rose-500 mb-6 flex items-center justify-center gap-2">
//           <LogIn className="w-6 h-6" /> Login
//         </h1>

//         {/* Email */}
//         <div className="mb-5">
//           <label className="block text-sm mb-1 text-gray-300">Email</label>
//           <input
//             type="email"
//             className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-rose-500 outline-none"
//             placeholder="Enter your email"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         {/* Password */}
//         <div className="mb-6 relative">
//           <label className="block text-sm mb-1 text-gray-300">Password</label>
//           <input
//             type={showPass ? "text" : "password"}
//             className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-rose-500 outline-none"
//             placeholder="Enter password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPass(!showPass)}
//             className="absolute right-3 top-11 text-gray-400 hover:text-white"
//           >
//             {showPass ? <EyeOff /> : <Eye />}
//           </button>
//         </div>

//         {/* Login Button */}
//         <button
//           onClick={handleLogin}
//           className="w-full py-3 bg-rose-500 hover:bg-rose-500 text-black font-bold rounded-lg transition"
//         >
//           Login
//         </button>

//         {/* Switch to Signup */}
//         <p className="mt-4 text-center text-gray-400">
//           Don’t have an account?{" "}
//           <Link to="/create" className="text-rose-500 hover:underline">
//             Create Account
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


