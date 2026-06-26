// ============================================
// Angpaoku — Pinia Store (Dashboard + Global)
// ============================================

import { defineStore } from "pinia";
import { ref } from "vue";
import type { NavItem } from "@/types";

export const useDashboardStore = defineStore("dashboard", () => {
  // ---- Sidebar Navigation ----
  const navItems = ref<NavItem[]>([
    { label: "Dashboard", icon: "dashboard", route: "/dashboard" },
    { label: "Products", icon: "shopping_bag", route: "/dashboard/products" },
    {
      label: "Transactions",
      icon: "receipt_long",
      route: "/dashboard/transactions",
    },
    { label: "Donations", icon: "toll", route: "/dashboard/donations" },
    { label: "Overlay", icon: "cast", route: "/dashboard/overlay" },
    { label: "Withdraw", icon: "payments", route: "/dashboard/withdraw" },
  ]);

  return {
    navItems,
  };
});
