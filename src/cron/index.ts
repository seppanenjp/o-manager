import * as cron from "node-cron";

const EVERY_5MIN = "*/5 * * * *";
const HOURLY = "0 * * * *";
const EVERY_NIGHT = "0 0 * * *";
const SUNDAY_NIGHT = "0 0 * * 0";
export const initScheduler = (): void => {
  run(EVERY_5MIN, () => {}, "Updating results");
};

const run = (
  interval: string,
  cronFunction: () => void,
  message?: string
): void => {
  cron.schedule(interval, () => {
    message && console.log(message, new Date());
    cronFunction();
  });
};
