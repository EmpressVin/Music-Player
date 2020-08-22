import Vue from 'vue';
import VueRouter from 'vue-router';
import Albums from '../views/Albums.vue';
import Album from '../views/Album.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Albums',
    component: Albums,
  },
  {
    path: '/album/:id',
    name: 'Album',
    component: Album,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
