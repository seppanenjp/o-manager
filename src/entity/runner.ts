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
  const age = runner.age + 1;
  const skills = {
    ...runner.skills,
    runningSpeed: randomNumber(
      updatedRunningSpeedLimits(age, runner.skills.runningSpeed)
    ),
    stressTolerance: randomNumber({
      min: runner.skills.stressTolerance - 3,
      max: runner.skills.stressTolerance + 3,
    }),
  };

  const mood = randomMood();

  return {
    ...runner,
    age,
    skills,
    mood,
    totalSkill: totalSkill(skills),
    status:
      runner.skills.runningSpeed < 20
        ? RunnerStatus.Retired
        : randomStatus(mood === RunnerMood.Unmotivated ? 35 : 5),
  };
};

export const updatedRunningSpeedLimits = (
  age: number,
  currentRunningSpeed: number
): { min: number; max: number } => {
  if (age >= 70) {
    return { max: currentRunningSpeed, min: currentRunningSpeed - 8 };
  }
  if (age >= 60) {
    return { max: currentRunningSpeed, min: currentRunningSpeed - 6 };
  }
  if (age >= 50) {
    return { max: currentRunningSpeed, min: currentRunningSpeed - 4 };
  }
  if (age >= 35) {
    return { max: currentRunningSpeed + 1, min: currentRunningSpeed - 2 };
  }
  return { max: currentRunningSpeed + 3, min: currentRunningSpeed - 1 };
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
