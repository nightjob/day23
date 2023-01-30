import express from "express";
import type User from "./user";
import type Message from "./message";

const users: User[] = [];
const messages: Message[] = [];
const app = express();

let messageNumber: number = 0;

app.use(express.json());

// find user
app.get("/user/:name", function (req, res) {
  const user = users.find((u) => u.name === req.params.name);
  if (user) {
    res.send(user);
  } else {
    res.send({});
  }
});

// make user
app.post("/user", function (req, res) {
  let dateTime = new Date();
  console.log(dateTime);
  const user: User = {
    name: req.body.name,
    isAdmin: req.body.isAdmin,
    roles: req.body.roles,
    createdAt: dateTime,
  };

  users.push(user);

  res.send(user);
});

// make message
app.post("/message", function (req, res) {
  const message: Message = {
    message: req.body.message,
    user: req.body.user,
    keks: req.body.keks,
    edited: false,
    messageID: messageNumber,
  };
  messageNumber = messageNumber + 1;
  messages.push(message);
  res.send(message);
});

app.listen(3001);
