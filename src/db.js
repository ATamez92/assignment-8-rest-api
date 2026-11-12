import pg from "pg";

// Create a reusable pool of connections to the PostgreSQL database.
const { Pool } = pg;
const pool = new Pool();

export default pool;