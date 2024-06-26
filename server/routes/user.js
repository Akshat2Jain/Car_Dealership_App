const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config");
const { User, Cars, SoldCars } = require("../db/db");
const userMiddleware = require("../middlewares/user");

router.post("/signup", async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const loaction = req.body.location;
    const sanitizedEmail = email.trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const userexits = await User.findOne({ email: sanitizedEmail });
    if (userexits) {
      return res.status(200).json({ msg: "User already Created" });
    }
    const response = await User.create({
      email: sanitizedEmail,
      password: hashedPassword,
      location: loaction,
      username: username,
    });
    res.status(200).json({ msg: "User Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong/Incorrect input" });
  }
});

router.post("/signin", async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const sanitizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({
      email: sanitizedEmail,
    });

    if (!user) {
      return res.status(400).json({ msg: "User not found with this email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong Password" });
    }
    const token = jwt.sign({ email: sanitizedEmail }, JWT_SECRET);
    res.status(200).json({ msg: "Login Succesfully", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wront" });
  }
});

router.post("/getUser", userMiddleware, async function (req, res) {
  try {
    const email = req.body.email;
    const finduser = await User.findOne({
      email: email,
    });
    res.status(200).json({ user: finduser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wront" });
  }
});

router.post("/buyCar/:carId", userMiddleware, async function (req, res) {
  try {
    const carId = req.params.carId;
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decode = jwt.verify(jwtToken, JWT_SECRET);
    const user = await User.findOne({ email: decode.email });
    if (user.Ownedvehicle.includes(carId)) {
      return res
        .status(200)
        .json({ msg: "You have already purchased this car" });
    }
    const result = await User.updateOne(
      { _id: user._id },
      { $push: { Ownedvehicle: carId } }
    );
    console.log(result);
    res.status(200).json({ msg: "Vechile Purchased Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.get("/ownedVechile", userMiddleware, async function (req, res) {
  try {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decode = jwt.verify(jwtToken, JWT_SECRET);
    const user = await User.findOne({ email: decode.email });
    const OwnCars = await Cars.find({
      _id: {
        $in: user.Ownedvehicle,
      },
    });
    res.status(200).json({ OwnCars });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.post("/updateProfile", userMiddleware, async function (req, res) {
  try {
    const username = req.body.username;
    const location = req.body.location;
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decode = jwt.verify(jwtToken, JWT_SECRET);
    const user = await User.findOne({ email: decode.email });
    const updatedUser = await User.updateOne(
      { _id: user._id },
      {
        username: username,
        location: location,
      }
    );
    res.status(200).json({
      msg: "Profile Updated Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.post("/forgotPassword", async function (req, res) {
  try {
    const password = req.body.confirm;
    const email = req.body.email;
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(400).json({ msg: "User not found with this email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.updateOne(
      { _id: user._id },
      {
        password: hashedPassword,
      }
    );
    res.status(200).json({ msg: "Password Change Succesfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
