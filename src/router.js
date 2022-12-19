/*
 * @Author: cyy
 * @Date: 2022-12-19 14:39:06
 * @LastEditors: cyy
 * @LastEditTime: 2022-12-19 14:53:28
 * @Description: 
 */

import { createRouter, createWebHashHistory } from 'vue-router'
import Check from './components/check/Index.vue'

const routes = [
  { path: '/', name: 'Check', component: Check },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
