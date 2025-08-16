const express = require("express");

const urlRoutes = require("./routes/url");

const url = require("./models/url");

const { connectToMongoDB } = require("./connection");

const app = express();

const port = 8001;

app.use(express.json());
app.use("/url", urlRoutes);
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("Mongo db Connected.");
});

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
  res.redirect(entry.redirectURL);
});

app.listen(port, () => {
  console.log("Server started running in port:", port);
});
