module.exports = {
  BAD_REQUEST: {
    error: {
      code: 400,
      message: 'Bad request.'
    }
  },
  UNAUTHORIZED: {
    error: {
      code: 401,
      message: 'Unauthorized.'
    }
  },
  INVALID_AUTH_ERROR: {
    error: {
      code: 401,
      message: 'Invalid auth credentials.'
    }
  },
  INVALID_TOKEN_ERROR: {
    error: {
      code: 401,
      message: 'Invalid token.'
    }
  },
  NOT_ALLOWED_ERROR: {
    error: {
      code: 403,
      message: 'Not allowed.'
    }
  },
  INSUFFICIENT_FUNDS: {
    error: {
      code: 403,
      message: 'Insufficient funds.'
    }
  },
  UNAVAILABLE_TOKEN: {
    error: {
      code: 403,
      message: 'Token is unavailable.'
    }
  },
  USER_NOT_FOUND_ERROR: {
    error: {
      code: 404,
      message: 'User not found.'
    }
  },
  UNPROCESSABLE_REQUEST: {
    error: {
      code: 422,
      message: 'Malformed userData or request payload.'
    }
  },
  SERVER_ERROR: {
    error: {
      code: 500,
      message: 'Server error.'
    }
  }
};
