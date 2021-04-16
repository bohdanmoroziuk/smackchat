const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'users',
        component: () => import('pages/Index.vue'),
      },
      {
        path: 'chat',
        name: 'chat',
        meta: {
          title: 'Chat',
        },
        component: () => import('pages/Chat.vue'),
      },
      {
        path: 'auth',
        name: 'auth',
        meta: {
          title: 'Login',
        },
        component: () => import('pages/Auth.vue'),
      },
    ],
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
