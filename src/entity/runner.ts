import { randomBoolean, randomNumber } from "../utils/random";
import { femaleName, maleName } from "../utils/name-generator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export enum RunnerStatus {
  Active = "Active",
  Retired = "Retired",
  Injured = "Injured",
}

export enum RunnerMood {
  Normal = "Normal",
  Motivated = "Motivated",
  Unmotivated = "Unmotivated",
}

export interface Skills {
  runningSpeed: number;
  stressTolerance: number;
  dayOrienteering: number;
  nightOrienteering: number;
  endurance: number;
  compassUsage: number;
}

@Entity({ name: "Runner", schema: "o-manager" })
export class Runner {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "string" })
  firstName: string;

  @Column({ type: "string" })
  lastName: string;

  @Column({
    type: "enum",
    enum: [Gender.Male, Gender.Female],
    default: Gender.Male,
  })
  gender: Gender;

  @Column({ type: "simple-json" })
  skills: Skills;

  @Column({ type: "number" })
  totalSkill: number;

  @Column({ type: "number" })
  age: number;

  @Column({
    type: "enum",
    enum: [RunnerStatus.Active, RunnerStatus.Injured, RunnerStatus.Retired],
    default: RunnerStatus.Active,
  })
  status: RunnerStatus;

  // TODO: Link team with relation
  @Column({ type: "string", nullable: true })
  teamId?: string;

  @Column({
    type: "enum",
    enum: [RunnerMood.Normal, RunnerMood.Motivated, RunnerMood.Unmotivated],
    default: RunnerMood.Motivated,
  })
  mood: RunnerMood;

  @Column({ type: "number", default: () => 0 })
  rankingPoints: number;
}

export const initRunner = (): Runner => {
  const age = randomNumber({ min: 18, max: 50 });
  const gender = randomBoolean(50) ? Gender.Male : Gender.Female;
  const mood = randomMood();
  const skills = {
    dayOrienteering: randomNumber({ min: 15, max: 100 }),
    nightOrienteering: randomNumber({ min: 15, max: 100 }),
    runningSpeed: randomNumber({
      min: 50,
      max: 100 - Math.round(age / 3),
    }),
    stressTolerance: randomNumber({
      min: Math.round(age / 2),
      max: 100,
    }),
    endurance: randomNumber({ min: 30, max: 100 }),
    compassUsage: randomNumber({ min: 10, max: 100 }),
  };
  return {
    id: "",
    gender,
    ...(gender === Gender.Male ? maleName() : femaleName()),
    skills,
    totalSkill: totalSkill(skills),
    age,
    status: randomStatus(mood === RunnerMood.Unmotivated ? 35 : 5),
    rankingPoints: 0,
    mood,
  };
};

export const updateRunner = (runner: Runner): Runner => {
  const skills = {
    ...runner.skills,
    runningSpeed: randomNumber({
      min: runner.skills.runningSpeed - (runner.age > 35 ? 10 : 3),
      max:
        runner.age > 35
          ? runner.skills.runningSpeed
          : runner.skills.runningSpeed + 3,
    }),
    stressTolerance: randomNumber({
      min: runner.skills.stressTolerance - 3,
      max: runner.skills.stressTolerance + 3,
    }),
  };

  const mood = randomMood();

  return {
    ...runner,
    age: runner.age++,
    skills,
    totalSkill: totalSkill(skills),
    mood,
    status: randomStatus(mood === RunnerMood.Unmotivated ? 35 : 5),
  };
};

export const totalSkill = (skills: Skills): number =>
  Number(
    (
      Object.values(skills).reduce((a, b) => a + b, 0) /
      Object.values(skills).length
    ).toFixed(0)
  );

export const randomStatus = (percentage: number): RunnerStatus => {
  return randomBoolean(percentage) ? RunnerStatus.Injured : RunnerStatus.Active;
};

export const randomMood = (): RunnerMood => {
  const value = randomNumber({ max: 100 });
  if (value >= 85) {
    return RunnerMood.Motivated;
  } else if (value >= 20) {
    return RunnerMood.Normal;
  } else {
    return RunnerMood.Unmotivated;
  }
};
