import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

// Create PostgreSQL pool (Neon-compatible)
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 10000, // wait up to 10s
  idleTimeoutMillis: 30000,
  max: 5,
});

// Handle Neon idle disconnects (NORMAL behavior)
pool.on("error", (err) => {
  console.warn("⚠️ Neon DB connection closed (idle timeout)");
  console.warn("ℹ️ This is normal for serverless databases");
});

// Simple DB health check
export const connectDB = async () => {
  try {
    await pool.query("SELECT 1");
    console.log(" Database connected successfully");
  } catch (error) {
    console.error(" Database connection error:", error.message);
    process.exit(1);
  }
};
