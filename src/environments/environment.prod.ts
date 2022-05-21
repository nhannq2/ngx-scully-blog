
import { LOGGLY_TOKEN } from '@configuration';
import { IEnvironment } from 'src/app/models';

export const environment: IEnvironment = {
  production: true,
  applicationName: 'Nhan Nguyen Da Coder',
  logging: {
    sendToConsole: false,
    logglyToken: LOGGLY_TOKEN
  }
};
