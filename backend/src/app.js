const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const Router = require("koa-router");

const passport = require("koa-passport");
const jwt = require("koa-jwt");

const database = require("./database");
const config = require("./config");

const auth = require("./controllers/auth");

const app = (module.exports = new Koa());
const router = new Router({ prefix: "/api" });
const privateRouter = new Router({ prefix: "/api" });

// Useful resource
// https://github.com/paigen11/mysql-registration-passport/tree/f29a95ea83014c4700d4fb93ab59b0b261e94148

// CORS
app.use(cors({ credentials: true }));
// app.use(async (ctx, next) => {
//     ctx.set("Access-Control-Allow-Origin", ctx.get("Origin") || "*");
//     ctx.set("Access-Control-Allow-Credentials", "true");
//     await next();
// });

app.use(bodyParser());

app.use(passport.initialize());

router.get("/", (ctx) => {
    ctx.body =
        "An example backend with koa, google authentication, postgres and jwt tokens.";
});

router.get(
    "/auth/google",
    passport.authenticate("google", { session: false, scope: ["profile"] })
);

router.get(
    "/auth/google/redirect",
    passport.authenticate("google", {
        session: false,
    }),
    auth.redirect
);

router.get("/auth/logout", auth.logout);

privateRouter.get("/secret", async (ctx) => {
    const user = await database.User.findOne({
        where: { googleId: ctx.state.user.user },
    });

    ctx.body = {
        data: user.admin ? "You're an admin." : "You're not an admin.",
    };
});

app.use(router.routes()).use(router.allowedMethods());

// Protect routes from now on
app.use(jwt({ secret: config.JWT_SECRET, debug: true, cookie: "token" }));

app.use(privateRouter.routes()).use(privateRouter.allowedMethods());
