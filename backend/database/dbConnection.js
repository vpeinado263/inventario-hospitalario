const postgres = require("postgres");

const sql = postgres(process.env.DATABASE_URL, {
  ssl: "require",
});

const connectDB = async () => {
  try {
    await sql`select 1`;
    console.log("✅ Conectado a Supabase PostgreSQL");
  } catch (error) {
    console.error("❌ Error conectando a Supabase:", error.message);
    throw error;
  }
};

module.exports = connectDB;
