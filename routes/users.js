import express from "express";
import { db } from "../config/database.js";
import User from "../models/user.js";
const router = express.Router();

export const users = (req, res) =>
  User.findAll()
    .then((users) => {
      console.log(users);
      res.send(users);
    })
    .catch((err) => console.log(err));

export const user = (req, res) => {
  const { params } = req;
  const { id } = params;
  User.findByPk(id)
    .then((user) => res.send(user))
    .catch((err) => console.log(err));
};

export const payment = async (req, res) => {
  const t = await db.transaction();

  t.afterCommit(() => {
    console.log("Transakcja przeszła pomyślnie");
  });

  const { body } = req;
  const { from, to, amount } = body;

  try {
    const sender = await User.findByPk(from, { transaction: t });
    const recipient = await User.findByPk(to, { transaction: t });

    await sender.update({ money: sender.money - amount }, { transaction: t });
    await recipient.update({ money: recipient.money + a }, { transaction: t });

    res.send({ success: true });
    await t.commit();
  } catch (error) {
    console.log(error);
    await t.rollback();
    res.send({ success: false });
  }
};

export const createUser = async (req, res) => {
  const { body } = req;
  const { firstname, lastname, phone, age, email } = body;

  User.create({
    firstname: firstname,
    lastname: lastname,
    age: age,
    phone: phone,
    email: email,
    money: 10000,
  })
    .then((user) => console.log(user))
    .catch((err) => console.log(err));

  res.sendStatus(200);
};

export const login = async (req, res) => {
  const { body } = req;
  const { email } = body;

  await User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        res.send({ ...user.dataValues, success: true });
      } else {
        res.send({ success: false });
      }
    })
    .catch((err) => console.log(err));
};

export default router;
