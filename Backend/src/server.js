import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to Neon PostgreSQL
    await connectDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log("🚀 Server Started Successfully");
      console.log(`🌐 Server URL : http://localhost:${PORT}`);
      console.log("🗄️  Database  : Connected (Neon DB)");
    });
  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error);
    process.exit(1);
  }
};

startServer();
