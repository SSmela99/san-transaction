import express from "express";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";

import { db } from "./config/database.js";
import { user, users, createUser, payment, login } from "./routes/users.js";

db.authenticate()
  .then(() => console.log("Połączono z bazą danych!"))
  .catch((err) => console.log(err));

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => res.send("API SAN"));
app.get("/users", users);
app.post("/users/create", createUser);
app.get(`/user/:id`, user);
app.put("/payment/", payment);
app.post("/login", login);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server działa na porcie ${PORT}`));
