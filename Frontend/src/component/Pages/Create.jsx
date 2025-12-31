import { CheckCircle, Eye, EyeOff, UserPlus, XCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Create() {
  const [showPass, setShowPass] = useState(false);
  const [showCpass, setShowCpass] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [popup, setPopup] = useState({
    show: false,
    type: "success", // success | error
    message: "",
  });

  const navigate = useNavigate();

  const handleCreateAccount = async () => {
    if (password !== confirmPassword) {
      setPopup({
        show: true,
        type: "error",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/admin/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setPopup({
          show: true,
          type: "success",
          message: "Admin account created successfully!",
        });

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setPopup({
          show: true,
          type: "error",
          message: data.error || "Account creation failed",
        });
      }
    } catch (error) {
      setPopup({
        show: true,
        type: "error",
        message: "Server error. Please try again later.",
      });
    }
  };

  return (
    <>
      {/* ================= POPUP MODAL ================= */}
      {popup.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-sm text-center shadow-xl animate-fadeIn">
            {popup.type === "success" ? (
              <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
            ) : (
              <XCircle className="w-14 h-14 text-red-500 mx-auto mb-4" />
            )}

            <h2
              className={`text-xl font-bold mb-2 ${
                popup.type === "success"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {popup.type === "success" ? "Success" : "Error"}
            </h2>

            <p className="text-gray-300 mb-6">{popup.message}</p>

            {popup.type === "error" && (
              <button
                onClick={() => setPopup({ ...popup, show: false })}
                className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-black font-semibold rounded-lg"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}

      {/* ================= PAGE ================= */}
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-900 text-white px-4">
        <div className="bg-black/40 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-xl mb-10">
          <h1 className="text-3xl font-bold text-center text-rose-500 mb-6 flex items-center justify-center gap-2">
            <UserPlus className="w-6 h-6" /> Create Account
          </h1>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-rose-500 outline-none"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-300">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-rose-500 outline-none"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="block text-sm mb-1 text-gray-300">
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-rose-500 outline-none"
              placeholder="Create password"
              onChange={(e) => setPassword(e.target.value)}
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
            <label className="block text-sm mb-1 text-gray-300">
              Confirm Password
            </label>
            <input
              type={showCpass ? "text" : "password"}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-rose-500 outline-none"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          <button
            onClick={handleCreateAccount}
            className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-black font-bold rounded-lg transition"
          >
            Create Account
          </button>

          {/* Link to Login */}
          <p className="mt-4 text-center text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-rose-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}









// import { Eye, EyeOff, UserPlus } from "lucide-react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Create() {
//   const [showPass, setShowPass] = useState(false);
//   const [showCpass, setShowCpass] = useState(false);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const navigate = useNavigate();

//   const handleCreateAccount = async () => {
//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/admin/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("Admin account created successfully");
//         navigate("/login");
//       } else {
//         alert(data.error || "Account creation failed");
//       }
//     } catch (error) {
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-900 text-white px-4 ">
//       <div className="bg-black/40 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-xl mb-10">

//         <h1 className="text-3xl font-bold text-center text-rose-500 mb-6 flex items-center justify-center gap-2">
//           <UserPlus className="w-6 h-6" /> Create Account
//         </h1>

//         {/* Full Name */}
//         <div className="mb-4">
//           <label className="block text-sm mb-1 text-gray-300">Full Name</label>
//           <input
//             type="text"
//             className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-rose-500 outline-none"
//             placeholder="Enter your name"
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>

//         {/* Email */}
//         <div className="mb-4">
//           <label className="block text-sm mb-1 text-gray-300">Email</label>
//           <input
//             type="email"
//             className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-rose-500 outline-none"
//             placeholder="Enter email"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         {/* Password */}
//         <div className="mb-4 relative">
//           <label className="block text-sm mb-1 text-gray-300">Password</label>
//           <input
//             type={showPass ? "text" : "password"}
//             className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-rose-500 outline-none"
//             placeholder="Create password"
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

//         {/* Confirm Password */}
//         <div className="mb-6 relative">
//           <label className="block text-sm mb-1 text-gray-300">Confirm Password</label>
//           <input
//             type={showCpass ? "text" : "password"}
//             className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-rose-500 outline-none"
//             placeholder="Confirm password"
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <button
//             type="button"
//             onClick={() => setShowCpass(!showCpass)}
//             className="absolute right-3 top-11 text-gray-400 hover:text-white"
//           >
//             {showCpass ? <EyeOff /> : <Eye />}
//           </button>
//         </div>

//         {/* Button */}
//         <button
//           onClick={handleCreateAccount}
//           className="w-full py-3 bg-rose-500 hover:bg-rose-500 text-black font-bold rounded-lg transition"
//         >
//           Create Account
//         </button>

//         {/* Link to Login */}
//         <p className="mt-4 text-center text-gray-400">
//           Already have an account?{" "}
//           <Link to="/login" className="text-rose-500 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


