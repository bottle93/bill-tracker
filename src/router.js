import Vue from 'vue';
import Router from 'vue-router';
import SummaryView from './views/SummaryView.vue';
import ChartsView from './views/ChartsView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  hash: false,
  routes: [
    {
      path: '/summary',
      component: SummaryView,
    },
    {
      path: '/charts',
      component: ChartsView,
    },
    { path: '*', redirect: '/summary' },
  ],
});
