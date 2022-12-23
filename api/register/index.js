/* eslint-disable no-magic-numbers */

const { generateUUID } = require('cryptography-utilities');

const { HOST } = require('../../constants');
const { sendEmail } = require('../../mailer');

module.exports = ({ addRegistrant }) => async ({ username }) => {
  const otp = generateUUID();
  const address = generateUUID();

  addRegistrant({
    otp,
    address,
    username
  });

  await sendEmail({
    to: username,
    subject: 'Confirm your registration on Dereva.',
    // eslint-disable-next-line max-len
    html: `Public address: <strong>${address}</strong><br /><a href="${HOST}/?register=${otp}" target="_blank">Authorize Registration</a><br />If you do not authorize this registration, <strong>do not</strong> click the link.`
  });

  return {
    success: true,
    message: 'Authorization sent (check your email).'
  };
};
