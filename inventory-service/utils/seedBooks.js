const seedBooks = async (pool) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM books");
    const count = parseInt(result.rows[0].count);

    if (count === 0) {
      await pool.query(`
          INSERT INTO books (title, author, genre, price, stock, "createdBy", image)
          VALUES 
            ('Book One', 'Author One', 'Genre One', 19.99, 10, admin, 'http://example.com/image1.jpg'),
            ('Book Two', 'Author Two', 'Genre Two', 29.99, 5, admin, 'http://example.com/image2.jpg'),
            ('Book Three', 'Author Three', 'Genre Three', 9.99, 20, admin, 'http://example.com/image3.jpg')
        `);
      console.log("Libros de prueba creados exitosamente");
    }
  } catch (error) {
    console.error("Error al crear libros de prueba:", error);
  }
};

module.exports = { seedBooks };
