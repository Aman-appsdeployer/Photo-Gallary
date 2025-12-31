import { pool } from "../config/db.js";

/* ================= ADD PHOTOGRAPHER ================= */
export const addPhotographer = async (req, res) => {
  try {
    const { name, studio, phone, email, experience, address } = req.body;

    const result = await pool.query(
      `INSERT INTO photographers
       (name, studio, phone, email, experience, address)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [name, studio, phone, email, experience, address]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Add photographer error:", error.message);
    res.status(500).json({ error: "Failed to add photographer" });
  }
};

/* ================= GET ALL PHOTOGRAPHERS ================= */
export const getPhotographers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM photographers ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Get photographers error:", error.message);
    res.status(500).json({ error: "Failed to fetch photographers" });
  }
};

/* ================= GET PHOTOGRAPHER BY ID ================= */
export const getPhotographerById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM photographers WHERE id=$1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Photographer not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Get photographer by ID error:", error.message);
    res.status(500).json({ error: "Failed to fetch photographer" });
  }
};

/* ================= UPDATE PHOTOGRAPHER ================= */
export const updatePhotographer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, studio, phone, email, experience, address } = req.body;

    const result = await pool.query(
      `UPDATE photographers
       SET name=$1,
           studio=$2,
           phone=$3,
           email=$4,
           experience=$5,
           address=$6
       WHERE id=$7
       RETURNING *`,
      [name, studio, phone, email, experience, address, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Photographer not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Update photographer error:", error.message);
    res.status(500).json({ error: "Failed to update photographer" });
  }
};
