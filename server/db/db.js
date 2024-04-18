const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://akshat:TajCWAizehm9aPw6@cluster0.1ckcsjg.mongodb.net/car_dealership_app"
);

const AdminSchema = new mongoose.Schema({
  password: String,
});

const UserSchema = new mongoose.Schema({
  email: String,
  username: String,
  location: String,
  password: String,
  userInfo: mongoose.Schema.Types.Mixed,
  Ownedvehicle: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Vehicle",
  },
});

const DelershipSchema = new mongoose.Schema({
  email: String,
  username: String,
  location: String,
  password: String,
  dealership_info: mongoose.Schema.Types.Mixed,
  cars: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "car",
  },
  deals: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "car",
  },
  sold_vehicle: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "sold_vehicle",
  },
});

const CarsSchema = new mongoose.Schema({
  car_name: String,
  car_model: String,
  car_type: String,
  car_price: Number,
  car_image: String,
  car_info: mongoose.Schema.Types.Mixed,
});

const SoldCarsSchema = new mongoose.Schema({
  soldcars: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "cars",
  },
});

const DealSchema = new mongoose.Schema({
  car_id: mongoose.Schema.Types.ObjectId,
  deal_info: mongoose.Schema.Types.Mixed,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Dealer = mongoose.model("Dealer", DelershipSchema);
const Cars = mongoose.model("Cars", CarsSchema);
const SoldCars = mongoose.model("SoldCars", SoldCarsSchema);
const Deal = mongoose.model("Deal", DealSchema);

module.exports = {
  Admin,
  User,
  Dealer,
  Cars,
  SoldCars,
  Deal,
};
