const express = require("express");
const url = require("../models/url");
const router = express();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const allurls = await url.find({
    createdBy: req.user._id,
  });
  return res.render("home", {
    urls: allurls,
  });
});

router.get("/signup", async (req, res) => {
  return res.render("signup");
});
router.get("/login", async (req, res) => {
  return res.render("login");
});
module.exports = router;
