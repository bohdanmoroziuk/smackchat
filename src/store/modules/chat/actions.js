import { auth, database } from 'boot/firebase';

let messagesRef = null;

export const register = (_, { name, email, password }) => {
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      const userId = auth.currentUser.uid;
      const userRef = `users/${userId}`;
      const userData = {
        name,
        email,
        online: true,
      };

      database.ref(userRef).set(userData);
    })
    .catch(console.error);
};

export const login = (_, { email, password }) => {
  auth.signInWithEmailAndPassword(email, password)
    .then(console.log)
    .catch(console.error);
};

export function handleAuthStateChange({ state, commit, dispatch }) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const userId = auth.currentUser.uid;
      const userRef = `users/${userId}`;

      database.ref(userRef).once('value', (snapshot) => {
        const { name, email } = snapshot.val();

        const userDetails = {
          id: userId,
          name,
          email,
        };

        commit('setUserDetails', userDetails);
      });

      dispatch('updateUser', {
        id: userId,
        updates: {
          online: true,
        },
      });

      dispatch('getUsers');

      this.$router.push({ name: 'users' }).catch(() => {});
    } else {
      dispatch('updateUser', {
        id: state.userDetails.id,
        updates: {
          online: false,
        },
      });

      commit('setUserDetails', {});

      this.$router.replace({ name: 'auth' }).catch(() => {});
    }
  });
}

export const updateUser = (_, { id, updates }) => {
  if (id) {
    const userRef = `users/${id}`;

    database.ref(userRef).update(updates);
  }
};

export const getUsers = ({ commit }) => {
  database.ref('users').on('child_added', (snapshot) => {
    const user = {
      id: snapshot.key,
      data: snapshot.val(),
    };

    commit('addUser', user);
  });

  database.ref('users').on('child_changed', (snapshot) => {
    const user = {
      id: snapshot.key,
      data: snapshot.val(),
    };

    commit('updateUser', user);
  });
};

export const getMessages = ({ commit, state }, otherUserId) => {
  const userId = state.userDetails.id;

  messagesRef = database.ref(`chats/${userId}/${otherUserId}`);

  messagesRef.on('child_added', (snapshot) => {
    const message = {
      id: snapshot.key,
      data: snapshot.val(),
    };

    commit('addMessage', message);
  });
};

export const stopGettingMessages = ({ commit }) => {
  if (messagesRef) {
    messagesRef.off('child_added');
    commit('clearMessages');
  }
};

export const sendMessage = ({ state }, payload) => {
  const userId = state.userDetails.id;
  const { otherUserId, message: userMessage } = payload;
  const otherUserMessage = { ...userMessage, from: 'them' };

  database.ref(`chats/${userId}/${otherUserId}`).push(userMessage);
  database.ref(`chats/${otherUserId}/${userId}`).push(otherUserMessage);
};

export const logout = () => {
  auth.signOut();
};
