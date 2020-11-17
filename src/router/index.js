/*
 * @Description: 
 * @Author: xuks
 * @Date: 2020-11-17 16:01:50
 * @LastEditTime: 2020-11-17 16:16:49
 */
import { createRouter, createWebHashHistory } from "vue-router";
import BaseLayout from '../components/BaseLayout.vue'
const routes = [
  {
    path: "/",
    name: "BaseLayout",
    redirect: '/Home',
    component: BaseLayout,
    children: [
      {
        path: 'Home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '@/components/Home'),
        meta: {
          title: '首页',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL || ''),
  routes,
});

export default router;