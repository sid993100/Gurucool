const express = require('express');
const auth = require('../middleware/auth');
const queueManager = require('../queueManager');

const router = express.Router();

// Enqueue a request
router.post('/enqueue', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { message } = req.body;
    await queueManager.addToQueue(userId, message);
    res.send({ status: 'Message added to queue' });
  } catch (error) {
    res.status(500).send({ error: 'Error adding message to queue' });
  }
});

// Process queue
router.post('/process', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    queueManager.processQueue(userId, (message) => {
      console.log('Processing message:', message);
    });
    res.send({ status: 'Processing queue' });
  } catch (error) {
    res.status(500).send({ error: 'Error processing queue' });
  }
});

module.exports = router;
