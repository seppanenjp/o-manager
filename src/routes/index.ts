import { Router } from "express";
import { runnersRouter } from "../controller/runners";
import { usersRouter } from "../controller/users";

export const routes = Router();

routes.get("/", (request, response) => {
  response.send({
    info: "O-Manager API",
    documentation: "",
  });
});

routes.get("/runners", runnersRouter);
routes.get("/users", usersRouter);
