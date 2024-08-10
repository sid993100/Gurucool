const Astrologer = require('./models/Astrologer');

async function allocateUserToAstrologer() {
  // Fetch astrologers and their flow values
  const astrologers = await Astrologer.find();
  const totalFlow = astrologers.reduce((acc, astrologer) => acc + astrologer.flow, 0);

  // Randomly select an astrologer based on flow distribution
  const random = Math.random() * totalFlow;
  let cumulativeFlow = 0;
  for (const astrologer of astrologers) {
    cumulativeFlow += astrologer.flow;
    if (random < cumulativeFlow) {
      return astrologer;
    }
  }
  return null; // Should not reach here
}

module.exports = { allocateUserToAstrologer };
