const pool = require("../config/db");

const getAllBooks = async (req, res) => {
  try {
    const { rows } = await req.pool.query("SELECT * FROM books");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener los libros:", error);
    res.status(500).json({ message: "Error al obtener los libros" });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await req.pool.query("SELECT * FROM books WHERE id = $1", [
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
};

const createBook = async (req, res) => {
  const { title, author, genre, price, stock, image, description } = req.body;
  const createdBy = req.user.id;
  const createdAt = new Date();

  try {
    const { rows } = await req.pool.query(
      'INSERT INTO books (title, author, genre, price, stock, "createdBy", "createdAt", image, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [
        title,
        author,
        genre,
        parseFloat(price),
        parseInt(stock),
        createdBy,
        createdAt,
        image,
        description,
      ]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error al crear el libro:", error);
    res.status(500).json({ message: "Error al crear el libro" });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, price, stock, image, description } = req.body;
  const lastEdited = new Date();

  try {
    const { rows } = await req.pool.query(
      'UPDATE books SET title = $1, author = $2, genre = $3, price = $4, stock = $5, image = $6, description = $7, "lastEdited" = $8 WHERE id = $9 RETURNING *',
      [title, author, genre, price, stock, image, description, lastEdited, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error al actualizar el libro:", error);
    res.status(500).json({ message: "Error al actualizar el libro" });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await req.pool.query(
      "DELETE FROM books WHERE id = $1",
      [id]
    );
    if (rowCount === 0) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error("Error al eliminar el libro:", error);
    res.status(500).json({ message: "Error al eliminar el libro" });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
