// @flow

/**
 * DOTENV BOOTSTRAP PROCESS
 * Checks if the environment file exists. This means it will check for an existing file on the
 * <PROJECT_ROOT>/.env path, but will not check if it has valid contents. The reason for this is
 * that they will be instanciated before the bootstrap starts (above the imports). This process
 * just makes sure that there was a file to start with.
 */
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import winston from 'winston';
import Promise from 'bluebird';

/**
 * Check if a dotenv file exists in the root of the project. If this is not the case, it should
 * fail. Returns a promise that resolves when the file is found (and fails if it isn't).
 * @returns {Promise<>} A promise that resolves if the dotenv file is found (and fails otherwise)
 */
module.exports = () =>
  new Promise((resolve, fail) => {
    const exists = fs.existsSync(path.resolve(__dirname, '../../../.env'));
    if (exists) { winston.debug(`${chalk.green('✓')} Dotenv`); resolve(); }
    fail(`${chalk.red('✗')} No dotenv`);
  });
