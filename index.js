const express = require("express");
// const init = require("./init");
const app = express();
const path = require("path");
const port = 3000;
const Chat = require("./models/chat");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

main()
  .then(() => {
    console.log("mongodb Connected Successfully");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/whatsapp-db");
}
main();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(methodOverride("_method"));

// For parsing application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/chats", async (req, res) => {
  let data = await Chat.find();
  // console.log(data);
  res.render("index", { chats: data });
  // res.send("Working it is");
});

app.get("/chats/new", (req, res) => {
  res.render("createChat");
});

app.post("/chats", async (req, res) => {
  // console.log(req.body);
  const { from, to, msg, date } = req.body;
  // console.log(from + to + msg);
  const chat_data = { from: from, to: to, msg: msg, created_at: date };
  await Chat.insertMany([chat_data])
    .then(() => {
      res.redirect("/chats");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/chats/:id/edit", (req, res) => {
  // console.log(req.params);
  const { id } = req.params;
  Chat.findOne({ _id: id })
    .then((data) => {
      console.log("Hello");
      const { from, to, msg, created_at } = data;
      res.render("editForm", {
        from: from,
        to: to,
        msg: msg,
        created_at: created_at,
        id: id,
      });
    })
    .catch((err) => {
      res.send(err);
    });
  // res.send("Hello");
});

app.put("/chats", (req, res) => {
  console.log(req.body);
  const { id, msg } = req.body;
  Chat.updateOne({ _id: id }, { $set: { msg: msg } })
    .then((m) => console.log(m))
    .catch((err) => console.log(err));
  res.redirect("/chats");
});

app.delete("/:id/delete", (req, res) => {
  // console.log(req.params);
  const { id } = req.params;
  Chat.findByIdAndDelete({ _id: id })
    .then((r) => console.log(r))
    .catch((e) => console.log(e));
  res.redirect("/chats");
});

app.listen(port, () => {
  console.log("The Server is running successfully at port Number ", port);
});
