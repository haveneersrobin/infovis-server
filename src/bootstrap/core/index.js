// @flow

/**
 * BOOTSTRAP
 * This script should run when the application starts. All the important stuff to setup should be
 * written as different processes. This is where the database connection will be established,
 * the passport configuration will be set, the database might be seeded...
 * - All scripts called here should be located in the processes folder.
 * - Every process/task should be a function that returns a promise.
 * Make sure that the server task is always the last one, as it passes the server instance to the
 * resolve method of the bootsrtap promise (see PROCESSES below). Almost all code that should only
 * run once should be presented as a bootstrap process.
 */
import chalk from 'chalk';
import winston from 'winston';
import Promise from 'bluebird';
import bootstrapDotenv from '../processes/dotenv';
import bootstrapServer from '../processes/server';
import bootstrapDatabase from '../processes/database';

/**
 * A List with the order of which all processes should be executed. The boostrapServer should
 * ALWAYS be at the bottom as this should be executed at the end.
 * @var {Array<() => Promise<>>} PROCESSES The processes in the order of execution.
 */
const PROCESSES = [
  bootstrapDotenv,
  bootstrapDatabase,
  bootstrapServer,
];

/**
 * The default export of this file is the actual bootstrap process, which will run all the required
 * processes. It returns a promise to notify when all bootstrapping is finished. The parameter of
 * this promise will the instance of the express server. All the processes will be executed in the
 * same order as defined in the const PROCESSES above. If one of them fails, the process will exit.
 * @returns {Promise<any>} A promise with the express server instance, ready to use!
 */
module.exports = (): Promise<any> =>
  new Promise((resolve) => {
    Promise.reduce(PROCESSES, (acc, proc) => proc(), 0).then((app) => {
      winston.info(`${chalk.green('✓')} Bootstrapped`);
      resolve(app);
    }).catch((error) => {
      winston.error(error);
      process.exit();
    });
  });
