const { Router } = require("express");
const router = Router();
const { Cars } = require("../db/db");

router.get("/cars", async function (req, res) {
  try {
    const response = await Cars.find({});
    res.status(200).send({ cars: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

module.exports = router;
