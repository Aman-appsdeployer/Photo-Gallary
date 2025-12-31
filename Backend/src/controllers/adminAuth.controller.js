import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

/* ================= REGISTER ADMIN ================= */
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const exists = await pool.query(
      "SELECT id FROM admins WHERE email=$1",
      [email]
    );

    if (exists.rows.length > 0) {
      return res.status(409).json({ error: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO admins (name, email, password) VALUES ($1,$2,$3)",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Register admin error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

/* ================= LOGIN ADMIN ================= */
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const result = await pool.query(
      "SELECT * FROM admins WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = result.rows[0];

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ IMPORTANT: RETURN ADMIN OBJECT
    res.status(200).json({
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Login admin error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};




// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { pool } from "../config/db.js";

// /* ================= REGISTER ================= */
// export const registerAdmin = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // check if admin exists
//     const existing = await pool.query(
//       "SELECT id FROM admins WHERE email=$1",
//       [email]
//     );

//     if (existing.rows.length > 0) {
//       return res.status(409).json({ error: "Admin already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await pool.query(
//       "INSERT INTO admins (name, email, password) VALUES ($1,$2,$3)",
//       [name, email, hashedPassword]
//     );

//     res.status(201).json({ message: "Admin created successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

// /* ================= LOGIN ================= */
// export const loginAdmin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const result = await pool.query(
//       "SELECT * FROM admins WHERE email=$1",
//       [email]
//     );

//     if (result.rows.length === 0) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }

//     const admin = result.rows[0];

//     // compare password with Neon DB
//     const isMatch = await bcrypt.compare(password, admin.password);

//     if (!isMatch) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }

//     const token = jwt.sign(
//       { id: admin.id, email: admin.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };
