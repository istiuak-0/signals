import { obs } from './observable.js';

const btn = document.querySelector('#btn');
const count = obs(2);

const double = count.computed(v => v * 2);

double.subscribe(() => {
  console.log(double.debug());
});

btn.addEventListener('click', () => {
  count.update(value => value * 2);
  console.log(count.debug());
});
