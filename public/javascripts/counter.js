import { CountUp } from './counterup.min.js';

window.onload = function() {
     if(!document.querySelector('#counter-user') || !document.querySelector('#counter-guild')) return

          const easingFn = function (t, b, c, d) {
          const ts = (t /= d) * t;
          const tc = ts * t;
          return b + c * (tc + -3 * ts + 3 * t);
     }
     const options = {
          duration: 3,
          easingFn,
     };
     new CountUp('counter-recovered', document.querySelector('#counter-recovered').innerText,options).start();
     new CountUp('counter-deaths', document.querySelector('#counter-deaths').innerText,options).start();

}
