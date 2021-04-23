import { Router, Request, Response } from "express";
import { dispatch } from "../models/response";
import { UserService } from "../service/users";

const usersRouter = Router();
const userService = new UserService();

usersRouter.post("/login", async (request: Request, response: Response) =>
  // userService.login(request.body).then(dispatch(response))
);


usersRouter.post("/me", async (request: Request, response: Response) =>
    // userService.myDetails(request.body).then(dispatch(response))
);
