import { Column, Entity } from "typeorm";
import { User } from "./user";

@Entity({ name: "Club", schema: "o-manager" })
export class Club {
  @Column({ type: "string", unique: true })
  name: string;

  owner: User;

  ownerId: string;
}
