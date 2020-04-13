const passport = require("koa-passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const database = require("../database");

const config = require("../config");

passport.use(
    new GoogleStrategy(
        {
            // options for google strategy
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/redirect",
        },
        async (accessToken, refreshToken, profile, done) => {
            await database.User.findOrCreate({
                where: {
                    googleId: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                },
            }).then(() => {
                database.Post.create({
                    title: "Testpost",
                    content: "Test content",
                    userGoogleId: profile.id,
                });

                done(null, profile.id);
            });
        }
    )
);

exports.returnJWT = (user) => {
    return jwt.sign({ user }, config.JWT_SECRET, { expiresIn: "10 min" });
};

exports.logout = async (ctx) => {
    ctx.cookies.set("token", "");
    ctx.redirect(config.FRONTEND_ENDPOINT);
};

exports.redirect = async (ctx) => {
    ctx.cookies.set("token", this.returnJWT(ctx.state.user));
    ctx.set("Content-Type", "text/html");
    ctx.body = "<script>window.close()</script>";
};
