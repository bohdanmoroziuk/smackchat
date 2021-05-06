<template>
  <q-page class="flex column">
    <q-banner class="bg-grey-4 text-center">
      {{ otherUserDetails.name }} is {{ otherUserDetails.online | status }}.
    </q-banner>
    <div class="q-pa-sm column col justify-end">
      <q-chat-message
        v-for="message of messages"
        :name="getName(message)"
        :key="message.text"
        :text="[message.text]"
        :sent="message.from === 'me'"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form
          class="full-width"
        >
          <q-input
            bg-color="white"
            rounded
            outlined
            v-model.trim="text"
            label="Message"
            dense
          >

            <template v-slot:append>
              <q-icon
                v-if="hasText"
                class="cursor-pointer"
                name="close"
                @click="clearText"
              />
            </template>

            <template v-slot:after>
              <q-btn
                round
                dense
                flat
                color="white"
                icon="send"
                :disable="!hasText"
                @click="sendMessage"
              />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Chat',
  props: {
    otherUserId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      text: '',
    };
  },
  computed: {
    ...mapState('chat', ['messages', 'userDetails']),
    ...mapGetters('chat', ['getUserDetails']),

    hasText() {
      return this.text !== '';
    },
    otherUserDetails() {
      return this.getUserDetails(this.otherUserId);
    },
  },
  methods: {
    ...mapActions('chat', ['getMessages', 'stopGettingMessages']),

    clearText() {
      this.text = '';
    },
    sendMessage() {
      const message = {
        text: this.text,
        from: 'me',
      };

      this.messages.push(message);
    },
    getName(message) {
      return message.from === 'me'
        ? this.userDetails.name
        : this.otherUserDetails.name;
    },
  },
  filters: {
    status(online) {
      return online ? 'online' : 'offline';
    },
  },
  created() {
    this.getMessages(this.otherUserId);
  },
  destroyed() {
    this.stopGettingMessages();
  },
};
</script>
