const { v4: uuidv4 } = require('uuid');

function createMessage({ senderId, recipientId, content }) {
  return {
    id: uuidv4(),
    senderId,
    recipientId,
    content,
    timestamp: new Date().toISOString()
  };
}

module.exports = createMessage;
