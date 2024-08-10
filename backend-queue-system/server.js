const express = require('express');
const db = require('./db');
const authRoutes = require('./routes/auth');
const queueRoutes = require('./routes/queue');
const QueueManager = require('./queueManager');
const startWorker = require('./worker');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/queue', queueRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Example: Start workers for existing users
  const users = [{ id: '1' }, { id: '2' }]; // Replace with user fetch from DB
  for (const user of users) {
    await QueueManager.createQueue(user.id);
    startWorker(user.id);
  }
});
