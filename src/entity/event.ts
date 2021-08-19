import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Event", schema: "o-manager" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "string" })
  name: string;

  @Column({ type: "date" })
  begin: string;

  organiser: User;

  organiserId: string;
}
