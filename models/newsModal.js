const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
    },
    pic: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", newsSchema);
