//inventory-service
const express = require("express");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const axios = require("axios");

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

// Middleware de autenticación
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Middleware para verificar el rol de administrador
function authorizeAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Acceso denegado. Se requiere el rol de administrador.' });
    }
  }
  

// Ruta para obtener todos los libros
app.get("/books", authenticateToken, async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM books");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener los libros:", error);
    res.status(500).json({ message: "Error al obtener los libros" });
  }
});

// Ruta para obtener un libro por su ID
app.get("/books/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM books WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener el libro:", error);
    res.status(500).json({ message: "Error al obtener el libro" });
  }
});

// Ruta para crear un nuevo libro
app.post("/books", authenticateToken, async (req, res) => {
  const { title, author, genre, price, stock } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO books (title, author, genre, price, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, author, genre, price, stock]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error al crear el libro:", error);
    res.status(500).json({ message: "Error al crear el libro" });
  }
});

// Ruta para actualizar un libro
app.put("/books/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, price, stock } = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE books SET title = $1, author = $2, genre = $3, price = $4, stock = $5 WHERE id = $6 RETURNING *",
      [title, author, genre, price, stock, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error al actualizar el libro:", error);
    res.status(500).json({ message: "Error al actualizar el libro" });
  }
});

// Ruta para eliminar un libro
app.delete("/books/:id", authenticateToken, authorizeAdmin, async (req, res) => {
    const { id } = req.params;
    try {
      const { rowCount } = await pool.query("DELETE FROM books WHERE id = $1", [id]);
      if (rowCount === 0) {
        return res.status(404).json({ message: "Libro no encontrado" });
      }
      res.sendStatus(204);
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
      res.status(500).json({ message: "Error al eliminar el libro" });
    }
  });
// Crea la tabla "books" si no existe
const createBooksTable = async () => {
  try {
    const result = await pool.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_name = 'books'
        )
      `);

    const tableExists = result.rows[0].exists;

    if (!tableExists) {
      await pool.query(`
          CREATE TABLE books (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            genre VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            stock INTEGER NOT NULL,
            image VARCHAR(255)
          )
        `);
      console.log('Tabla "books" creada exitosamente');
    } else {
      console.log('La tabla "books" ya existe');
    }
  } catch (error) {
    console.error('Error al crear la tabla "books":', error);
  }
};

createBooksTable();
// Inicia el servidor
app.listen(process.env.PORT, () => {
  console.log(
    `Servidor de inventario en ejecución en el puerto ${process.env.PORT}`
  );
});
