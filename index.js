const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const port = 3000;
const Chat = require("./models/chat");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

main()
  .then(() => {
    console.log("mongodb Connected Successfully");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/whatsapp-db");
}

let chat1 = new Chat({
  from: "Aakash",
  to: "Bharath",
  msg: "Hello Mowa Namaste",
  created_at: new Date(),
});

chat1.save().then((res) => console.log(res));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log("The Server is running successfully at port Number ", port);
});
