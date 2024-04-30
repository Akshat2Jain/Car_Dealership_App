const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config");
const { Dealer, Cars, Deal, SoldCars } = require("../db/db");
const dealerMiddleware = require("../middlewares/dealer");

router.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const loaction = req.body.location;
  const sanitizedEmail = email.trim().toLowerCase();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const dealerexits = await Dealer.findOne({ email: sanitizedEmail });
    if (dealerexits) {
      return res.status(200).json({ msg: "Dealer already Created" });
    }
    await Dealer.create({
      email: sanitizedEmail,
      password: hashedPassword,
      location: loaction,
      username: username,
    });
    res.status(200).json({ msg: "Dealer Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong" });
  }
});

router.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const sanitizedEmail = email.trim().toLowerCase();
  try {
    const dealer = await Dealer.findOne({
      email: sanitizedEmail,
    });

    if (!dealer) {
      return res.status(403).json({ msg: "Dealer not found with this email" });
    }
    const isMatch = await bcrypt.compare(password, dealer.password);
    if (!isMatch) {
      return res.status(403).json({ msg: "Wrong Password" });
    }
    const token = jwt.sign({ email: sanitizedEmail }, JWT_SECRET);
    res.status(200).json({ msg: "Login Succesfully", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wront" });
  }
});

router.post("/postCars", dealerMiddleware, async function (req, res) {
  try {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decode = jwt.verify(jwtToken, JWT_SECRET);
    const dealer = await Dealer.findOne({
      email: decode.email,
    });
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
    await Dealer.updateOne(
      { _id: dealer._id },
      {
        $push: {
          cars: car._id,
        },
      }
    );
    res.status(200).json({ msg: "Car saved succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong" });
  }
});

router.get("/getcars/:dealerId", async function (req, res) {
  try {
    const dealerId = req.params.dealerId;
    const dealer = await Dealer.findOne({ _id: dealerId });
    const cars = await Cars.find({
      _id: {
        $in: dealer.cars,
      },
    });
    res.status(200).json({ cars: cars });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong" });
  }
});

router.post("/createdeal/:carid", dealerMiddleware, async function (req, res) {
  try {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decode = jwt.verify(jwtToken, JWT_SECRET);
    const dealer = await Dealer.findOne({
      email: decode.email,
    });
    const carId = req.params.carid;
    const deal_info = req.body.deal_info;
    const dealexits = await Deal.findOne({
      car_id: carId,
    });
    if (dealexits) {
      return res.status(403).json({ msg: "Deal Already exits on this car" });
    }
    const deal = await Deal.create({
      car_id: carId,
      deal_info: deal_info,
    });
    await Dealer.updateOne(
      { _id: dealer._id },
      {
        $push: {
          deals: deal._id,
        },
      }
    );
    res.status(200).json({ msg: "Deal Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong" });
  }
});

router.get("/getDeals/:dealerId", async function (req, res) {
  try {
    const dealerId = req.params.dealerId;
    const dealer = await Dealer.findOne({
      _id: dealerId,
    });
    res.status(200).json({ msg: "Deals Fetched Successfully", dealer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong" });
  }
});

router.get("/getAlldealers", async function (req, res) {
  try {
    const AllDealers = await Dealer.find({});
    res.status(200).json({ dealers: AllDealers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong" });
  }
});

router.post("/getperticulardealer", async function (req, res) {
  try {
    const _id = req.body._id;
    const dealer = await Dealer.findOne({
      _id: _id,
    });
    res.status(200).json({ dealer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong" });
  }
});

router.post("/getPerticularCar", async function (req, res) {
  try {
    // console.log(req.body.id);
    const carId = req.body.id;
    const responsecar = await Cars.findOne({
      _id: carId,
    });
    res.status(200).json({ responsecar });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong" });
  }
});

router.post("/getDeal", async function (req, res) {
  try {
    const deal = await Deal.findOne({
      _id: req.body.id,
    });
    res.status(200).json({ deal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong" });
  }
});

router.get("/getDealer", dealerMiddleware, async function (req, res) {
  try {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decode = jwt.verify(jwtToken, JWT_SECRET);
    const dealer = await Dealer.findOne({
      email: decode.email,
    });
    res.status(200).json({ msg: "Ok", dealer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong" });
  }
});
router.post("/updateProfile", dealerMiddleware, async function (req, res) {
  try {
    const username = req.body.username;
    const location = req.body.location;
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decode = jwt.verify(jwtToken, JWT_SECRET);
    const dealer = await Dealer.findOne({ email: decode.email });
    const updatedDealer = await Dealer.updateOne(
      { _id: dealer._id },
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
    const user = await Dealer.findOne({
      email: email,
    });

    if (!user) {
      return res.status(400).json({ msg: "User not found with this email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await Dealer.updateOne(
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
