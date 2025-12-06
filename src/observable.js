export function obs(initial) {
  let value = initial;
  const subs = new Set();
  const computedSubs = new Map();

  function notify(v) {
    subs.forEach(fn => fn(v));
    computedSubs.forEach(cleanup => cleanup());
    computedSubs.clear();
  }

  return {
    [Symbol.toPrimitive](hint) {
      return value;
    },
    update(v) {
      value = typeof v === 'function' ? v(value) : v;
      notify(value);
    },
    subscribe(fn) {
      subs.add(fn);
      return () => subs.delete(fn);
    },

    computed(fn) {
      const c = obs(fn(value));
      const unsub = this.subscribe(v => {
        c.update(fn(v));
      });
      computedSubs.set(fn, unsub);

      return c;
    },
    debug() {
      return value;
    },
  };
}
