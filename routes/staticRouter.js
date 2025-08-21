const express = require("express");
const url = require("../models/url");
const router = express();

router.get("/", async (req, res) => {
  const allurls = await url.find({});
  return res.render("home", {
    urls: allurls,
  });
});

module.exports = router;
