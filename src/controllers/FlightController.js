// @flow

import moment from 'moment';
import Flight from '../database/models/Flight';

require('dotenv').config();

exports.fetchFlights = (req: any, res: any) => {
  Flight.find({
    start: { $lte: req.end },
    end: { $gte: req.start },
  })
  .lean()
  .exec()
  .then((flights) => { res.json(flights.map(flight => flight._id)); })
  .catch(error => res.send(error));
};

exports.fetchFlight = (req: any, res: any) => {
  Flight.findById(req.params.id)
  .lean()
  .exec()
  .then((flight) => {
    res.json({
      id: flight._id,
      aircraft: flight.aircraft,
      tracks: flight.track.filter((track) => {
        const time = moment(track.timeStamp);
        return time >= req.start && time <= req.end;
      }),
    });
  })
  .catch(error => res.send(error));
};

exports.fetchMin = (req: any, res: any) => {
  Flight.findOne()
  .sort({ start: +1 })
  .then((flight) => {
    res.json({
      min_start: flight.start,
    });
  })
  .catch(error => res.send(error));
};


exports.fetchMax = (req: any, res: any) => {
  Flight.findOne()
  .sort({ end: -1 })
  .then((flight) => {
    res.json({
      max_end: flight.end,
    });
  })
  .catch(error => res.send(error));
};
