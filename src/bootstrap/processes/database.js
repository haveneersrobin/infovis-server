// @flow

/**
 * MONGODB BOOTSTRAP PROCESS
 * This process/task sets up a connection to the MongoDB database. We add callbacks to the events
 * for 'error' and 'connected' to stay informed about the connection status. When en error is
 * encountered, the promise will fail so the bootstrap process knows to shut down. Make sure the
 * `mongod` process is running and that you use a valid database (reset before going to production)
 * in order to precent issues.
 */
import chalk from 'chalk';
import winston from 'winston';
import Promise from 'bluebird';
import mongoose from 'mongoose';

require('dotenv').config();

/**
 * Sets up the connection to the MongoDB, specified in the dotenv MONGODB variable. Returns a
 * promise which resolves if the connection succeeds, fails otherwise.
 * @returns {Promise<>} A promise which notifies when the connection is extablished (or failed)
 */
module.exports = (): Promise<> =>
  new Promise((resolve, fail) => {
    mongoose.Promise = Promise;
    mongoose.connect(process.env.MONGODB);
    const db = process.env.MONGODB || 'undefined';
    mongoose.connection.on('connected', () => { winston.debug(`${chalk.green('✓')} MongoDB`); resolve(); });
    mongoose.connection.on('error', () => fail(`${chalk.red('✗')} Unable to connect to ${db}`));
  });
