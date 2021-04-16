<template>
  <q-page class="flex">
    <q-footer elevated>
      <q-toolbar>
        <q-input
          class="full-width"
          bg-color="white"
          rounded
          outlined
          v-model.trim="message"
          label="Message"
          dense
        >

          <template v-slot:append>
            <q-icon
              v-if="hasMessage"
              class="cursor-pointer"
              name="close"
              @click="clearMessage"
            />
          </template>

          <template v-slot:after>
            <q-btn
              round
              dense
              flat
              color="white"
              icon="send"
            />
          </template>
        </q-input>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
export default {
  name: 'Chat',
  data() {
    return {
      message: '',
    };
  },
  computed: {
    hasMessage() {
      return this.message !== '';
    },
  },
  methods: {
    clearMessage() {
      this.message = '';
    },
  },
};
</script>
