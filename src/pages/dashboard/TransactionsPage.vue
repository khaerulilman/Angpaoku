<template>
  <div>
    <DashboardNavbar
      page-title="Transactions"
      search-placeholder="Search by product, customer..."
    />

    <div class="pt-4 px-10 pb-20 mx-auto">
      <!-- Header -->
      <div class="space-y-1 mb-6">
        <h2 class="text-4xl font-extrabold tracking-tight text-on-surface">
          Transaction Activity
        </h2>
        <p class="text-on-surface-variant max-w-md">
          Track your digital product sales and customer interactions in
          real-time.
        </p>
      </div>

      <!-- Filter Bar -->
      <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <button
            class="bg-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 text-on-surface-variant hover:bg-slate-50 transition-colors shadow-sm"
          >
            <span class="material-symbols-outlined text-sm">filter_list</span
            >Filters
          </button>
          <button
            class="bg-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 text-on-surface-variant hover:bg-slate-50 transition-colors shadow-sm"
          >
            <span class="material-symbols-outlined text-sm">calendar_today</span
            >Last 30 Days
          </button>
        </div>
        <button
          class="text-sm font-semibold text-primary flex items-center gap-2 hover:bg-primary-fixed rounded-lg px-4 py-2 transition-colors"
        >
          <span class="material-symbols-outlined text-sm">download</span>Export
          CSV
        </button>
      </div>

      <!-- Summary Cards -->
      <div class="transactions-summary-grid grid grid-cols-1 gap-4 md:grid-cols-2 mt-6">
        <AppCard class="p-6 h-full" shadow="angpao">
          <p
            class="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-1"
          >
            Total Revenue
          </p>
          <h3 class="text-2xl font-bold text-primary">Rp 42.850.000</h3>
          <div
            class="mt-2 flex items-center gap-1 text-emerald-600 text-xs font-medium"
          >
            <span class="material-symbols-outlined text-xs">trending_up</span>
            <span>+12.5% this month</span>
          </div>
        </AppCard>
        <AppCard class="p-6 h-full" shadow="angpao">
          <p
            class="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-1"
          >
            Product Sales
          </p>
          <h3 class="text-2xl font-bold text-on-surface">1,284</h3>
          <p class="text-xs text-on-surface-variant mt-2 font-medium">
            Lifetime units sold
          </p>
        </AppCard>
      </div>

      <!-- Transaction Table -->
      <AppCard shadow="angpao" class="overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-surface-container-low/50">
                <th
                  class="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest"
                >
                  Customer
                </th>
                <th
                  class="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest"
                >
                  Product Purchased
                </th>
                <th
                  class="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest"
                >
                  Date &amp; Time
                </th>
                <th
                  class="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-right"
                >
                  Amount
                </th>
                <th
                  class="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-center"
                >
                  Status
                </th>
                <th
                  class="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-right"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr
                v-for="tx in transactions"
                :key="tx.id"
                class="group hover:bg-surface-container-low transition-colors duration-200"
              >
                <td class="px-6 py-5">
                  <div class="flex items-center gap-3">
                    <AppAvatar
                      :src="tx.customer.avatar"
                      :name="tx.customer.name"
                      :initials="tx.customer.initials"
                      :grayscale="true"
                    />
                    <div>
                      <p class="text-sm font-bold text-on-surface">
                        {{ tx.customer.name }}
                      </p>
                      <p class="text-[11px] text-on-surface-variant">
                        {{ tx.customer.username }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-5">
                  <p class="text-sm font-medium text-on-surface">
                    {{ tx.product }}
                  </p>
                  <span
                    :class="[
                      'text-[10px] px-2 py-0.5 rounded-md font-semibold',
                      productBadgeClass(tx.productType),
                    ]"
                  >
                    {{ tx.productType }}
                  </span>
                </td>
                <td class="px-6 py-5">
                  <p class="text-sm text-on-surface font-medium">
                    {{ tx.date }}
                  </p>
                  <p class="text-[11px] text-on-surface-variant">
                    {{ tx.time }}
                  </p>
                </td>
                <td class="px-6 py-5 text-right font-bold text-on-surface">
                  {{ tx.amount }}
                </td>
                <td class="px-6 py-5 text-center">
                  <AppBadge :variant="statusVariant(tx.status)" :dot="true">{{
                    tx.status
                  }}</AppBadge>
                </td>
                <td class="px-6 py-5 text-right">
                  <button
                    class="p-2 hover:bg-white rounded-lg transition-colors text-on-surface-variant"
                  >
                    <span class="material-symbols-outlined">visibility</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          class="px-6 py-6 border-t border-slate-50 flex items-center justify-between"
        >
          <p class="text-xs text-on-surface-variant font-medium">
            Showing 1 to 5 of 1,284 transactions
          </p>
          <div class="flex gap-1">
            <button
              class="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-on-surface-variant"
            >
              <span class="material-symbols-outlined text-sm"
                >chevron_left</span
              >
            </button>
            <button
              class="w-8 h-8 flex items-center justify-center rounded bg-primary text-white text-xs font-bold shadow-sm"
            >
              1
            </button>
            <button
              class="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-on-surface text-xs font-semibold"
            >
              2
            </button>
            <button
              class="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-on-surface text-xs font-semibold"
            >
              3
            </button>
            <span class="px-2 self-center text-xs text-on-surface-variant"
              >...</span
            >
            <button
              class="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-on-surface text-xs font-semibold"
            >
              256
            </button>
            <button
              class="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-on-surface-variant"
            >
              <span class="material-symbols-outlined text-sm"
                >chevron_right</span
              >
            </button>
          </div>
        </div>
      </AppCard>

      <!-- Bottom Bento -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          class="md:col-span-2 bg-gradient-to-br from-primary to-primary-container p-8 rounded-xl text-white relative overflow-hidden group"
        >
          <div class="relative z-10">
            <h4 class="text-xl font-bold mb-2">
              Grow your digital sales faster
            </h4>
            <p class="text-white/80 text-sm max-w-sm mb-6">
              Learn how to optimize your checkout flow and increase average
              order value with our latest Creator Guide.
            </p>
            <button
              class="bg-white text-primary px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:bg-surface-container-low transition-all"
            >
              Read Strategy Guide
            </button>
          </div>
          <span
            class="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] text-white/10 group-hover:scale-110 transition-transform duration-700"
            >insights</span
          >
        </div>
        <div
          class="bg-secondary-container p-8 rounded-xl flex flex-col justify-between"
        >
          <div>
            <span
              class="material-symbols-outlined text-on-secondary-container mb-4"
              style="font-variation-settings: &quot;FILL&quot; 1"
              >star</span
            >
            <h4 class="text-lg font-bold text-on-secondary-container mb-2">
              Customer Loyalty
            </h4>
            <p class="text-on-secondary-container/70 text-sm">
              84% of your transactions come from returning customers.
            </p>
          </div>
          <a
            href="#"
            class="text-sm font-bold text-on-secondary-container underline underline-offset-4 mt-4"
            >View Analytics</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardNavbar from "@/components/dashboard/DashboardNavbar.vue";
