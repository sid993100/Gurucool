const connectQueue = require('./queue');

class QueueManager {
  constructor() {
    this.queues = {};
  }

  async createQueue(userId) {
    const channel = await connectQueue();
    const queue = `queue_${userId}`;
    await channel.assertQueue(queue);
    this.queues[userId] = channel;
    return queue;
  }

  async addToQueue(userId, message) {
    const queue = this.queues[userId];
    await queue.sendToQueue(`queue_${userId}`, Buffer.from(message));
  }

  async processQueue(userId, callback) {
    const queue = this.queues[userId];
    await queue.consume(`queue_${userId}`, (msg) => {
      callback(msg.content.toString());
      queue.ack(msg);
    });
  }
}

module.exports = new QueueManager();
