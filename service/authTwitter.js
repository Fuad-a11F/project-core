import passport from "passport";
import TwitterStrategy from "passport-twitter";

passport.use(
  new TwitterStrategy(
    {
      consumerKey: "OTGK5bWYUk2q7UJwT7VogBfGr",
      consumerSecret: "Etiik7fJRA5Pvn9CxfNZr4xCe8c9CQwPX6HOc1Gzdn5SgeLsex",
      callbackURL: "http://localhost:5000/auth/twitter/callback",
    },
    function (token, tokenSecret, profile, done) {
      done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
