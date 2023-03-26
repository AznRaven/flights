const mongoose = require("mongoose");

//Schema lets you create blueprints for the structure?
const Schema = mongoose.Schema;

const destinationsSchema = new Schema({
  airport: {
    type: String,
    required: true,
    enum: ["AUS", "DAL", "LAX", "SAN", "SEA"],
  },
  arrival: { type: Date },
});

const Destinations = mongoose.model("Destinations", destinationsSchema);

const flightsSchema = new Schema(
  {
    airline: {
      type: String,
      required: true,
      enum: ["American", "Southwest", "United"],
    },
    flightNo: { type: Number, required: 10 <= 9999 },
    departs: {
      type: Date,
      default: () => new Date(+new Date() + 365 * 24 * 60 * 60 * 1000),
      required: true,
    },
    airport: {
      type: String,
      required: true,
      enum: ["AUS", "DAL", "LAX", "SAN", "SEA"],
    },
    destinations: [destinationsSchema],
  },
  { timestamps: true }
);

const Flights = mongoose.model("Flights", flightsSchema);

// exporting the Flights/Destinations model as a module
module.exports = { Flights, Destinations };
