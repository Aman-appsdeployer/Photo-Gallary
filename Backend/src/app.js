import cors from "cors";
import express from "express";

import adminRoutes from "./routes/admin.routes.js";
import albumRoutes from "./routes/album.routes.js";
import photographerRoutes from "./routes/photographer.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* ================= ROUTES ================= */
app.use("/api/admin", adminRoutes);
app.use("/api/photographers", photographerRoutes);
app.use("/api/albums", albumRoutes);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("API running");
});

export default app;





// import cors from "cors";
// import express from "express";
// import adminRoutes from "./routes/adminAuth.routes.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// /* ✅ ROOT ROUTE */
// app.get("/", (req, res) => {
//   res.status(200).json({
//     status: "success",
//     message: "🚀 Backend is running successfully",
//     database: "Connected to Neon DB",
//     auth: "Admin authentication enabled"
//   });
// });

// /* ADMIN AUTH ROUTES */
// app.use("/api/admin", adminRoutes);

// export default app;
