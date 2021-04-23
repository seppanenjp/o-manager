import { Router } from "express";

export const routes = Router();

routes.get("/", (request, response) => {
  response.send({
    info: "O-Manager API",
    documentation: "",
  });
});
