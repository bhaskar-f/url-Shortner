const express = require("express");

const path = require("path");

const urlRoutes = require("./routes/url");

const userRoute = require("./routes/user");

const staticRoute = require("./routes/staticRouter");

const url = require("./models/url");

const { connectToMongoDB } = require("./connection");

const cookieParser = require("cookie-parser");

const { restrictUserIfNotLoggedIn, checkAuth } = require("./middleware/auth");

const app = express();

const port = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("Mongo db Connected.");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictUserIfNotLoggedIn, urlRoutes);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await url.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry) {
    return res.status(404).send("Short URL not found");
  }
  res.redirect(entry.redirectURL);
});

app.listen(port, () => {
  console.log("Server started running in port:", port);
});
