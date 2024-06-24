// run this file only once in the beginning to initialize the db with some initial data
const mongoose = require("mongoose");

const Chat = require("./models/chat");

main()
  .then(() => {
    console.log("mongodb Connected Successfully");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/whatsapp-db");
}

let chats_data = [
  {
    from: "aakash",
    to: "bala",
    msg: "bsdk matladaniki em noppi",
    created_at: new Date(),
  },
  {
    from: "bharath",
    to: "aakash",
    msg: "rey mowa bathike unnava",
    created_at: new Date(),
  },
  {
    from: "aakash",
    to: "ashy",
    msg: "ante adhi raam ",
    created_at: new Date(),
  },
];

Chat.insertMany(chats_data)
  .then(() => {
    console.log("Inserted Successfully initial data");
  })

  .catch((err) => {
    console.log(err);
  });
