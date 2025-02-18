import app from "./app.js";
import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;

dotenv.config();
const PORT = process.env.PORT || 8000;

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT || 5432,
  ssl: {
    rejectUnauthorized: false,
    require: true,
  },
});

(async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to database successfully....");
    client.release();
  } catch (err) {
    console.error("Database connection error:", err);
  }
})();

// starting the server
const server = app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  // console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
export default pool;
