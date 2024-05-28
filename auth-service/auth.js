const express = require("express");
const { createUsersTable, createAdminUser } = require("./utils/seed");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

createUsersTable()
  .then(() => createAdminUser())
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Servidor de autenticación en ejecución en el puerto ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.error("Error al inicializar el servidor:", error);
  });
