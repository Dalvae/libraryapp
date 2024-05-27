//auth.js del Auth-service
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// Configura la conexión a la base de datos
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

app.post("/auth/register", async (req, res) => {
  const { email, firstName, lastName, password} = req.body;

  try {
    // Verifica si el usuario ya existe
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    // Encripta la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario
    const newUser = await pool.query(
      "INSERT INTO users (email, firstName, lastName, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [email, firstName, lastName, hashedPassword]
    );

    res.status(201).json({ user: newUser.rows[0] });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
});

// Ruta de inicio de sesión
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca al usuario en la base de datos
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Verifica la contraseña
    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Genera un token JWT
    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.json({ user: user.rows[0], token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

// Ruta para obtener los datos del usuario autenticado
app.get("/auth/me", async (req, res) => {
  try {
    // Obtiene el token JWT del encabezado de autorización
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    // Verifica y decodifica el token JWT
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Busca al usuario en la base de datos
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    if (user.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ user: user.rows[0] });
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    res.status(500).json({ message: "Error al obtener los datos del usuario" });
  }
});

// Ruta para cerrar la sesión del usuario
app.post("/auth/logout", (req, res) => {
  // Aquí puedes invalidar el token JWT si es necesario
  res.json({ message: "Sesión cerrada exitosamente" });
});

// Ruta para verificar un token JWT
app.post("/validate", (req, res) => {
    // Get the token from the Authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
  
    // Extract token after "Bearer "
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not provided in Authorization header" });
    }
  
    // Verify the token 
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log("Invalid token:", token);
        return res.status(403).json({ message: "Invalid token" });
      }
      res.json({ user });
    });
  });

//seed DB
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
          firstName VARCHAR(255) NOT NULL,
          lastName VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(20) NOT NULL DEFAULT 'user'
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

createUsersTable();
const createAdminUser = async () => {
  try {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    const existingAdmin = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [adminUsername]
    );

    if (existingAdmin.rows.length === 0) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await pool.query(
        "INSERT INTO users (username, password, role) VALUES ($1, $2, $3)",
        [adminUsername, hashedPassword, "admin"]
      );
      console.log("Usuario administrador creado exitosamente");
    } else {
      console.log("El usuario administrador ya existe");
    }
  } catch (error) {
    console.error("Error al crear el usuario administrador:", error);
  }
};
createAdminUser();
// Inicia el servidor
app.listen(process.env.PORT, () => {
  console.log(
    `Servidor de autenticación en ejecución en el puerto ${process.env.PORT}`
  );
});
