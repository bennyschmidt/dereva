const users = {};

const getUserByToken = token => (
  Object
    .values(users)
    .find(user => user.token === token)
);

module.exports = () => ({
  get users () {
    return users;
  },

  createUser: ({ token, id, username, userData }) => {
    const existingUser = Object
      .values(users)
      .find(user => user.username === username);

    if (existingUser) {
      delete users[existingUser.id];
    }

    users[id] = {
      id,
      username,
      userData,
      token,
      isOnline: !!token
    };

    return users[id];
  },

  getUser: ({ token }) => getUserByToken(token),

  updateUser: ({ token, userData }) => {
    const user = getUserByToken(token);

    if (!user?.id) {
      return false;
    }

    users[user.id] = {
      ...user,

      userData
    };

    return true;
  },

  removeUser: ({ token, id }) => {
    if (token) {
      const user = users[id];

      if (!user?.isOnline) {
        return false;
      }

      users[user.id] = {
        ...user,

        isOnline: false
      };

      return true;
    }
  }
});
