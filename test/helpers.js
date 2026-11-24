import { InMemoryQueue } from '../src/queue.js';
import { FakeNotificationSender } from '../src/notificationSender.js';
import { NotificationWorker } from '../src/worker.js';

export const job = (id) => ({ id, recipient: `${id}@example.com`, message: `Hello from ${id}` });

export function setup({ jobs = [], ...senderOptions } = {}) {
  const queue = new InMemoryQueue();
  const sender = new FakeNotificationSender(senderOptions);
  const worker = new NotificationWorker({ queue, sender });
  jobs.forEach((j) => queue.enqueue(j));
  return { queue, sender, worker };
}

export const sentIds = (sender) => sender.sent.map(({ id }) => id);
export const failedIds = (worker) => worker.failedJobs.map(({ id }) => id);
