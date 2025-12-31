import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

/* ================= REGISTER ADMIN ================= */
export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await pool.query(
      "SELECT id FROM admins WHERE email=$1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO admins (name, email, password) VALUES ($1,$2,$3)",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

/* ================= LOGIN ADMIN ================= */
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM admins WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const admin = result.rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      admin: { id: admin.id, name: admin.name }
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

/* ================= DASHBOARD ================= */
// export const getDashboardStats = async (req, res) => {
//   try {
//     const photographers = await pool.query("SELECT COUNT(*) FROM photographers");
//     const albums = await pool.query("SELECT COUNT(*) FROM albums");
//     const photos = await pool.query("SELECT COUNT(*) FROM photos");

//     res.json({
//       photographers: Number(photographers.rows[0].count),
//       albums: Number(albums.rows[0].count),
//       photos: Number(photos.rows[0].count),
//     });
//   } catch (error) {
//     console.error("Dashboard error:", error.message);
//     res.status(500).json({ error: "Failed to load dashboard data" });
//   }
// };

export const getDashboardStats = async (req, res) => {
  try {
    const photographersRes = await pool.query(
      "SELECT COUNT(*) FROM photographers"
    );

    const albumsRes = await pool.query(
      "SELECT COUNT(*) FROM albums"
    );

    const albumCount = Number(albumsRes.rows[0].count);

    res.json({
      photographers: Number(photographersRes.rows[0].count),
      albums: albumCount,
      qrcodes: albumCount,   
      clients: albumCount,   
    });
  } catch (error) {
    console.error("Dashboard error:", error.message);
    res.status(500).json({ error: "Failed to load dashboard data" });
  }
};





// import { pool } from "../config/db.js";

// export const getDashboardStats = async (req, res) => {
//   try {
//     const photographers = await pool.query("SELECT COUNT(*) FROM photographers");
//     const albums = await pool.query("SELECT COUNT(*) FROM albums");
//     const photos = await pool.query("SELECT COUNT(*) FROM photos");

//     res.json({
//       photographers: Number(photographers.rows[0].count),
//       albums: Number(albums.rows[0].count),
//       photos: Number(photos.rows[0].count),
//     });
//   } catch (error) {
//     console.error("Dashboard error:", error.message);
//     res.status(500).json({ error: "Failed to load dashboard data" });
//   }
// };
