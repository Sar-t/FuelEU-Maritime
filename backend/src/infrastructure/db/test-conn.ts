import { query } from "./db";

(async () => {
  try {
    const res = await query("SELECT NOW() as current_time");
    console.log("✅ Database connection successful!");
    console.log("Current time from DB:", res.rows[0].current_time);
  } catch (err) {
    console.error("❌ Database connection failed:");
    console.error(err);
  } finally {
    process.exit(0);
  }
})();
