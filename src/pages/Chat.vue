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
        <message-form @submit="addMessage" />
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

    otherUserDetails() {
      return this.getUserDetails(this.otherUserId);
    },
  },
  methods: {
    ...mapActions('chat', ['getMessages', 'stopGettingMessages', 'sendMessage']),

    addMessage(text) {
      this.sendMessage({
        message: {
          text,
          from: 'me',
        },
        otherUserId: this.otherUserId,
      });
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
  components: {
    MessageForm: () => import('components/MessageForm'),
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
