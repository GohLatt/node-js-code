const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tour must have a name"],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "Tour must have a duration"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "Tour must have a price"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
