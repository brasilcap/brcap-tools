const retryPromise = require('../src/retryPromise');

const testDelay = 10;

describe('retryPromise', () => {
  it('runs the promise on success', async () => {
    const mockPromise = jest.fn().mockResolvedValue();
    await retryPromise(mockPromise, 100, testDelay);
    expect(mockPromise.mock.calls.length).toBe(1);
  });
  it('retries the limit on fail', () => {
    const numberOfCalls = 6;
    const mockPromise = jest.fn().mockRejectedValue();
    return retryPromise(mockPromise, numberOfCalls, testDelay)
      .then(() => expect(true).toBe(false)) // shouldn't go to success
      .catch(() => expect(mockPromise.mock.calls.length).toBe(numberOfCalls));
  });
  it('stops retrying when resolved after some fails', async () => {
    const numberOfCalls = 10;
    const mockPromise = jest.fn()
      .mockRejectedValueOnce()
      .mockRejectedValueOnce()
      .mockRejectedValueOnce()
      .mockResolvedValue();
    await retryPromise(mockPromise, numberOfCalls, testDelay);
    // 3 rejections and then a success = 4 calls
    expect(mockPromise.mock.calls.length).toBe(4);
  });
});
