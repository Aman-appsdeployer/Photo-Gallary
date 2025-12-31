import QRCode from "qrcode";
import cloudinary from "../config/cloudinary.js";
import { pool } from "../config/db.js";

/* ================= CREATE ALBUM ================= */
export const createAlbum = async (req, res) => {
  try {
    const { albumName, photographerId, client, date, description } = req.body;

    if (!albumName || !photographerId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const album = await pool.query(
      `INSERT INTO albums
      (album_name, photographer_id, client_name, event_date, description, status)
      VALUES ($1,$2,$3,$4,$5,'Active')
      RETURNING *`,
      [albumName, photographerId, client, date, description || ""]
    );

    const albumId = album.rows[0].id;

    const publicUrl = `${process.env.FRONTEND_URL}/album/${albumId}`;

    const qrUrl = await QRCode.toDataURL(publicUrl);

    await pool.query(
      "UPDATE albums SET qr_url=$1 WHERE id=$2",
      [qrUrl, albumId]
    );

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
export const getAlbums = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        albums.id,
        albums.album_name,
        albums.qr_url,
        albums.status,
        photographers.name AS photographer_name
      FROM albums
      JOIN photographers ON albums.photographer_id = photographers.id
      ORDER BY albums.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Get albums error:", error.message);
    res.status(500).json({ error: "Failed to fetch albums" });
  }
};

/* ================= GET ALBUM BY ID (ADMIN + CLIENT) ================= */
export const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;

    const albumRes = await pool.query(
      `
      SELECT 
        albums.*,
        photographers.name AS photographer_name
      FROM albums
      JOIN photographers ON albums.photographer_id = photographers.id
      WHERE albums.id=$1
      `,
      [id]
    );

    if (albumRes.rows.length === 0) {
      return res.status(404).json({ error: "Album not found" });
    }

    const photosRes = await pool.query(
      "SELECT image_url FROM photos WHERE album_id=$1",
      [id]
    );

    res.json({
      ...albumRes.rows[0],
      images: photosRes.rows.map((p) => p.image_url),
    });
  } catch (error) {
    console.error("Get album by id error:", error.message);
    res.status(500).json({ error: "Failed to fetch album" });
  }
};

/* ================= UPDATE ALBUM ================= */
export const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { album_name, description, status } = req.body;

    const result = await pool.query(
      `
      UPDATE albums
      SET album_name=$1,
          description=$2,
          status=$3
      WHERE id=$4
      RETURNING *
      `,
      [album_name, description, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Album not found" });
    }

    res.json({
      message: "Album updated successfully",
      album: result.rows[0],
    });
  } catch (error) {
    console.error("Update album error:", error.message);
    res.status(500).json({ error: "Failed to update album" });
  }
};







// import QRCode from "qrcode";
// import cloudinary from "../config/cloudinary.js";
// import { pool } from "../config/db.js";

// /* ================= CREATE ALBUM ================= */
// export const createAlbum = async (req, res) => {
//   try {
//     const { albumName, photographerId, client, date } = req.body;

//     if (!albumName || !photographerId) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Insert album
//     const album = await pool.query(
//       `INSERT INTO albums
//        (album_name, photographer_id, client_name, event_date)
//        VALUES ($1,$2,$3,$4)
//        RETURNING *`,
//       [albumName, photographerId, client, date]
//     );

//     const albumId = album.rows[0].id;

//     // Public album URL
//     const publicUrl = `${process.env.FRONTEND_URL}/album/${albumId}`;

//     // Generate QR Code
//     const qrUrl = await QRCode.toDataURL(publicUrl);

//     // Save QR code
//     await pool.query(
//       "UPDATE albums SET qr_url=$1 WHERE id=$2",
//       [qrUrl, albumId]
//     );

//     // Upload photos to Cloudinary
//     if (req.files && req.files.length > 0) {
//       for (const file of req.files) {
//         const upload = await cloudinary.uploader.upload(file.path, {
//           folder: "albums",
//         });

//         await pool.query(
//           "INSERT INTO photos (album_id, image_url) VALUES ($1,$2)",
//           [albumId, upload.secure_url]
//         );
//       }
//     }

//     res.status(201).json({
//       message: "Album created successfully",
//       albumId,
//       qrUrl,
//     });
//   } catch (error) {
//     console.error("Create album error:", error.message);
//     res.status(500).json({ error: "Failed to create album" });
//   }
// };

// /* ================= GET ALL ALBUMS (ADMIN) ================= */
// export const getAlbums = async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT 
//         albums.id,
//         albums.album_name,
//         albums.qr_url,
//         photographers.name AS photographer_name
//       FROM albums
//       JOIN photographers ON albums.photographer_id = photographers.id
//       ORDER BY albums.id DESC
//     `);

//     res.json(result.rows);
//   } catch (error) {
//     console.error("Get albums error:", error.message);
//     res.status(500).json({ error: "Failed to fetch albums" });
//   }
// };

// /* ================= GET ALBUM BY ID (CLIENT VIEW) ================= */
// export const getAlbumById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const album = await pool.query(
//       "SELECT * FROM albums WHERE id=$1",
//       [id]
//     );

//     if (album.rows.length === 0) {
//       return res.status(404).json({ error: "Album not found" });
//     }

//     const photos = await pool.query(
//       "SELECT image_url FROM photos WHERE album_id=$1",
//       [id]
//     );

//     res.json({
//       album: album.rows[0],
//       photos: photos.rows,
//     });
//   } catch (error) {
//     console.error("Get album by id error:", error.message);
//     res.status(500).json({ error: "Failed to fetch album" });
//   }
// };
