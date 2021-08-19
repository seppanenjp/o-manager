import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { Runner } from "./runner";

@Entity({ name: "Result", schema: "o-manager" })
export class Result {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  runner: Runner;

  runnerId: string;
}
