import { obs, signal, effect, derived } from './observable.js';

const btn = document.querySelector('#btn');

// let { value, subscribe, update } = obs(0);

// const unsubscribe = subscribe(count => {
//   btn.innerText = count;
// });

// count.subscribe(count => {
//   console.log(count);
// });

let count = signal(0);

let double = derived(() => count.v * 2);

btn.addEventListener('click', () => {
  count.v++;
});

effect(() => {
  btn.innerText = double.v;
});

effect(() => {
  console.log(count.v);
});
