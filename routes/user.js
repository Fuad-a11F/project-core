/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User's endpoints
 * /user/user-info:
 *   get:
 *     summary: Get information about user
 *     tags: [Users]
 *     responses:
 *       200:
 *          description: Success.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  access_token:
 *                    type: string
 *                  refresh_token:
 *                    type: string
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *              message: string
 *
 */

import { Router } from "express";
import User from "../service/user.js";
import isAuth from "../middleware/isAuth.js";

const userRouter = new Router();

userRouter.get("/get-info", isAuth, User.getInfo);

export default userRouter;
