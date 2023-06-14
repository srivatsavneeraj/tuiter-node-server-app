import express from 'express';
import cors from 'cors';
import HelloController from "./controllers/hello-controller.js";
import UserController from './users/users-controller.js';
import TuitsController from './controllers/tuit/tuits-controller.js';
import session from "express-session";
import AuthController from './users/auth-controller.js';

const app = express();
app.use(express.json());
app.use(
    cors({
      credentials: true,
      origin: "https://a5--genuine-fudge-ca1abe.netlify.app",
      methods: ["GET", "POST","PUT","DELETE"]
    })
   );
   app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Origin",
        "https://a5--genuine-fudge-ca1abe.netlify.app"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, POST, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      store: new session.MemoryStore(),
    })
  );
TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);
app.listen(process.env.PORT || 4000);