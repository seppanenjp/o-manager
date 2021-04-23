import * as express from "express";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as FacebookTokenStrategy from "passport-facebook-token";
import * as GoogleTokenStrategy from "passport-google-token";
import * as mongoose from "mongoose";

import { Express } from "express";
import { routes } from "./routes";
import { initScheduler } from "./cron";
import { config } from "dotenv";
import { Server } from "http";
import { initRunner } from "./models/runner";

config();

export const app: Express = express();

const port: string | number = process.env.PORT || 8000;
new Server(app).listen(port, () =>
  console.log(`Server running on port ${port}`)
);

initScheduler();

// Middleware
app.use(compression());
app.use(bodyParser.json({ limit: "50mb" }));

console.log(initRunner());

mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@o-manager-dev.iuuln.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => app.use("/api", routes))
  .catch(() => console.log("Unable to connect database"));

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
