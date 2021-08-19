import * as cron from "node-cron";

const EVERY_5MIN = "*/5 * * * *";
const HOURLY = "0 * * * *";
const EVERY_NIGHT = "0 0 * * *";
const SUNDAY_NIGHT = "0 0 * * SUN";

export const initScheduler = (): void => {
  run(EVERY_5MIN, () => {}, "Updating results");

  run(SUNDAY_NIGHT, () => {}, "Updating runner age");
  run(
    EVERY_NIGHT,
    () => {
      // Clean runners which have been in database too long
      // Create new runners so that database is "full"
    },
    "Updated runner database"
  );
};

// TODO: 30min = 1day so one year is about 7 days

/*
  - Every 14-15days: Update runner age +1 year
  - Every 5min: Update active event results (if all runners finished then complete event)
  - Every day update runner motivation and status (Sick, motivated, etc..)


 */

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
