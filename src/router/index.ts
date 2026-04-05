// ============================================
// Angpaoku — Vue Router (Lazy-loaded)
// ============================================

import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0, behavior: "smooth" };
  },
  routes: [
    // ---- Landing (Public) ----
    {
      path: "/",
      component: () => import("@/layouts/LandingLayout.vue"),
      children: [
        {
          path: "",
          name: "landing",
          component: () => import("@/pages/LandingPage.vue"),
          meta: { title: "Angpaoku | The Digital Concierge for Creators" },
        },
      ],
    },

    // ---- Store Preview (Public) ----
    {
      path: "/store-preview",
      name: "store-preview",
      component: () => import("@/pages/StorePreviewPage.vue"),
      meta: { title: "Store Preview | Angpaoku" },
    },

    // ---- Dashboard (Creator Portal) ----
    {
      path: "/dashboard",
      component: () => import("@/layouts/DashboardLayout.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "dashboard",
          component: () => import("@/pages/dashboard/DashboardPage.vue"),
          meta: { title: "Overview | Angpaoku Dashboard" },
        },
        {
          path: "products",
          name: "products",
          component: () => import("@/pages/dashboard/ProductsPage.vue"),
          meta: { title: "Products | Angpaoku Dashboard" },
        },
        {
          path: "add-product",
          name: "add-product",
          component: () => import("@/pages/dashboard/AddNewProductPage.vue"),
          meta: { title: "Add New Product | Angpaoku Dashboard" },
        },
        {
          path: "transactions",
          name: "transactions",
          component: () => import("@/pages/dashboard/TransactionsPage.vue"),
          meta: { title: "Transactions | Angpaoku Dashboard" },
        },
        {
          path: "donations",
          name: "donations",
          component: () => import("@/pages/dashboard/DonationsPage.vue"),
          meta: { title: "donations | Angpaoku Dashboard" },
        },
        {
          path: "obs-settings",
          name: "obs-settings",
          component: () => import("@/pages/dashboard/OBSSettingsPage.vue"),
          meta: { title: "OBS Settings | Angpaoku Dashboard" },
        },
        {
          path: "analytics",
          name: "analytics",
          component: () => import("@/pages/dashboard/AnalyticsPage.vue"),
          meta: { title: "Analytics | Angpaoku Dashboard" },
        },
        {
          path: "withdraw",
          name: "withdraw",
          component: () => import("@/pages/dashboard/WithdrawPage.vue"),
          meta: { title: "Withdraw | Angpaoku Dashboard" },
        },
        {
          path: "profile",
          name: "profile",
          component: () => import("@/pages/dashboard/ProfilePage.vue"),
          meta: { title: "Profile | Angpaoku Dashboard" },
        },
      ],
    },

    // ---- Auth (Public) ----
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/LoginPage.vue"),
      meta: { title: "Login | Angpaoku", guestOnly: true },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/pages/RegisterPage.vue"),
      meta: { title: "Register | Angpaoku", guestOnly: true },
    },

    // ---- 404 ----
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/pages/NotFoundPage.vue"),
      meta: { title: "404 | Angpaoku" },
    },
  ],
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();

  if (!authStore.isInitialized) {
    await authStore.bootstrap();
  }

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const guestOnly = to.matched.some((record) => record.meta.guestOnly);

  if (requiresAuth && !authStore.isAuthenticated) {
    return { name: "login", query: { redirect: to.fullPath } };
  }

  if (guestOnly && authStore.isAuthenticated) {
    return { name: "dashboard" };
  }

  return true;
});

// Dynamic page title
router.afterEach((to) => {
  const title = to.meta.title as string | undefined;
  if (title) document.title = title;
});

export default router;
