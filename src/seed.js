import winston from 'winston';
import chalk from 'chalk';
import Promise from 'bluebird';
import moment from 'moment';

import Flight from './database/models/Flight';
import bootstrap from './bootstrap/core';


// Update all variables in .env die in bootstrap/scripts/database staan
// Kies bv een database naam en shizzle
require('dotenv').config();

// Import Data
const data = require('../data/routes.json');

winston.info(data.length);

const storeFlight = (flight, index) => {
  const newFlight = {};
  const base = flight.data.flight;

  const id = base.identification;
  newFlight.identification = {
    id: id.id,
    number: id.number.default,
    callsign: id.number.callsign,
  };

  newFlight.aircraft = base.aircraft.model.text;

  newFlight.airport = {};

  newFlight.airport.origin = {
    name: base.airport.origin.name,
    latitude: base.airport.origin.position.latitude,
    longitude: base.airport.origin.position.longitude,
  };

  newFlight.airport.destination = {
    name: base.airport.destination.name,
    latitude: base.airport.destination.position.latitude,
    longitude: base.airport.destination.position.longitude,
  };

  newFlight.track = base.track.map(track => ({
    latitude: track.latitude,
    longitude: track.longitude,
    altitude: track.altitude.meters,
    speed: track.speed.kmh,
    timeStamp: moment.unix(track.timestamp),
  }));

  newFlight.start = moment.unix(base.track[0].timestamp);
  newFlight.end = moment.unix(base.track[base.track.length - 1].timestamp);

  winston.info(`${index} started`);
  const instance = new Flight(newFlight);
  winston.info(`${index} instantiated`);
  return instance.save();
};

// go bino

bootstrap().then(() => {
  winston.info(chalk.green('Bootstrap finished.'));
  winston.info('Start seeding...');

  Promise.each(data, (f, i) => storeFlight(f, i)).then(() => winston.info('ready'));
});

// hello bino, do you see this?
