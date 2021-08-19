import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { Runner } from "../entity/runner";

export const connectionOptions: PostgresConnectionOptions = {
  type: "postgres",
  username: process.env.DB_USER,
  host:
    process.env.NODE_ENV === "production"
      ? `/cloudsql/${process.env.DB_HOST_PROD}`
      : process.env.DB_HOST_SYNC,
  database: process.env.DB_NAME,
  password:
    process.env.NODE_ENV === "production"
      ? process.env.DB_PASS_PROD
      : process.env.DB_PASS_PROD,
  port: Number(
    process.env.NODE_ENV === "production"
      ? process.env.DB_PORT_PROD
      : process.env.DB_PORT_PROD
  ),
  entities: [Runner],
  schema: "o-manager",
  migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
  cli: {
    migrationsDir: "src/migrations",
  },
  migrationsTableName: "Migrations",
  synchronize: false,
  migrationsRun: true,
  logging: false,
};
