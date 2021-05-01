import { auth, database } from 'boot/firebase';

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

export const logout = () => {
  auth.signOut();
};
