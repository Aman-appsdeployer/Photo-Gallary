import { motion } from "framer-motion";
import {
  Camera,
  ChevronLeft,
  Image,
  LogOut,
  Menu,
  QrCode,
  Sparkles,
  Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin");
    }
  }, [navigate]);

  const cards = [
    {
      title: "Photographers",
      count: 6,
      icon: <Camera size={26} />,
      action: "/admin/photographers",
      gradient: "from-emerald-400 via-teal-400 to-cyan-400",
    },
    {
      title: "Albums",
      count: 18,
      icon: <Image size={26} />,
      action: "/admin/albums",
      gradient: "from-purple-400 via-pink-400 to-rose-400",
    },
    {
      title: "QR Codes",
      count: 18,
      icon: <QrCode size={26} />,
      action: "/admin/qrcodes",
      gradient: "from-yellow-400 via-orange-400 to-amber-400",
    },
    {
      title: "Clients",
      count: "18",
      icon: <Users size={26} />,
      action: null,
      gradient: "from-blue-400 via-indigo-400 to-violet-400",
    },
  ];

  const navItems = [
    { label: "Dashboard", icon: <Sparkles size={20} />, path: "/admin/dashboard" },
    { label: "Photographers", icon: <Camera size={20} />, path: "/admin/photographers" },
    { label: "Albums", icon: <Image size={20} />, path: "/admin/albums" },
  ];

  return (
    <main className="min-h-screen flex bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900  ">

      {/* ================= SIDEBAR ================= */}
      <motion.aside
        animate={{ width: collapsed ? 90 : 260 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="bg-black/90 backdrop-blur-xl text-white hidden md:flex flex-col border-r border-cyan-400/20"
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between p-5">
          {!collapsed && (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-extrabold text-rose-500 flex items-center gap-2"
            >
              <Sparkles size={20} /> Admin
            </motion.h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-cyan-400/20 transition"
          >
            {collapsed ? <Menu size={22} /> : <ChevronLeft size={22} />}
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-3 space-y-2">
          {navItems.map((item, i) => (
            <motion.button
              key={i}
              whileHover={{ x: 6 }}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              <span className="text-rose-500">{item.icon}</span>
              {!collapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </motion.button>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-cyan-400/20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              localStorage.removeItem("adminToken");
              navigate("/admin/login");
            }}
            className="
              w-full flex items-center justify-center gap-3
              px-4 py-3 rounded-xl
              bg-gradient-to-r from-red-400 to-pink-500
              text-black font-semibold shadow-lg
              hover:shadow-red-400/50
            "
          >
            <LogOut size={18} />
            {!collapsed && "Logout"}
          </motion.button>
        </div>
      </motion.aside>

      {/* ================= MAIN CONTENT ================= */}
      <section className="flex-1 p-6 md:p-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Welcome, Admin 
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage photographers, albums & QR codes
          </p>
        </motion.div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.06, y: -8 }}
              onClick={() => card.action && navigate(card.action)}
              className="relative cursor-pointer rounded-3xl p-6 bg-white/90 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              <div
                className={`absolute inset-0 opacity-20 bg-gradient-to-br ${card.gradient}`}
              />

              <div
                className={`relative w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r ${card.gradient} text-black mb-4 shadow-lg`}
              >
                {card.icon}
              </div>

              <h3 className="relative text-lg font-bold dark:text-white">
                {card.title}
              </h3>

              <p className="relative text-3xl font-extrabold dark:text-white">
                {card.count}
              </p>
            </motion.div>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-14 bg-white/90 dark:bg-gray-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl"
        >
          <h3 className="text-2xl font-bold dark:text-white mb-6">
            🚀 Quick Actions
          </h3>

          <div className="flex flex-wrap gap-4">
            {[
              { label: "Add Photographer", color: "from-emerald-400 to-cyan-400", path: "/admin/photographers/create" },
              { label: "Create Album + QR", color: "from-purple-400 to-pink-400", path: "/admin/albums/create" },
              { label: "Upload Photos", color: "from-cyan-400 to-blue-400", path: "/admin/albums" },
            ].map((btn, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(btn.path)}
                className={`px-6 py-3 bg-gradient-to-r ${btn.color} text-black rounded-xl font-semibold shadow-lg`}
              >
                {btn.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        
      </section>
    </main>
  );
}
