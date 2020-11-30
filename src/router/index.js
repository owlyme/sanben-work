import Vue from "vue"
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  mode: 'hash',
  routes: [{
      path: "/",
      redirect: "/createMp"
    },
    {
      path: "/createMp",
      name: 'createMp',
      component: () =>
        import ("@/pages/createMp")
    },
    {
      path: "/error",
      name: 'error',
      component: () =>
        import ("@/pages/error")
    }
  ]
})

export default router