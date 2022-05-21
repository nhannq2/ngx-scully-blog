
import { LOGGLY_TOKEN } from '@configuration';
import { Environment } from '@models';

export const environment: Environment = {
  production: true,
  applicationName: 'Nhan Nguyen Da Coder',
  logging: {
    sendToConsole: false,
    logglyToken: LOGGLY_TOKEN
  }
};
