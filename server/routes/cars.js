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

router.get("/cars/search", async function (req, res) {
  try {
    const { q } = req.query;
    const cars = await Cars.find({}); // Await the query to get the actual results
    const searchResults = cars.filter((car) =>
      car.car_name.toLowerCase().includes(q.toLowerCase())
    );
    res.json({ results: searchResults });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for cars" });
  }
});

module.exports = router;
