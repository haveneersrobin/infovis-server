// / @flow

import moment from 'moment';
import express from 'express';
import FlightController from '../controllers/FlightController';

require('dotenv').config();

const router = express.Router();

const format = (req, res, next) => {
  req.start = moment(req.params.start, 'YYYY-MM-DD-hh:mm:ss');
  req.end = moment(req.params.end, 'YYYY-MM-DD-hh:mm:ss');
  next();
};

// PARAMS SHOULD BE YYYY-MM-DD-hh:mm:ss
router.get('/interval/:start/:end', format, FlightController.fetchFlights);
router.get('/details/:id/:start/:end', format, FlightController.fetchFlight);

module.exports = router;
