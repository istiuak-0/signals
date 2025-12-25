export function obs(initial) {
  let value = initial;
  const subs = new Set();

  function notify(v) {
    subs.forEach(fn => fn(v));
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
      this.subscribe(v => {
        c.update(fn(v));
      });

      return c;
    },
    debug() {
      return value;
    },
  };
}


export function combine(...observables) {
  const getValues = () => observables.map(o => o.debug());
  
  const combined = obs(getValues());

  observables.forEach((observable, index) => {
    observable.subscribe(() => {
      combined.update(getValues());
    });
  });

  return {
    subscribe(fn) {
      return combined.subscribe(values => {
        fn(...values);
      });
    },
    computed(fn) {
      const c = obs(fn(...combined.debug()));
      
      combined.subscribe(values => {
        c.update(fn(...values));
      });
      
      return c;
    },
    debug() {
      return combined.debug();
    }
  };
}