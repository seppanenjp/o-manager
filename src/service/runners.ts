import { HttpErrorResponse, HttpResponse } from "../models/response";
import { Runner } from "../entity/runner";
import { randomBoolean } from "../utils/random";

export class RunnerService {
  /*  getRunner(
    runnerId: string
  ): Promise<HttpErrorResponse<Runner> | HttpErrorResponse> {}

  updateRunner(): void {}*/

  /* getRunners(): Promise<HttpResponse<Runner[]> | HttpErrorResponse> {}

  getClubRunners(): Promise<HttpErrorResponse<Runner[]> | HttpErrorResponse> {}

  getFreeRunners(): Promise<HttpErrorResponse<Runner[]> | HttpErrorResponse> {}*/

  inactivateRunner(): void {}
}
