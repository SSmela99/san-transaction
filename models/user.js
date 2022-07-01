import Sequelize from "sequelize";
import { db } from "../config/database.js";

const User = db.define("user", {
  firstname: {
    type: Sequelize.STRING,
  },
  lastname: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  age: {
    type: Sequelize.INTEGER,
  },
  phone: {
    type: Sequelize.STRING,
  },
  money: {
    type: Sequelize.INTEGER,
  },
});

export default User;
