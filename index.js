import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import "./service/authGoogle.js";
import "./service/authTwitter.js";
import "./service/authFacebook.js";

const app = express();

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "***",
      version: "1.0.0",
      description: "This is simple API for ***",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(passport.initialize());

app.use(
  session({
    secret: "GOCSPX",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

app.use(passport.session());

// =================

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] }),
);

app.get("/auth/google/ok", isLoggedIn, (req, res) => {
  console.log(req.user.displayName);
  console.log();
  res.send("ok");
});

app.get("/auth/google/fail", (req, res) => {
  console.log("fail");
  res.send("fail");
});

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/fail",
    successRedirect: "/auth/google/ok",
  }),
  function (req, res) {
    res.redirect("/auth/google/ok");
  },
);

// =================

// =================

app.get("/auth/facebook/fail", isLoggedIn, (req, res) => {
  console.log(req.user.displayName);
  res.send("fail");
});
app.get("/auth/facebook/ok", isLoggedIn, (req, res) => {
  console.log(req.user.displayName);
  res.send("ok");
});

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/auth/facebook/fail" }),
  function (req, res) {
    res.redirect("/auth/facebook/ok");
  },
);

// =================

app.get("/auth/twitter/ok", isLoggedIn, (req, res) => {
  console.log(req.user.displayName);
  console.log();
  res.send("ok");
});

app.get("/auth/twitter/fail", (req, res) => {
  console.log("fail");
  res.send("fail");
});

app.get("/auth/twitter", passport.authenticate("twitter"));

app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: "/auth/twitter/fail",
    successRedirect: "/auth/twitter/ok",
  }),
  function (req, res) {
    res.redirect("/auth/twitter/ok");
  },
);

// =================

app.listen(5000, () => {
  console.log(`Example app listening on port 5000`);
});
