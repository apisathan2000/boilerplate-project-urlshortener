const dns = require("node:dns");
const { UrlModel } = require("../models/urlModel");

const urlShorterner = async function (req, res) {
  const { url: originalurl } = req.body;

  try {
    const parsedUrl = new URL(originalurl);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return res.json({ error: "invalid url" });
    }
  } catch (error) {
    return res.json({ error: "invalid url" });
  }

  const urlDocument = await UrlModel.create({ originalUrl: originalurl });

  return res.status(200).json({
    original_url: urlDocument.originalUrl,
    short_url: urlDocument.shortenedUrl,
  });
};

const urlRedirector = async function (req, res) {
  const { shortenedUrl } = req.params;

  try {
    const urlDoc = await UrlModel.findOne({ shortenedUrl });

    if (!urlDoc) {
      return res.status(404).json({ error: `No short Url found !` });
    }

    return res.redirect(urlDoc.originalUrl);
  } catch (error) {
    return res.status(500).json({ error: `Server Error` });
  }
};

module.exports = { urlShorterner, urlRedirector };
