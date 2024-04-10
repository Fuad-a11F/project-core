import db from "../db.js";

class User {
  async getInfo(req, res) {
    try {
      const user = await db.user.findUnique({
        where: { id: req.userId },
        select: { coins: true, email: true, id: true },
      });

      return user;
    } catch {
      return { message: "произошла ошибка" };
    }
  }
}

export default new User();
