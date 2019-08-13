const retryPromise = (fn, retriesLeft = 5, delay = 1000) => new Promise(
  (resolve, reject) => fn().then(resolve)
    .catch(error => setTimeout(() => {
      if (retriesLeft === 1) {
        reject(error);
      }
      retryPromise(fn, retriesLeft - 1, delay).then(resolve, reject);
    }, delay)),
);

export default {
  retryPromise,
};
