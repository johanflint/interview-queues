# Notification worker

Implement `NotificationWorker` in `src/worker.js`. It processes notification jobs
(`{ id, recipient, message }`) from a queue and sends them using a notification sender.

Provided:

- `src/queue.js` – in-memory queue. The same job may be delivered more than once.
- `src/notificationSender.js` – fake sender. `send()` may throw a `TemporaryFailure`.

## Requirements

1. Process every job in the queue. A job that fails must not stop subsequent jobs;
   expose undeliverable jobs through `failedJobs`.

Run the tests with `npm test` (Node 26+, no dependencies). Feel free to add your own tests.
