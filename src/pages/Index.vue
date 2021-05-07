<template>
  <q-page class="flex q-pa-sm">
    <contact-list :contacts="contacts" />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Index',
  computed: {
    ...mapGetters('chat', ['contacts']),
  },
  components: {
    ContactList: () => import('components/ContactList'),
  },
};
</script>
