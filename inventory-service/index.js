const express = require("express");
const { Pool } = require("pg");
const bookRoutes = require("./routes/bookRoutes");
const { createBooksTable } = require("./utils/createBooksTable");
const { seedBooks } = require("./utils/seedBooks");

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

// Añadir pool a la solicitud
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.use("/books", bookRoutes);

const initDatabase = async () => {
  await createBooksTable(pool);
  await seedBooks(pool);
};

initDatabase().catch((err) =>
  console.error("Error initializing database:", err)
);

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor de inventario en ejecución en el puerto ${PORT}`);
});
