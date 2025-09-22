const path = require("path");

if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
}
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


const MONGO_URL = process.env.ATLASDB_URL;
console.log(MONGO_URL); 

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "67af626f584f48079873dceb",
  }));
  await Listing.insertMany(initData.data).then((res) => {
    console.log(res);
  });
  console.log("data was initialized");
};

initDB();
