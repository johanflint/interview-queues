/**
 * Processes notification jobs from the queue until it is empty.
 *
 * A job looks like: { id: string, recipient: string, message: string }
 */
export class NotificationWorker {
  /**
   * @param {object} deps
   * @param {import('./queue.js').InMemoryQueue} deps.queue
   * @param {import('./notificationSender.js').FakeNotificationSender} deps.sender
   */
  constructor({ queue, sender }) {
    this.queue = queue;
    this.sender = sender;
  }

  /** Processes jobs until the queue is empty. */
  async run() {
    throw new Error('Not implemented');
  }

  /** Jobs that could not be delivered. */
  get failedJobs() {
    throw new Error('Not implemented');
  }
}
