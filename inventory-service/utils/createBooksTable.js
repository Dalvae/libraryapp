const createBooksTable = async (pool) => {
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
            "createdBy" INTEGER NOT NULL,
            "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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

module.exports = { createBooksTable };
