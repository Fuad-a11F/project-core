import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import sendEmail from "./sendEmail.js";
import db from "../db.js";

class Auth {
  generateToken(id) {
    return {
      access_token: jwt.sign(
        {
          data: { id },
        },
        "secret",
        { expiresIn: "1h" },
      ),
      refresh_token: jwt.sign(
        {
          data: { id },
        },
        "secret1",
        { expiresIn: "30d" },
      ),
    };
  }

  async login(req, res) {
    const { email, password } = req.body;

    const userCandidateEmail = await db.user.findMany({ where: { email } });

    if (userCandidateEmail.length === 0) {
      res.send({ message: "Пользователь не найден в системе" });
      return;
    }

    if (bcrypt.compareSync(password, userCandidateEmail[0].password)) {
      const tokens = this.generateToken(userCandidateEmail.id);

      res.send(tokens);
    }

    res.send({ message: "Пользователь не найден в системе" });
  }

  async registrationEmail(req, res) {
    const { email } = req.body;
    const uuid = uuidv4();
    const uniqueLink = `http:localhost:3000/set-password?token=${uuid}`;

    const user = await db.user.create({
      data: {
        id: uuid,
        uniqueLink,
        email,
      },
    });

    await sendEmail(email, "Установите пароль", uniqueLink);

    res.send(user.id);
  }

  async setPassword(req, res) {
    const { id, password } = req.body;

    try {
      const user = await db.user.findUnique({
        where: { id },
      });

      if (user.password) {
        res.send({ message: "Пароль уже установлен" });
        return;
      }
    } catch {
      res.send({ message: "Такого пользователя нет" });
    }

    await db.user.update({
      where: { id },
      data: { password: bcrypt.hashSync(password, 7) },
    });

    const tokens = this.generateToken(id);

    res.send(tokens);
  }

  async getNewRefreshToken(req, res) {
    res.send({ message: "Ok" });
  }

  logout(req, res) {
    res.send({ message: "Ok" });
  }
}

export default new Auth();
