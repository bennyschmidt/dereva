const identity = require('identity-client');

const { BAD_REQUEST } = require('../../errors');

module.exports = async ({ username }) => {
  const reset = await identity.resetPassword({
    username,
    appSlug: 'dereva'
  });

  if (!reset?.success) {
    return BAD_REQUEST;
  }

  return {
    success: true
  };
};
