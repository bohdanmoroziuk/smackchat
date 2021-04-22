<template>
  <q-form
    @submit.prevent="submit"
  >
    <q-input
      class="q-mb-md"
      outlined
      v-model="name"
      label="Name"
    />
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
      label="Register"
    />
  </q-form>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    submit() {
      this.$emit('submit', {
        name: this.name,
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
