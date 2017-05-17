// @flow

import chalk from 'chalk';
import winston from 'winston';
import bootstrap from './bootstrap/core';
import router from './routers/Router';

require('dotenv').config();

bootstrap().then((app) => {
  app.use('/', router);
  winston.info(`${chalk.green('✓')} Routes mounted`);
  app.listen(process.env.PORT, () => {
    winston.info(`${chalk.green('✓')} Listens on port ${chalk.bold(process.env.PORT)}...`);
  });
});
