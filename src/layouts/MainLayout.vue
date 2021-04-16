<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="!isHomePage"
          v-go-back.single
          icon="arrow_back"
          label="Back"
          flat
          dense
        />

        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

        <q-btn
          class="q-ml-auto"
          icon="account_circle"
          label="Login"
          to="/login"
          flat
          dense
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      defaultTitle: 'SmackChat',
      homePagePath: '/',
    };
  },
  computed: {
    isHomePage() {
      return this.$route.path === this.homePagePath;
    },
    title() {
      return this.$route.meta?.title ?? this.defaultTitle;
    },
  },
};
</script>
