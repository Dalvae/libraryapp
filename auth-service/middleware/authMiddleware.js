const jwt = require("jsonwebtoken");

exports.authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;
    req.userRole = decodedToken.role;
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(403).json({ message: "Token inválido" });
  }
};

exports.authorizeAdmin = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res
      .status(403)
      .json({ message: "No tienes permiso para realizar esta acción" });
  }
  next();
};
