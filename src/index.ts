import * as express from "express";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as FacebookTokenStrategy from "passport-facebook-token";
import * as GoogleTokenStrategy from "passport-google-token";

import { Express } from "express";
import { routes } from "./routes";
import { initScheduler } from "./cron";
import { Server } from "http";
import { initRunner } from "./models/runner";

export const app: Express = express();

const port: string | number = process.env.PORT || 8000;
new Server(app).listen(port, () =>
  console.log(`Server running on port ${port}`)
);

initScheduler();

// Middleware
app.use(compression());
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/api", routes);

console.log(initRunner());

// setup passport for Facebook
/*passport.use(
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, callback) => {
      return callback(null, profile);
    }
  )
);*/

// setup passport for Google
/*passport.use(
  new GoogleTokenStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, callback) => {
      return callback(null, profile);
    }
  )
);*/
