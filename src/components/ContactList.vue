<template>
  <q-list
    class="full-width"
    separator
  >
    <contact-item
      v-for="(contact, id) of contacts"
      :key="id"
      :contact="contact"
      :id="id"
    />
  </q-list>
</template>

<script>
export default {
  name: 'ContactList',
  props: {
    contacts: {
      type: Object,
      required: true,
    },
  },
  components: {
    ContactItem: () => import('components/ContactItem'),
  },
};
</script>
