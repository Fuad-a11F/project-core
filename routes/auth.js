/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User's endpoints
 * /auth/login:
 *   post:
 *     summary: login user
 *     tags: [Auth]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *     responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                 refresh_token:
 *                   type: string
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *              message: string
 *
 * /auth/registration-email:
 *   post:
 *     summary: Registration your email
 *     tags: [Auth]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *     responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               message: string
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *              message: string
 *
 * /auth/set-password:
 *   post:
 *     summary: Set password
 *     tags: [Auth]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 password:
 *                   type: string
 *                 new_password:
 *                   type: string
 *     responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                 refresh_token:
 *                   type: string
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *              message: string
 *
 * /auth/refresh-token:
 *   post:
 *     summary: Generate new refresh token
 *     tags: [Auth]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *     responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                 refresh_token:
 *                   type: string
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *              message: string
 *
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *            schema:
 *               message: string
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *              message: string
 */

import { Router } from "express";
import Auth from "../service/auth.js";
import isAuth from "../middleware/isAuth.js";

const authRouter = new Router();

authRouter.post("/login", (req, res) => Auth.login(req, res));
authRouter.post("/registration-email", (req, res) =>
  Auth.registrationEmail(req, res),
);
authRouter.post("/registration-email", (req, res) =>
  Auth.registrationEmail(req, res),
);
authRouter.post("/set-password", (req, res) => Auth.setPassword(req, res));
authRouter.post("/refresh-token", isAuth, (req, res) =>
  Auth.getNewRefreshToken(req, res),
);
authRouter.post("/logout", isAuth, (req, res) => Auth.logout(req, res));

export default authRouter;
