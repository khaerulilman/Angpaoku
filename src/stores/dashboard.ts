// ============================================
// Angpaoku — Pinia Store (Dashboard + Global)
// ============================================

import { defineStore } from "pinia";
import { ref } from "vue";
import type { User, DashboardStats, ActivityItem, NavItem } from "@/types";

export const useDashboardStore = defineStore("dashboard", () => {
  // ---- User ----
  const user = ref<User>({
    id: "1",
    name: "Alex Rivera",
    username: "@alex_rivera",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASJjDVDvclzf50rtSn3aYGF3FcBTEdK-a-ouQ04KIph1NLRpFhMx-swBhB9NEA682hSH6q_zv5TisRtkDlpnv5kUoqwJZ-CloSVjwlQUMDHSr1xs7eVs_DLJ-Q_FyWxMXjNhGGh7c9ZLhNCSfWt9m3u_P8xsEdM9lPBg_zrKfbH0I9dwnblvgEUTDLRvq8Izr1Ky7qoC4vEqv5lOVUgE8GSo4bM2Gkil4PO7JhoRp_dUmVgcBpziBn6nc4XjrCVokEemtq8bhTHkg",
    role: "creator",
    plan: "pro",
  });

  // ---- Dashboard Stats ----
  const stats = ref<DashboardStats>({
    totalEarnings: 12450.0,
    pointsBalance: 84200,
    totalSales: 1892,
    activeViewers: 4312,
    earningsChangePercent: 12.4,
  });

  // ---- Recent Activity ----
  const recentActivity = ref<ActivityItem[]>([
    {
      id: "1",
      type: "donation",
      title: "Aria.X sent an Angpao",
      subtitle: '"Keep up the great work! ❤️"',
      amount: "+$25.00",
      amountType: "positive",
      timeAgo: "2m ago",
      icon: "favorite",
    },
    {
      id: "2",
      type: "sale",
      title: "Preset Pack v2 Sold",
      subtitle: "Buyer: @marco_studio",
      amount: "+$12.99",
      amountType: "neutral",
      timeAgo: "15m ago",
      icon: "shopping_bag",
    },
    {
      id: "3",
      type: "points_redemption",
      title: "Points Redeemed",
      subtitle: "Converted to account credit",
      amount: "-2,500",
      amountType: "negative",
      timeAgo: "1h ago",
      icon: "toll",
    },
    {
      id: "4",
      type: "donation",
      title: "Mystery User gifted",
      subtitle: "Anonymous donation",
      amount: "+$100.00",
      amountType: "positive",
      timeAgo: "3h ago",
      icon: "favorite",
    },
    {
      id: "5",
      type: "sale",
      title: "E-book: Stream Guide",
      subtitle: "Buyer: @lina_dev",
      amount: "+$8.00",
      amountType: "neutral",
      timeAgo: "5h ago",
      icon: "shopping_bag",
    },
  ]);

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
    {
      label: "OBS Settings",
      icon: "settings_input_component",
      route: "/dashboard/obs-settings",
    },
    { label: "Withdraw", icon: "payments", route: "/dashboard/withdraw" },
  ]);

  return {
    user,
    stats,
    recentActivity,
    navItems,
  };
});
