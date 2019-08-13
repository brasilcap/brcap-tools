// @ts-check
const retryPromise = (fn, retriesLeft = 5, delay = 1000) => new Promise(
  (resolve, reject) => fn().then(resolve)
    .catch(error => setTimeout(() => {
      if (retriesLeft === 1) {
        reject(error);
      } else {
        retryPromise(fn, retriesLeft - 1, delay).then(resolve, reject);
      }
    }, delay)),
);

module.exports = retryPromise;
