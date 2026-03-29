<template>
  <div>
    <!-- Navbar -->
    <DashboardNavbar
      page-title="Overview"
      :show-live-badge="true"
      search-placeholder="Search analytics..."
    />

    <!-- Dashboard Content -->
    <div class="p-8 space-y-8">
      <!-- Quick Stats Bento Grid -->
      <div class="dashboard-stats-grid">
        <StatsCard v-for="stat in statsCards" :key="stat.label" :data="stat" />
      </div>

      <!-- Main Analytics Area -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Chart Section (2-col wide) -->
        <div class="lg:col-span-2 space-y-6">
          <EarningsChart />

          <!-- Creator Spotlight -->
          <div class="dashboard-spotlight-grid">
            <MilestoneCard />

            <!-- Add New Product -->
            <div
              class="bg-surface-container-high/40 p-6 rounded-2xl flex flex-col justify-center items-center text-center border border-dashed border-outline-variant"
            >
              <div
                class="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm"
              >
                <span class="material-symbols-outlined text-on-surface-variant"
                  >add</span
                >
              </div>
              <h4 class="text-sm font-bold">New Product</h4>
              <p class="text-xs text-on-surface-variant">
                Expand your digital inventory
              </p>
            </div>
          </div>
        </div>

        <!-- Recent Activity Sidebar (1-col) -->
        <div class="space-y-6">
          <RecentActivity :activities="store.recentActivity" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardNavbar from "@/components/dashboard/DashboardNavbar.vue";
import StatsCard from "@/components/dashboard/StatsCard.vue";
import EarningsChart from "@/components/dashboard/EarningsChart.vue";
import MilestoneCard from "@/components/dashboard/MilestoneCard.vue";
import RecentActivity from "@/components/dashboard/RecentActivity.vue";
import { useDashboardStore } from "@/stores/dashboard";
import type { StatCardData } from "@/types";

const store = useDashboardStore();

const statsCards: StatCardData[] = [
  {
    label: "Total Earnings",
    value: "$12,450.00",
    icon: "payments",
    iconBgClass: "bg-primary/5",
    iconTextClass: "text-primary",
    badge: "+12.4%",
    badgeClass: "text-green-600 bg-green-50",
  },
  {
    label: "Points Balance",
    value: "84,200",
    icon: "toll",
    iconBgClass: "bg-tertiary-fixed/20",
    iconTextClass: "text-tertiary",
    badge: "Pts",
    badgeClass: "text-tertiary bg-tertiary-fixed/30",
  },
  {
    label: "Total Sales",
    value: "1,892",
    icon: "shopping_cart",
    iconBgClass: "bg-secondary/5",
    iconTextClass: "text-secondary",
    badge: "Qty",
    badgeClass: "text-on-surface-variant bg-surface-container-low",
  },
  {
    label: "Active Viewers",
    value: "4,312",
    icon: "visibility",
    iconBgClass: "bg-primary",
    iconTextClass: "text-white",
    isLive: true,
    hasGlow: true,
  },
];
</script>

<style scoped>
/* Stats cards: auto-fit so they expand on zoom-out, wrap on narrow */
.dashboard-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem; /* 24px */
}

/* Creator spotlight: 2-column-ish but flexible */
.dashboard-spotlight-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}
</style>
