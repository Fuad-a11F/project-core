import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .json({ message: "Отсутствует токен аутентификации." });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Недействительный токен аутентификации." });
    }

    req.userId = decoded.id;
    next();
  });
};

export default isAuth;
