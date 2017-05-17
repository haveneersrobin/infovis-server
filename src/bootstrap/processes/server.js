// @flow

/**
 * SERVER BOOTSTRAP PROCESS
 * This process will setup the server instance that will be used throughout the app (express). Only
 * bootstrapping will be done here, so middlewares will be set, but no routes etc! Once the app
 * instance is set up, it pass it to the resolve method of the process.
 */
import path from 'path';
import chalk from 'chalk';
import morgan from 'morgan';
import helmet from 'helmet';
import winston from 'winston';
import express from 'express';
import Promise from 'bluebird';
import passport from 'passport';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import monitor from 'express-status-monitor';

require('dotenv').config();

/**
 * Creates and configures the express instance that will be used to host the server. All middlewares
 * are setup here. A promise is returned which resolves when the setup is complete (and fails
 * otherwise). The express instance is then passed to the resolve method.
 * @returns {Promise<any>} A promise the resolves when setup is complete (fails otherwise)
 */
module.exports = () =>
 new Promise((resolve) => {
   const app = express();
   app.use(helmet());
   app.use(bodyParser.json());
   app.use(morgan(process.env.MORGAN_LEVEL));
   app.use(bodyParser.urlencoded({ extended: true }));
   app.set('views', path.join(__dirname, '..', '..', 'views'));
   app.set('view engine', 'hbs');
   app.use(monitor());
   app.use(validator());
   app.use(passport.initialize());
   winston.debug(`${chalk.green('✓')} Express`);
   resolve(app);
 });
