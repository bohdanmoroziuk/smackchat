<template>
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
          @click="submit"
        />
      </template>
    </q-input>
  </q-form>
</template>

<script>
export default {
  name: 'MessageForm',
  data() {
    return {
      text: '',
    };
  },
  computed: {
    hasText() {
      return this.text !== '';
    },
  },
  methods: {
    clearText() {
      this.text = '';
      this.$refs.textField.focus();
    },
    submit() {
      this.$emit('submit', this.text);
      this.clearText();
    },
  },
};
</script>
