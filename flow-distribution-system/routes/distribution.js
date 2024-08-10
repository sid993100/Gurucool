const express = require('express');
const { allocateUserToAstrologer } = require('../flowAlgorithm');
const User = require('../models/User');
const router = express.Router();

// Route to assign a user to an astrologer
router.post('/assign', async (req, res) => {
  try {
    const { userId } = req.body;

    // Fetch the user to be assigned
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Allocate user to an astrologer
    const astrologer = await allocateUserToAstrologer();
    if (!astrologer) {
      return res.status(500).send({ error: 'No astrologer available' });
    }

    res.send({ user, astrologer });
  } catch (error) {
    res.status(500).send({ error: 'Error assigning user to astrologer' });
  }
});

module.exports = router;
