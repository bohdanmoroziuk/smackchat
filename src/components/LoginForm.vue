<template>
  <q-form
    @submit.prevent="submit"
  >
    <q-input
      class="q-mb-md"
      outlined
      type="email"
      v-model="email"
      label="Email"
    />
    <q-input
      class="q-mb-md"
      outlined
      type="password"
      v-model="password"
      label="Password"
    />
    <q-btn
      class="full-width"
      color="primary"
      type="submit"
      label="Login"
    />
  </q-form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    submit() {
      this.$emit('submit', {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
