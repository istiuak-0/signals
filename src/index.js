import { combine, obs } from './observable.js';

const btn = document.querySelector('#btn');

let count = obs(2);
const count2 = obs(4);

btn.textContent=count;


btn.addEventListener('click', () => {
  count.update(value => value * 2);
});

combine(count, count2).subscribe(() => {
  btn.textContent = count;

});
