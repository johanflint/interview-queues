/**
 * Simple in-memory FIFO queue. Delivery is "at least once": the same job
 * may be enqueued more than once.
 */
export class InMemoryQueue {
  #jobs = [];

  enqueue(job) {
    this.#jobs.push(job);
  }

  /** Returns the next job, or undefined when the queue is empty. */
  dequeue() {
    return this.#jobs.shift();
  }

  get size() {
    return this.#jobs.length;
  }
}
