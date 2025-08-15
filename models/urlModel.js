const mongoose = require("mongoose");

const UrlSchema = mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
      unique: true,
    },

    shortenedUrl: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

UrlSchema.pre("save", function (next) {
  if (!this.shortenedUrl) {
    this.shortenedUrl = generateShortCode();
  }

  next();
});

function generateShortCode(length = 6) {
  return Math.random()
    .toString(36)
    .slice(2, 2 + length);
}

const UrlModel = mongoose.model("url", UrlSchema);

module.exports = { UrlModel };
