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
  });
  res.send(`
    <h1>Short URL Generated!</h1>
    <p>Original: ${body.url}</p>
    <p>Short: <a href="/${shortId}" target="_blank">http://localhost:3000/${shortId}</a></p>
    <a href="/">Go Back</a>
  `);
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
