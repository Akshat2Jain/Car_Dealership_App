const express = require("express");
const cors = require("cors");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const dealerRouter = require("./routes/dealer");
const carRouter = require("./routes/cars");
const app = express();
app.use(express.json());
app.use(cors());
const port = 8080;

// routes
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/dealer", dealerRouter);
app.use("/", carRouter);

app.listen(8080, () => {
  console.log(`Server is running on port number ${port}`);
});
