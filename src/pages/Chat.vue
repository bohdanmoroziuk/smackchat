<template>
  <q-page class="flex column" ref="page">
    <q-banner class="bg-grey-4 text-center fixed-top user-status">
      {{ otherUserDetails.name }} is {{ otherUserDetails.online | status }}.
    </q-banner>
    <div
      class="q-pa-sm column col justify-end"
      :class="{ invisible: !showMessages }"
    >
      <q-chat-message
        v-for="(message, id) of messages"
        :name="getName(message)"
        :key="id"
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
            ref="textField"
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
                @click="addMessage"
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
      showMessages: false,
    };
  },
  watch: {
    messages: {
      immediate: true,
      handler(messages) {
        if (Object.keys(messages).length) {
          this.scrollToBottom();

          setTimeout(() => {
            this.showMessages = true;
          }, 200);
        }
      },
    },
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
    ...mapActions('chat', ['getMessages', 'stopGettingMessages', 'sendMessage']),

    clearText() {
      this.text = '';
      this.$refs.textField.focus();
    },
    addMessage() {
      this.sendMessage({
        message: {
          text: this.text,
          from: 'me',
        },
        otherUserId: this.otherUserId,
      });

      this.clearText();
    },
    getName(message) {
      return message.from === 'me'
        ? this.userDetails.name
        : this.otherUserDetails.name;
    },
    scrollToBottom() {
      const page = this.$refs.page.$el;

      setTimeout(() => {
        window.scrollTo(0, page.scrollHeight);
      }, 100);
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

<style scoped>
.user-status {
  top: 50px;
  z-index: 2;
  opacity: 0.75;
}
</style>
