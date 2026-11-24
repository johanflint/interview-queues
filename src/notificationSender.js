export class TemporaryFailure extends Error {
  constructor(message) {
    super(message);
    this.name = 'TemporaryFailure';
  }
}

/**
 * Fake notification service with deterministic failures.
 *
 * @param {object} [options]
 * @param {Record<string, number>} [options.failTimes] job id -> number of times sending fails before succeeding
 * @param {string[]} [options.alwaysFail] job ids that never succeed
 */
export class FakeNotificationSender {
  #failTimes;
  #alwaysFail;

  /** Notifications that were successfully delivered, in order. */
  sent = [];

  /** Job id -> number of send attempts. */
  attempts = new Map();

  constructor({ failTimes = {}, alwaysFail = [] } = {}) {
    this.#failTimes = { ...failTimes };
    this.#alwaysFail = new Set(alwaysFail);
  }

  async send({ id, recipient, message }) {
    const attempt = (this.attempts.get(id) ?? 0) + 1;
    this.attempts.set(id, attempt);

    if (this.#alwaysFail.has(id) || attempt <= (this.#failTimes[id] ?? 0)) {
      throw new TemporaryFailure(`Failed to send ${id} (attempt ${attempt})`);
    }

    this.sent.push({ id, recipient, message });
  }
}
