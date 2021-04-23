import { femaleName, maleName } from "../utils/name-generator";
import { randomNumber } from "../utils/random";

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
}

export interface Runner {
  firstName: string;
  lastName: string;
  gender: Gender;
  runningSpeed: number;
  orienteeringSkill: number;
  stressTolerance: number;
  age: number;
}

export const initRunner = (gender: Gender = Gender.MALE): Runner => {
  const age = randomNumber({ min: 18, max: 50 });
  return {
    gender,
    ...(gender === Gender.MALE ? maleName() : femaleName()),
    runningSpeed: randomNumber({ min: 50, max: 100 - Math.round(age / 3) }),
    orienteeringSkill: randomNumber({ max: 100 }),
    stressTolerance: randomNumber({ min: Math.round(age / 2), max: 100 }),
    age,
  };
};
