<template>
  <q-page class="flex q-pa-md">
    <q-card class="full-width">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <login-form @submit="login" />
        </q-tab-panel>
        <q-tab-panel name="register">
          <register-form @submit="register" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Auth',
  data() {
    return {
      tab: 'login',
    };
  },
  methods: {
    ...mapActions('chat', ['register', 'login']),
  },
  components: {
    LoginForm: () => import('components/LoginForm'),
    RegisterForm: () => import('components/RegisterForm'),
  },
};
</script>
