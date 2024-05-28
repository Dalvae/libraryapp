const pool = require("../config/db");
const bcrypt = require("bcryptjs");

const createUsersTable = async () => {
  try {
    const result = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'users'
      )
    `);

    const tableExists = result.rows[0].exists;

    if (!tableExists) {
      await pool.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          "firstName" VARCHAR(255) NOT NULL,
          "lastName" VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(20) NOT NULL DEFAULT 'user',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Tabla "users" creada exitosamente');
    } else {
      console.log('La tabla "users" ya existe');
    }
  } catch (error) {
    console.error('Error al crear la tabla "users":', error);
  }
};

const createAdminUser = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    const existingAdmin = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [adminEmail]
    );

    if (existingAdmin.rows.length === 0) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await pool.query(
        'INSERT INTO users (email, "firstName", "lastName", password, role) VALUES ($1, $2, $3, $4, \'admin\')',
        [adminEmail, "System", "Admin", hashedPassword]
      );
      console.log("Usuario administrador creado exitosamente");
    } else {
      console.log("El usuario administrador ya existe");
    }
  } catch (error) {
    console.error("Error al crear el usuario administrador:", error);
  }
};

module.exports = { createUsersTable, createAdminUser };
