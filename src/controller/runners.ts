import { Router, Request, Response } from "express";
import { RunnerService } from "../service/runners";
import { dispatch } from "../models/response";

export const runnersRouter = Router();
const runnerService = new RunnerService();

/*runnersRouter.get("/", async (request: Request, response: Response) =>
  runnerService.getRunners().then(dispatch(response))
);

runnersRouter.get("/free", async (request: Request, response: Response) =>
  runnerService.getFreeRunners().then(dispatch(response))
);

runnersRouter.get("/{runnerId}", async (request: Request, response: Response) =>
  runnerService.getRunner(request.params.runnerId).then(dispatch(response))
);*/
