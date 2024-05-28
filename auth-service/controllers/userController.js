const pool = require("../config/db");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    if (req.userRole !== "admin" && req.userId !== userId) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para realizar esta acción" });
    }

    await pool.query("DELETE FROM users WHERE id = $1", [userId]);
    res.json({ message: "Usuario borrado exitosamente" });
  } catch (error) {
    console.error("Error al borrar el usuario:", error);
    res.status(500).json({ message: "Error al borrar el usuario" });
  }
};
