const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { Admin } = require("../db/db");
const adminMiddleware = require("../middlewares/admin");
const { Cars } = require("../db/db");

// signin route
router.post("/signin", async function (req, res) {
  const password = req.body.password;
  try {
    const response = await Admin.findOne({
      password: password,
    });
    if (!response) {
      return res.status(403).json({ msg: "Password is Wrong" });
    }
    const token = jwt.sign({ password: password }, JWT_SECRET);
    console.log(token);
    res.status(200).json({ msg: "Login Succesfully", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong" });
  }
});

router.post("/cars", adminMiddleware, async function (req, res) {
  try {
    const car_name = req.body.car_name;
    const car_model = req.body.car_model;
    const car_type = req.body.car_type;
    const car_price = req.body.car_price;
    const carsexits = await Cars.findOne({
      car_model: car_model,
      car_name: car_name,
      car_type: car_type,
    });
    if (carsexits) {
      return res.status(403).json({ msg: "Car already exits" });
    }
    const car = await Cars.create({
      car_name: car_name,
      car_model: car_model,
      car_type: car_type,
      car_price: car_price,
    });
    res.status(200).json({ msg: "Car saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
module.exports = router;
