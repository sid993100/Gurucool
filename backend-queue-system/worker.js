const queueManager = require('./queueManager');

async function startWorker(userId) {
  await queueManager.processQueue(userId, (message) => {
    console.log(`User ${userId} - Processed message: ${message}`);
    // Perform task based on message
  });
}

module.exports = startWorker;
