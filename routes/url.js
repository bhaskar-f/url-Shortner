const express = require("express");
const router = express.Router();

const {
  handleCreateShortUrl,
  handleUrlAnalytics,
} = require("../controllers/url");

router.post("/", handleCreateShortUrl);

router.get("/analytics/:shortId", handleUrlAnalytics);

module.exports = router;
