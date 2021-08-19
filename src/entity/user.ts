import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "User", schema: "o-manager" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "string", unique: true })
  username: string;

  @Column({ type: "string", unique: true })
  email: string;

  @Column({ type: "string" })
  password: string;
}
