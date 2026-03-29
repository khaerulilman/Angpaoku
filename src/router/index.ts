// ============================================
// Angpaoku — Vue Router (Lazy-loaded)
// ============================================

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    // ---- Landing (Public) ----
    {
      path: '/',
      component: () => import('@/layouts/LandingLayout.vue'),
      children: [
        {
          path: '',
          name: 'landing',
          component: () => import('@/pages/LandingPage.vue'),
          meta: { title: 'Angpaoku | The Digital Concierge for Creators' },
        },
      ],
    },

    // ---- Dashboard (Creator Portal) ----
    {
      path: '/dashboard',
      component: () => import('@/layouts/DashboardLayout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/pages/dashboard/DashboardPage.vue'),
          meta: { title: 'Overview | Angpaoku Dashboard' },
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('@/pages/dashboard/ProductsPage.vue'),
          meta: { title: 'Products | Angpaoku Dashboard' },
        },
        {
          path: 'transactions',
          name: 'transactions',
          component: () => import('@/pages/dashboard/TransactionsPage.vue'),
          meta: { title: 'Transactions | Angpaoku Dashboard' },
        },
        {
          path: 'points',
          name: 'points',
          component: () => import('@/pages/dashboard/PointsPage.vue'),
          meta: { title: 'Points | Angpaoku Dashboard' },
        },
        {
          path: 'obs-settings',
          name: 'obs-settings',
          component: () => import('@/pages/dashboard/OBSSettingsPage.vue'),
          meta: { title: 'OBS Settings | Angpaoku Dashboard' },
        },
        {
          path: 'analytics',
          name: 'analytics',
          component: () => import('@/pages/dashboard/AnalyticsPage.vue'),
          meta: { title: 'Analytics | Angpaoku Dashboard' },
        },
        {
          path: 'withdraw',
          name: 'withdraw',
          component: () => import('@/pages/dashboard/WithdrawPage.vue'),
          meta: { title: 'Withdraw | Angpaoku Dashboard' },
        },
      ],
    },

    // ---- 404 ----
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFoundPage.vue'),
      meta: { title: '404 | Angpaoku' },
    },
  ],
})

// Dynamic page title
router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  if (title) document.title = title
})

export default router