import AppCard from "@/components/common/AppCard.vue";
import AppBadge from "@/components/common/AppBadge.vue";
import AppAvatar from "@/components/common/AppAvatar.vue";
import type { Transaction } from "@/types";

const transactions: Transaction[] = [
  {
    id: "1",
    customer: {
      name: "Sarah Jenkins",
      username: "@sarahj_creative",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDlWLdGbcToZebVo_qC3eVwdaVZmBTBZfYWHmZ52bpEJWpboQODAZTi2nMx_HB9ZaviqtqhPRCafzT1ZFi5fLOO2d3TDaWuFmx618Neu3MZVbjuwZJFqfH7w9cMQsb0jhUamyWqJfvBTEb-UZfiJaS7_9_zeUtn76VPvdnYjlRyAOpmK86YPBa4TzjzCuP65dyCOKsbbwMohNBWtt2AlzZXMHagvv0ZbFoNtPItiGI7EhJeIjduVyIpsV4qC8W0iCX8wu-ZIM9E51I",
    },
    product: "Exclusive Wallpapers Pack",
    productType: "Digital Pack",
    date: "Oct 24, 2023",
    time: "14:22 PM",
    amount: "Rp 150.000",
    status: "completed",
  },
  {
    id: "2",
    customer: {
      name: "Marcus Thorne",
      username: "@m.thorne",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDd63wiUGeKAhEo4zqcE06X9k91xRDyAnZOkr-O6HTALHULwS8SEPLYSQz66AFhYZKmj6yxht66vK4x_nVDBdX-x3c461k1otncOiWU8w9ZiH_aVDXYR01ENEHd_JGOKJZyswuGic97i5MWq0IlHDlD6Ic38kRkXgpSpWVArqMFf8ZyH3_BUSFGlvelRt5TEBl1Az60BJsRHRXW_qe6lhh-iQBjZBdzJQdjWU5NI57b3ozVocZ7pvCFbFOz-Scp0_AJqSNU5t5l2rc",
    },
    product: "Creator Masterclass Vol 1",
    productType: "Course",
    date: "Oct 24, 2023",
    time: "12:05 PM",
    amount: "Rp 2.450.000",
    status: "completed",
  },
  {
    id: "3",
    customer: { name: "Diana Tasha", username: "@diana_t", initials: "DT" },
    product: "Social Media UI Kit",
    productType: "Assets",
    date: "Oct 23, 2023",
    time: "18:45 PM",
    amount: "Rp 899.000",
    status: "processing",
  },
  {
    id: "4",
    customer: {
      name: "James Wilson",
      username: "@jwilson_pro",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDRpHgDF4ArvaWHxqHd-y2GvarnPKd6NN8WveP7etjNjUsqTQcLrLz6J6bgwfNRpJAvSTSATXMqEk7aWPjLFux7-KxogrlW2cnzjENbUZlJWu_22PqKLKn4NJlaMxHiJ-X8ND_Ty-8Do-MBlpC-JwYrEaJ3p8EwhkHOFVR-6gQbAljzpdnRblMiEw999oFu60lh-o-4cBg9l97vuZjzSbVNaOhRFCZl0JgrNGNxXKQYKY40UK8hV82nCFaJ7WSe57FiNfr7JEltC8Y",
    },
    product: "Lightroom Presets Pack",
    productType: "Presets",
    date: "Oct 23, 2023",
    time: "09:12 AM",
    amount: "Rp 320.000",
    status: "completed",
  },
  {
    id: "5",
    customer: {
      name: "Chloe Lee",
      username: "@chlo_lee",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAgA3d0ksFXSTP--1I_drP28j9EDdzMnZk0-JJJezieH9SndwJTGxTujNWoDw0wCOl9ASy6FAPBco_eGxlH5lI_M_AxZTsTooJGdo1V_GwfSnQCrj-dmmiOtKJ0sDbAcj9tpevcLDXsTV3gTX2pDBvQEuHEKWbza7foa4ueXQgCMQy0pKVnk-oqtgwP3iejcowiVWFlnh74xjK-dxvR5wsmXAWAH_BYFKiIDy1wtK3QBYKN4-1uDkOpl-ggD7x3jtHyyYfUNURzBDU",
    },
    product: "Brand Strategy PDF Guide",
    productType: "Guide",
    date: "Oct 22, 2023",
    time: "21:30 PM",
    amount: "Rp 550.000",
    status: "failed",
  },
];

function productBadgeClass(type: string): string {
  const map: Record<string, string> = {
    "Digital Pack": "bg-secondary-container/20 text-on-secondary-container",
    Course: "bg-tertiary-fixed/30 text-on-tertiary-fixed-variant",
    Assets: "bg-primary-fixed/30 text-on-primary-fixed-variant",
    Presets: "bg-secondary-container/20 text-on-secondary-container",
    Guide: "bg-tertiary-fixed/30 text-on-tertiary-fixed-variant",
  };
  return map[type] || "bg-surface-container-high text-on-surface-variant";
}

function statusVariant(status: string): "success" | "warning" | "danger" {
  const map: Record<string, "success" | "warning" | "danger"> = {
    completed: "success",
    processing: "warning",
    failed: "danger",
  };
  return map[status] || "success";
}
</script>

<style scoped>
.transactions-summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
</style>
