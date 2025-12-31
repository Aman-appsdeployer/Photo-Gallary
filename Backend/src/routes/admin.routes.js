import express from "express";
import {
    getDashboardStats,
    loginAdmin,
    registerAdmin,
} from "../controllers/admin.controller.js";

import { verifyAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* ================= AUTH ROUTES ================= */

// Admin register
router.post("/register", registerAdmin);

// Admin login
router.post("/auth/login", loginAdmin);

/* ================= ADMIN DASHBOARD ================= */

// Protected dashboard
router.get("/dashboard", verifyAdmin, getDashboardStats);

export default router;






// import express from "express";
// import { getDashboardStats } from "../controllers/admin.controller.js";
// import { verifyAdmin } from "../middlewares/auth.middleware.js";

// const router = express.Router();

// /* ================= ADMIN DASHBOARD ================= */
// router.get("/dashboard", verifyAdmin, getDashboardStats);

// export default router;
