const nanoId = require("nano-id");

const url = require("../models/url");

async function handleCreateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json("url is required.");
  const shortId = nanoId(6);
  await url.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", {
    id: shortId,
  });
}

async function handleUrlAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await url.findOne({ shortId });
  res.json({
    totalClicks: result,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleCreateShortUrl,
  handleUrlAnalytics,
};
