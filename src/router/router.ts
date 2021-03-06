import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { LAYOUT } from '/@/router/constant';
import Material from '../pages/Material/index.vue';
import Home from '/@/pages/Home/index.vue';


const basic = [
  {
    path: '/',
    component: LAYOUT,
    redirect: '/home',
    children: [
      { path: '/home', component: Home },
      { path: '/material', component: Material }
    ]
  },
]


export const router = createRouter({
  history: createWebHashHistory('/'),
  routes: basic,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })

})


export const setupRouter = (app: App<Element>) => {
  app.use(router)
}