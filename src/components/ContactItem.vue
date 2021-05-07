<template>
  <q-item
    clickable
    v-ripple
    :to="chatPagePath"
  >
    <q-item-section avatar>
      <q-avatar color="primary" text-color="white">
        {{ letter }}
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ name }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-badge :color="statusColor">
        {{ statusText }}
      </q-badge>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'ContactItem',
  props: {
    id: {
      type: String,
      required: true,
    },
    contact: {
      type: Object,
      required: true,
    },
  },
  computed: {
    name() {
      return this.contact.name;
    },
    letter() {
      return this.name.charAt(0).toUpperCase();
    },
    isOnline() {
      return this.contact.online;
    },
    statusText() {
      return this.isOnline ? 'Online' : 'Offline';
    },
    statusColor() {
      return this.isOnline ? 'light-green-5' : 'grey-4';
    },
    chatPagePath() {
      return `/chat/${this.id}`;
    },
  },
};
</script>
