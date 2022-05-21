import { environment } from '@environments/environment';
import { FacebookService } from './facebook.service';

export function InitFacebookPixel(fbService: FacebookService) {
  console.info("InitFacebookPixel")

  
  return () => {
    if (environment.production) {
      fbService.load()
    }
  };
}