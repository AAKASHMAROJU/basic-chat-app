// const mongoose = require("mongoose");
const mongoose = require("mongoose");

// const Chat = require("./models/chat");

main()
  .then(() => {
    console.log("mongodb Connected Successfully");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/whatsapp-db");
}

const chatSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    maxLength: 50,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
