const { resetPassword } = require('identity-client');

const { BAD_REQUEST } = require('../../errors');

module.exports = async ({ username }) => {
  const reset = await resetPassword({
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
