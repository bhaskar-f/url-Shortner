const nanoId = require("nano-id");

const url = require("../models/url");

async function handleCreateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json("url is required.");
  const shortId = nanoId(8);
  await url.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({
    id: shortId,
  });
}

async function handleUrlAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await url.findOne({ shortId });
  res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleCreateShortUrl,
  handleUrlAnalytics,
};
