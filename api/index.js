require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express();
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtTokenSecret = "qwertyuiop";
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.status(203).json("Okay");
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (err) {
    res.status(422).json(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk === true) {
        jwt.sign(
          {
            email: userDoc.email,
            id: userDoc._id,
          },
          jwtTokenSecret,
          {},
          (err, token) => {
            res.cookie("token", token).status(200).json("Pass Ok");
          }
        );
      } else {
        res.status(422).json("not found");
      }
    }
  } catch (err) {
    res.status(422).json("not found");
  }
});

app.listen(4000, () => {
  console.log("Listening to 4000");
});
