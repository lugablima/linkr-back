import "../setup.js";
import pg from "pg";

const { Pool } = pg;

const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === "production") {
  databaseConfig.ssl = {
    rejectUnauthorized: false,
  };
}

const db = new Pool(databaseConfig);

export default db;
