<template>
  <q-page class="flex q-pa-sm">
    <q-list
      class="full-width"
      separator
    >
      <q-item
        v-for="user of users"
        :key="user.id"
        clickable
        v-ripple
        to="/chat"
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.name | letter }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="user.online ? 'light-green-5' : 'grey-4'">
            {{ user.online | status }}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      users: [{
        id: 1,
        name: 'Ruddy',
        online: false,
      }, {
        id: 2,
        name: 'Mallorie',
        online: false,
      }, {
        id: 3,
        name: 'Elisabetta',
        online: true,
      }, {
        id: 4,
        name: 'Seka',
        online: false,
      }],
    };
  },
  filters: {
    letter(name) {
      return name.charAt(0);
    },
    status(online) {
      return online ? 'Online' : 'Offline';
    },
  },
};
</script>
