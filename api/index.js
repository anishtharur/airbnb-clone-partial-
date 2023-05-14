require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express();
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const Place = require("./models/Place");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtTokenSecret = "qwertyuiop";
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cookieParser());
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
            res.cookie("token", token).status(200).json(userDoc);
          }
        );
      } else {
        res.status(422).json("not found");
      }
    } else {
      res.status(422).json("not found");
    }
  } catch (err) {
    res.status(422).json("not found");
  }
});

app.get("/profile", (req, res) => {
  //res.json(req.cookies);// we used cookie parser to get cookies
  try {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, jwtTokenSecret, {}, async (err, user) => {
        if (err) throw err;
        const { name, email, _id } = await User.findById(user.id);
        res.json({ name, email, _id });
      });
    } else {
      res.json(null);
    }
  } catch (err) {
    res.status(422).json("Not Processed");
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(__dirname + "/uploads/" + newName);
});

const photosMiddleware = multer({ dest: "uploads" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const ext = originalname.split(".")[originalname.split(".").length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

app.post("/places", async (req, res) => {
  try {
    console.log("Here");
    const { token } = req.cookies;
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      checkin,
      checkout,
      maxGuests,
      extraInfo,
    } = req.body;
    jwt.verify(token, jwtTokenSecret, {}, async (err, userData) => {
      if (err) throw err;
      const place = await Place.create({
        owner: userData.id,
        title: title,
        address: address,
        photos: addedPhotos,
        description: description,
        perks: perks,
        extraInfo: extraInfo,
        checkIn: checkin,
        checkOut: checkout,
        maxGuests: maxGuests,
      });
      res.json(place);
    });
  } catch (err) {}
});

app.listen(4000, () => {
  console.log("Listening to 4000");
});
