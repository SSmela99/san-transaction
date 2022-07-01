import { Sequelize } from "sequelize";

export const db = new Sequelize("san", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
  port: 8000,
});
