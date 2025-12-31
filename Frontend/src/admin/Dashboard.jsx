import { motion } from "framer-motion";
import API_BASE_URL from "../config/api";
import {
  BarChart3,
  Camera,
  Image,
  Plus,
  QrCode,
  Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [adminName, setAdminName] = useState("Admin");
  const [statsData, setStatsData] = useState({
    photographers: 0,
    albums: 0,
    qrcodes: 0,
    clients: 0,
  });

  /* ================= CHART DATA (STATIC FOR NOW) ================= */
  const chartData = [
    { month: "Jan", albums: 3 },
    { month: "Feb", albums: 6 },
    { month: "Mar", albums: 10 },
    { month: "Apr", albums: 14 },
    { month: "May", albums: 18 },
  ];

  /* ================= FETCH DASHBOARD DATA ================= */
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const name = localStorage.getItem("adminName");

    if (!token) {
      navigate("/");
      return;
    }

    if (name) setAdminName(name);

    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        // if (res.ok) {
        //   setStatsData({
        //     photographers: Number(data.photographers),
        //     albums: Number(data.albums),
        //     qrcodes: Number(data.qrcodes),
        //     clients: Number(data.clients),
        //   });
        // }
        if (res.ok) {
          setStatsData({
            photographers: data.photographers,
            albums: data.albums,
            qrcodes: data.qrcodes,   
            clients: data.clients,   
          });
        }
      } catch (error) {
        console.error("Dashboard fetch failed", error);
      }
    };

    fetchDashboard();
  }, [navigate]);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminName");
      navigate("/");
    }
  };

  /* ================= STATS CONFIG ================= */
  const stats = [
    {
      title: "Photographers",
      count: statsData.photographers,
      icon: <Camera />,
      gradient: "from-emerald-400 to-cyan-400",
      path: "/admin/photographers",
    },
    {
      title: "Albums",
      count: statsData.albums,
      icon: <Image />,
      gradient: "from-purple-400 to-pink-400",
      path: "/admin/albums",
    },
    {
      title: "QR Codes",
      count: statsData.qrcodes,
      icon: <QrCode />,
      gradient: "from-yellow-400 to-orange-400",
      path: "/admin/qrcodes",
    },
    {
      title: "Clients",
      count: statsData.clients,
      icon: <Users />,
      gradient: "from-blue-400 to-indigo-400",
      path: null,
    },
  ];

  return (
    <section className="p-6 md:p-10">

      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Welcome, {adminName} 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Overview of photographers, albums & QR activity
          </p>
        </div>

        {/* LOGOUT BUTTON */}
        {/* <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2 rounded-xl
          bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg"
        >
          <LogOut size={18} /> Logout
        </button> */}
      </motion.div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            whileHover={{ scale: 1.06, y: -6 }}
            onClick={() => item.path && navigate(item.path)}
            className="
              relative overflow-hidden cursor-pointer
              bg-white/90 dark:bg-gray-800/80
              backdrop-blur-xl
              p-6 rounded-3xl shadow-2xl
            "
          >
            <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${item.gradient}`} />

            <div
              className={`relative w-12 h-12 rounded-xl bg-gradient-to-r ${item.gradient}
              flex items-center justify-center mb-4 shadow-lg text-black`}
            >
              {item.icon}
            </div>

            <h3 className="relative font-bold text-lg text-gray-800 dark:text-white">
              {item.title}
            </h3>

            <p className="relative text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              {item.count}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-14 bg-white/90 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          ⚡ Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admin/add-photographer")}
            className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black rounded-xl font-semibold shadow-lg"
          >
            <Plus className="inline mr-2" /> Add Photographer
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admin/upload-album")}
            className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-black rounded-xl font-semibold shadow-lg"
          >
            📁 Create Album + QR
          </motion.button>
        </div>
      </motion.div>

      {/* ================= CHART SECTION ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          bg-white/90 dark:bg-gray-800/80
          backdrop-blur-xl
          rounded-3xl shadow-2xl
          p-6 md:p-8
        "
      >
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="text-cyan-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Album Growth Overview
          </h2>
        </div>

        <div className="w-full h-[280px] sm:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="albums"
                radius={[12, 12, 0, 0]}
                fill="url(#dashboardGradient)"
              />
              <defs>
                <linearGradient id="dashboardGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </section>
  );
}







