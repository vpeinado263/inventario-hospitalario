const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false  
  },
  connectionTimeoutMillis: 10000,
});

// const pool = new Pool({
//   user: process.env.DB_USER || 'postgres',
//   password: process.env.DB_PASSWORD || 'postgres',
//   host: process.env.DB_HOST || 'localhost',
//   port: process.env.DB_PORT || 5432,
//   database: process.env.DB_NAME || 'inventario_hospitalario',
// });

const initDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS insumos (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 0,
        comments TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE OR REPLACE FUNCTION get_insumos()
      RETURNS SETOF insumos AS $$
      BEGIN
        RETURN QUERY SELECT * FROM insumos ORDER BY id DESC;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await pool.query(`
      CREATE OR REPLACE FUNCTION create_insumo(
        p_name VARCHAR,
        p_quantity INTEGER,
        p_comments TEXT
      )
      RETURNS SETOF insumos AS $$
      BEGIN
        INSERT INTO insumos (name, quantity, comments)
        VALUES (p_name, p_quantity, p_comments)
        RETURNING *;
        
        RETURN QUERY SELECT * FROM insumos WHERE id = LASTVAL();
      END;
      $$ LANGUAGE plpgsql;
    `);

    await pool.query(`
      CREATE OR REPLACE FUNCTION update_insumo(
        p_id INTEGER,
        p_name VARCHAR,
        p_quantity INTEGER,
        p_comments TEXT
      )
      RETURNS SETOF insumos AS $$
      BEGIN
        UPDATE insumos 
        SET name = p_name,
            quantity = p_quantity,
            comments = p_comments,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = p_id;
        
        RETURN QUERY SELECT * FROM insumos WHERE id = p_id;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await pool.query(`
      CREATE OR REPLACE FUNCTION delete_insumo(p_id INTEGER)
      RETURNS VOID AS $$
      BEGIN
        DELETE FROM insumos WHERE id = p_id;
      END;
      $$ LANGUAGE plpgsql;
    `);

    console.log('✅ Base de datos PostgreSQL 18 inicializada correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error inicializando la base de datos:', error.message);
    throw error;
  }
};

const testConnection = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT version()');
    console.log('📦 Conectado a:', result.rows[0].version);
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Error de conexión a PostgreSQL:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  initDatabase,
  testConnection,
  query: (text, params) => pool.query(text, params),
};