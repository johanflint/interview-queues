import { test } from 'node:test';
import assert from 'node:assert/strict';
import { job, setup, sentIds, failedIds } from './helpers.js';

test('sends every job in order', async () => {
  const { queue, sender, worker } = setup({ jobs: [job('a'), job('b'), job('c')] });

  await worker.run();

  assert.deepEqual(sender.sent, [job('a'), job('b'), job('c')]);
  assert.equal(queue.size, 0);
});

test('does nothing when the queue is empty', async () => {
  const { sender, worker } = setup();

  await worker.run();

  assert.deepEqual(sender.sent, []);
  assert.deepEqual(worker.failedJobs, []);
});

test('a failing job does not stop subsequent jobs', async () => {
  const { sender, worker } = setup({
    jobs: [job('a'), job('broken'), job('c')],
    alwaysFail: ['broken'],
  });

  await worker.run();

  assert.deepEqual(sentIds(sender), ['a', 'c']);
  assert.deepEqual(failedIds(worker), ['broken']);
});
