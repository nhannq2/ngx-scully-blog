
import { LOGGLY_TOKEN } from '@config';
import { Environment } from '@model';

export const environment: Environment = {
  production: true,
  applicationName: 'Nhan Nguyen Da Coder',
  logging: {
    sendToConsole: false,
    logglyToken: LOGGLY_TOKEN
  }
};
