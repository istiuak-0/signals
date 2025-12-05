export function obs(value) {
  const subscribers = new Set();

  return {
    value,
    subscribe(fn) {
      subscribers.add(fn);
      return () => subscribers.delete(fn);
    },
    update(v) {
      subscribers.forEach(fn => fn(v));
    },
  };
}

let subscriber = null;

export function signal(value) {
  const subscriptions = new Set();

  return {
    get v() {
      if (subscriber) {
        subscriptions.add(subscriber);
      }
      return value;
    },

    set v(updateValue) {
      value = updateValue;

      subscriptions.forEach(fn => fn());
    },
  };
}

export function effect(fn) {
  subscriber = fn;
  fn();
  subscriber = null;
}

export function derived(fn) {
  const derived = signal();
  effect(() => {
    derived.v = fn();
  });
  return derived;
}
