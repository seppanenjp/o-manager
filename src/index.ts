import * as express from "express";
import { Express } from "express";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import { routes } from "./routes";
import { initScheduler } from "./cron";
import { config } from "dotenv";
import { Server } from "http";
import { initRunner, Runner, totalSkill } from "./entity/runner";
import { createConnection } from "typeorm";
import { connectionOptions } from "./config/database";

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

let amount = 200;
const runners = [];
while (amount--) {
  runners.push(initRunner());
}

runners.map(console.log);

createConnection(connectionOptions)
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
