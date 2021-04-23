import { femaleName, maleName } from "../utils/name-generator";
import { randomNumber } from "../utils/random";

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export enum RunnerStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export interface Runner {
  firstName: string;
  lastName: string;
  gender: Gender;
  skills: {
    runningSpeed: number;
    stressTolerance: number;
    dayOrienteering: number;
    nightOrienteering: number;
    endurance: number;
  };
  age: number;
  status: RunnerStatus;
}

export const initRunner = (gender: Gender = Gender.Male): Runner => {
  const age = randomNumber({ min: 18, max: 50 });
  return {
    gender,
    ...(gender === Gender.Male ? maleName() : femaleName()),
    skills: {
      dayOrienteering: randomNumber({ min: 15, max: 100 }),
      nightOrienteering: randomNumber({ min: 15, max: 100 }),
      runningSpeed: randomNumber({ min: 50, max: 100 - Math.round(age / 3) }),
      stressTolerance: randomNumber({ min: Math.round(age / 2), max: 100 }),
      endurance: randomNumber({ min: 50, max: 100 }),
    },
    age,
    status: RunnerStatus.Active,
  };
};
