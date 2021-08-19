import { Router } from "express";
import { RunnerService } from "../service/runners";

export const runnersRouter = Router();
const runnerService = new RunnerService();
