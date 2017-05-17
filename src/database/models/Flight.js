// @flow

import mongoose from 'mongoose';

const CoordinateSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  altitude: Number,
  speed: Number,
  timeStamp: Date,
});

const AirportSchema = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
});

const FlightSchema = new mongoose.Schema({
  identification: {
    id: String,
    number: String,
    callsign: String,
  },
  start: Date,
  end: Date,
  aircraft: String,
  airport: {
    origin: AirportSchema,
    destination: AirportSchema,
  },
  track: [CoordinateSchema],
});

module.exports = mongoose.model('Flight', FlightSchema);
