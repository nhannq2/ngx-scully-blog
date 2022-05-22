import { Injectable } from '@angular/core';
import { FACEBOOK_PIXEL_ID } from '@config';

@Injectable({
  providedIn: 'root',
})
export class FacebookService {
  constructor() {}

  load() {
    ((f: any, b: Document, e: string, v: string, n?: any, t?: any, s?: any) => {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js'
    );

    let waitForFbq = (callback: Function) => {
      if (typeof (window as any).fbq !== 'undefined') {
        callback();
      } else {
        setTimeout(function () {
          waitForFbq(callback);
        }, 500);
      }
    };
    waitForFbq(() => {
      (window as any).fbq('init', FACEBOOK_PIXEL_ID);
      (window as any).fbq('track', 'PageView');
    });
  }
}
