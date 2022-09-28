const { register } = require('identity-client');
const { generateUUID } = require('cryptography-utilities');

const { BAD_REQUEST } = require('../../errors');

module.exports = async ({ username }) => {
  const signup = await register({
    username,
    userData: {
      address: generateUUID()
    },
    appSlug: 'dereva'
  });

  if (!signup?.success) {
    return BAD_REQUEST;
  }

  return {
    success: true
  };
};
