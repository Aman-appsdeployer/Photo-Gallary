import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  Image,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";


export default function AdminLayout() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  /* ================= LOGOUT ACTION ================= */
  const confirmLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    setShowLogoutModal(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">

      {/* ================= SIDEBAR (DESKTOP) ================= */}
      <aside className="hidden md:flex w-64 bg-black text-white flex-col border-r border-cyan-400/20">
        <div className="p-6 text-cyan-400 text-2xl font-extrabold">
          Admin Panel
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <SidebarItem to="/admin/dashboard" icon={<LayoutDashboard size={18} />}>
            Dashboard
          </SidebarItem>

          <SidebarItem to="/admin/photographers" icon={<Camera size={18} />}>
            Photographers
          </SidebarItem>

          <SidebarItem to="/admin/albums" icon={<Image size={18} />}>
            Albums
          </SidebarItem>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center justify-center gap-3
              px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600
              font-semibold transition shadow-lg"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed z-50 top-0 left-0 h-full w-64 bg-black text-white md:hidden flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-white/10">
                <span className="text-cyan-400 text-xl font-bold">
                  Admin Panel
                </span>
                <X
                  onClick={() => setMobileOpen(false)}
                  className="cursor-pointer"
                />
              </div>

              <nav className="flex-1 px-4 py-4 space-y-2">
                <SidebarItem to="/admin/dashboard" icon={<LayoutDashboard size={18} />}>
                  Dashboard
                </SidebarItem>

                <SidebarItem to="/admin/photographers" icon={<Camera size={18} />}>
                  Photographers
                </SidebarItem>

                <SidebarItem to="/admin/albums" icon={<Image size={18} />}>
                  Albums
                </SidebarItem>
              </nav>

              <div className="p-4 border-t border-white/10">
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full flex items-center justify-center gap-3
                    px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600
                    font-semibold transition"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col">
        <div className="md:hidden flex items-center justify-between p-4 bg-black text-white border-b border-cyan-400/20">
          <Menu
            onClick={() => setMobileOpen(true)}
            className="text-cyan-400 cursor-pointer"
          />
          <span className="font-bold text-cyan-400">
            Admin Dashboard
          </span>
        </div>

        <div className="p-6 md:p-10">
          <Outlet />
        </div>
      </div>

      {/* ================= LOGOUT MODAL ================= */}
      <AnimatePresence>
        {showLogoutModal && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50"
              onClick={() => setShowLogoutModal(false)}
            />

            {/* MODAL */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="fixed z-50 inset-0 flex items-center justify-center px-4"
            >
              <div className="
                w-full max-w-md rounded-2xl
                bg-black/90 backdrop-blur-xl
                border border-white/10
                p-8 text-white shadow-2xl
              ">
                <h2 className="text-2xl font-bold mb-2 text-red-400">
                  Confirm Logout
                </h2>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to logout from the admin panel?
                </p>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="px-5 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={confirmLogout}
                    className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 font-semibold transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================= SIDEBAR ITEM ================= */
function SidebarItem({ to, icon, children }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `
        flex items-center gap-3 px-4 py-3 rounded-xl transition-all
        ${
          isActive
            ? "bg-cyan-400 text-black font-semibold shadow"
            : "hover:bg-gray-800 text-white"
        }
      `
      }
    >
      {icon}
      {children}
    </NavLink>
  );
}








// import { AnimatePresence, motion } from "framer-motion";
// import {
//   Camera,
//   Image,
//   LayoutDashboard,
//   LogOut,
//   Menu,
//   X,
// } from "lucide-react";
// import { useState } from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";

// export default function AdminLayout() {
//   const navigate = useNavigate();
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">

//       {/* ================= SIDEBAR (DESKTOP) ================= */}
//       <aside className="hidden md:flex w-64 bg-black text-white flex-col border-r border-cyan-400/20">
//         <div className="p-6 text-cyan-400 text-2xl font-extrabold">
//           Admin Panel
//         </div>

//         <nav className="flex-1 px-4 space-y-2">
//           <SidebarItem to="/admin/dashboard" icon={<LayoutDashboard size={18} />}>
//             Dashboard
//           </SidebarItem>

//           <SidebarItem to="/admin/photographers" icon={<Camera size={18} />}>
//             Photographers
//           </SidebarItem>

//           <SidebarItem to="/admin/albums" icon={<Image size={18} />}>
//             Albums
//           </SidebarItem>
//         </nav>

//         <div className="p-4">
//           <button
//             onClick={() => {
//               localStorage.removeItem("adminToken");
//               navigate("/admin/login");
//             }}
//             className="w-full flex items-center gap-3 px-4 py-3 bg-red-500 rounded-xl font-semibold hover:bg-red-600 transition"
//           >
//             <LogOut size={18} /> Logout
//           </button>
//         </div>
//       </aside>

//       {/* ================= MOBILE SIDEBAR ================= */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.6 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black z-40 md:hidden"
//               onClick={() => setMobileOpen(false)}
//             />

//             <motion.aside
//               initial={{ x: -260 }}
//               animate={{ x: 0 }}
//               exit={{ x: -260 }}
//               className="fixed z-50 top-0 left-0 h-full w-64 bg-black text-white md:hidden"
//             >
//               <div className="p-6 flex justify-between items-center">
//                 <span className="text-cyan-400 text-xl font-bold">
//                   Admin Panel
//                 </span>
//                 <X onClick={() => setMobileOpen(false)} />
//               </div>

//               <nav className="px-4 space-y-2">
//                 <SidebarItem to="/admin/dashboard" icon={<LayoutDashboard size={18} />}>
//                   Dashboard
//                 </SidebarItem>

//                 <SidebarItem to="/admin/photographers" icon={<Camera size={18} />}>
//                   Photographers
//                 </SidebarItem>

//                 <SidebarItem to="/admin/albums" icon={<Image size={18} />}>
//                   Albums
//                 </SidebarItem>
//               </nav>
//             </motion.aside>
//           </>
//         )}
//       </AnimatePresence>

//       {/* ================= MAIN CONTENT ================= */}
//       <div className="flex-1 flex flex-col">

//         {/* MOBILE TOP BAR */}
//         <div className="md:hidden flex items-center justify-between p-4 bg-black text-white border-b border-cyan-400/20">
//           <Menu onClick={() => setMobileOpen(true)} className="text-cyan-400" />
//           <span className="font-bold text-cyan-400">Admin Dashboard</span>
//         </div>

//         {/* PAGE CONTENT */}
//         <div className="p-6 md:p-10">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= SIDEBAR ITEM ================= */
// function SidebarItem({ to, icon, children }) {
//   return (
//     <NavLink
//       to={to}
//       end
//       className={({ isActive }) =>
//         `flex items-center gap-3 px-4 py-3 rounded-xl transition
//         ${
//           isActive
//             ? "bg-cyan-400 text-black font-semibold"
//             : "hover:bg-gray-800"
//         }`
//       }
//     >
//       {icon}
//       {children}
//     </NavLink>
//   );
// }
