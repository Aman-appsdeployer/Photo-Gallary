import express from "express";
import QRCode from "qrcode";
import cloudinary from "../config/cloudinary.js";
import { pool } from "../config/db.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";



const router = express.Router();

/* ================= CREATE ALBUM ================= */
export const createAlbum = async (req, res) => {
  try {
    const { albumName, photographerId, client, date } = req.body;

    if (!albumName || !photographerId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    /* INSERT ALBUM */
    const albumRes = await pool.query(
      `INSERT INTO albums 
        (album_name, photographer_id, client_name, event_date, status)
       VALUES ($1,$2,$3,$4,'Active')
       RETURNING *`,
      [albumName, photographerId, client || null, date || null]
    );

    const album = albumRes.rows[0];
    const albumId = album.id;

    /* PUBLIC CLIENT URL */
    const publicUrl = `${process.env.FRONTEND_URL}/album/${albumId}`;

    /* GENERATE QR CODE */
    const qrUrl = await QRCode.toDataURL(publicUrl);

    await pool.query(
      "UPDATE albums SET qr_url=$1 WHERE id=$2",
      [qrUrl, albumId]
    );

    /* UPLOAD PHOTOS */
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const upload = await cloudinary.uploader.upload(file.path, {
          folder: "albums",
        });

        await pool.query(
          "INSERT INTO photos (album_id, image_url) VALUES ($1,$2)",
          [albumId, upload.secure_url]
        );
      }
    }

    res.status(201).json({
      message: "Album created successfully",
      albumId,
      qrUrl,
    });
  } catch (error) {
    console.error("Create album error:", error.message);
    res.status(500).json({ error: "Failed to create album" });
  }
};

/* ================= GET ALL ALBUMS (ADMIN) ================= */
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        a.id,
        a.album_name,
        a.client_name,
        a.event_date,
        a.qr_url,
        a.created_at,
        p.name AS photographer_name
      FROM albums a
      LEFT JOIN photographers p
        ON a.photographer_id = p.id
      ORDER BY a.created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Get albums error:", error.message);
    res.status(500).json({ error: error.message });
  }
});


/* ================= GET ALBUM BY ID ================= */
// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const albumRes = await pool.query(
//       `
//       SELECT 
//         a.id,
//         a.album_name,
//         a.client_name,
//         a.event_date,
//         a.qr_url,
//         a.created_at,
//         p.name AS photographer_name
//       FROM albums a
//       LEFT JOIN photographers p
//         ON a.photographer_id = p.id
//       WHERE a.id = $1
//       `,
//       [id]
//     );

//     if (albumRes.rows.length === 0) {
//       return res.status(404).json({ error: "Album not found" });
//     }

//     const photosRes = await pool.query(
//       "SELECT image_url FROM photos WHERE album_id = $1",
//       [id]
//     );

//     res.json({
//       ...albumRes.rows[0],
//       images: photosRes.rows.map(p => p.image_url),
//     });
//   } catch (error) {
//     console.error("Get album by id error:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

/* ================= ADMIN: GET ALBUM BY ID ================= */
router.get("/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const albumRes = await pool.query(
      `
      SELECT 
        a.id,
        a.album_name,
        a.client_name,
        a.event_date,
        a.qr_url,
        a.created_at,
        p.name AS photographer_name
      FROM albums a
      LEFT JOIN photographers p ON a.photographer_id = p.id
      WHERE a.id = $1
      `,
      [id]
    );

    if (albumRes.rows.length === 0) {
      return res.status(404).json({ error: "Album not found" });
    }

    const photosRes = await pool.query(
      "SELECT image_url FROM photos WHERE album_id = $1",
      [id]
    );

    res.json({
      ...albumRes.rows[0],
      images: photosRes.rows.map(p => p.image_url), // 🔥 REQUIRED
    });
  } catch (error) {
    console.error("Admin album error:", error.message);
    res.status(500).json({ error: "Failed to load album" });
  }
});

/* ================= UPDATE ALBUM ================= */
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { album_name, client_name, event_date } = req.body;

    await pool.query(
      `
      UPDATE albums
      SET album_name = $1,
          client_name = $2,
          event_date = $3
      WHERE id = $4
      `,
      [album_name, client_name || null, event_date || null, id]
    );

    res.json({ message: "Album updated successfully" });
  } catch (error) {
    console.error("Update album error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;

/* ================= PUBLIC ALBUM (QR) ================= */
router.get("/public/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const albumRes = await pool.query(
      `
      SELECT 
        id,
        album_name,
        client_name,
        event_date,
        created_at
      FROM albums
      WHERE id = $1
      `,
      [id]
    );

    if (albumRes.rows.length === 0) {
      return res.status(404).json({ error: "Album not found" });
    }

    const photosRes = await pool.query(
      "SELECT image_url FROM photos WHERE album_id = $1",
      [id]
    );

    res.json({
      ...albumRes.rows[0],
      images: photosRes.rows.map(p => p.image_url),
    });
  } catch (error) {
    console.error("Public album error:", error.message);
    res.status(500).json({ error: "Failed to load album" });
  }
});

 /* ================= PUBLIC ALBUM (QR ACCESS) ================= */
router.get("/public/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch album details
    const albumRes = await pool.query(
      `
      SELECT 
        album_name,
        client_name,
        event_date,
        created_at
      FROM albums
      WHERE id = $1
      `,
      [id]
    );

    if (albumRes.rows.length === 0) {
      return res.status(404).json({ error: "Album not found" });
    }

    // Fetch photos
    const photosRes = await pool.query(
      "SELECT image_url FROM photos WHERE album_id = $1",
      [id]
    );

    res.json({
      ...albumRes.rows[0],
      images: photosRes.rows.map(p => p.image_url),
    });
  } catch (error) {
    console.error("Public album error:", error.message);
    res.status(500).json({ error: "Failed to load album" });
  }
});







// import express from "express";
// import multer from "multer";
// import {
//   createAlbum,
//   getAlbumById,
//   getAlbums,
// } from "../controllers/album.controller.js";
// import { verifyAdmin } from "../middlewares/auth.middleware.js";

// const router = express.Router();

// /* Multer config */
// const upload = multer({
//   dest: "uploads/",
// });

// /* ================= ROUTES ================= */

// // Admin: create album
// router.post("/", verifyAdmin, upload.array("photos", 20), createAlbum);

// // Admin: get all albums
// router.get("/", verifyAdmin, getAlbums);

// // Client/Admin: get album by ID
// router.get("/:id", getAlbumById);

// export default router;
