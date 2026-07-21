import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
  {
    name: 'index',
    path: '/',
    component: () => import('./views/IndexView.vue')
  },
  {
    name: 'chords',
    path: '/chords',
    component: () => import('./views/chords/ChordsView.vue')
  },
  {
    name: 'create',
    path: '/create',
    component: () => import('./views/CreateView.vue')
  },
  {
    name: 'settings',
    path: '/settings',
    component: () => import('./views/SettingsView.vue')
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
