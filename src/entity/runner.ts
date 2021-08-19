import { randomNumber } from "../utils/random";
import { femaleName, maleName } from "../utils/name-generator";

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export enum RunnerStatus {
  Active = "Active",
  Retired = "Retired",
  Injured = "Injured",
  Sick = "Sick",
}

export enum RunnerMood {
  Normal = "Normal",
  Motivated = "Motivated",
  Unmotivated = "Unmotivated",
}

export class Runner {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  skills: {
    runningSpeed: number;
    stressTolerance: number;
    dayOrienteering: number;
    nightOrienteering: number;
    endurance: number;
    compassUsage: number;
  };
  age: number;
  status: RunnerStatus;
  team?: string;
  mood: RunnerMood;
  rankingPoints: number;
}

export const initRunner = (
  options: { gender?: Gender; age?: number } = {
    gender: Gender.Male,
    age: randomNumber({ min: 18, max: 50 }),
  }
): Runner => ({
  id: "",
  gender: options.gender,
  ...(options.gender === Gender.Male ? maleName() : femaleName()),
  skills: {
    dayOrienteering: randomNumber({ min: 15, max: 100 }),
    nightOrienteering: randomNumber({ min: 15, max: 100 }),
    runningSpeed: randomNumber({
      min: 50,
      max: 100 - Math.round(options.age / 3),
    }),
    stressTolerance: randomNumber({
      min: Math.round(options.age / 2),
      max: 100,
    }),
    endurance: randomNumber({ min: 30, max: 100 }),
    compassUsage: randomNumber({ min: 10, max: 100 }),
  },
  age: options.age,
  status: RunnerStatus.Active,
  rankingPoints: 0,
  mood: RunnerMood.Normal, // TODO: Random
});

export const totalSkill = (runner: Runner): number =>
  Number(
    (
      Object.values(runner.skills).reduce((a, b) => a + b, 0) /
      Object.values(runner.skills).length
    ).toFixed(0)
  );
