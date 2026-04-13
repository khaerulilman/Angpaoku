<template>
  <div>
    <!-- Navbar -->
    <DashboardNavbar
      page-title="Overview"
      :show-live-badge="false"
      search-placeholder="Search analytics..."
    />

    <!-- Dashboard Content -->
    <div class="p-8 space-y-8">
      <!-- Verification Warning -->
      <VerificationWarningBanner />

      <!-- Skeleton Loading State -->
      <div v-if="loading" class="space-y-8">
        <!-- Skeleton Stats Cards -->
        <div class="dashboard-stats-grid">
          <SkeletonStatsCard v-for="i in 3" :key="i" />
        </div>

        <!-- Skeleton Main Analytics Area -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Skeleton Chart Section (2-col wide) -->
          <div class="lg:col-span-2 space-y-6">
            <SkeletonEarningsChart />

            <!-- Skeleton Creator Spotlight -->
            <div class="dashboard-spotlight-grid">
              <SkeletonMilestoneCard />
              <SkeletonNewProductCard />
            </div>
          </div>

          <!-- Skeleton Recent Activity Sidebar (1-col) -->
          <div class="space-y-6">
            <SkeletonRecentActivity />
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-error-container/40 border border-error/20 rounded-2xl p-6 text-center"
      >
        <span class="material-symbols-outlined text-error text-3xl mb-2"
          >error</span
        >
        <p class="text-sm text-error font-medium">{{ error }}</p>
        <button
          class="mt-3 px-4 py-1.5 text-xs font-bold bg-primary text-white rounded-lg"
          @click="fetchDashboard"
        >
          Retry
        </button>
      </div>

      <template v-else>
        <!-- Quick Stats Bento Grid -->
        <div class="dashboard-stats-grid">
          <StatsCard
            v-for="stat in statsCards"
            :key="stat.label"
            :data="stat"
          />
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
                  <span
                    class="material-symbols-outlined text-on-surface-variant"
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
            <RecentActivity :activities="recentActivities" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar.vue";
import StatsCard from "@/components/dashboard/StatsCard.vue";
import EarningsChart from "@/components/dashboard/EarningsChart.vue";
import MilestoneCard from "@/components/dashboard/MilestoneCard.vue";
import RecentActivity from "@/components/dashboard/RecentActivity.vue";
import VerificationWarningBanner from "@/components/common/VerificationWarningBanner.vue";
import SkeletonStatsCard from "@/components/dashboard/dashboardSkeleton/SkeletonStatsCard.vue";
import SkeletonEarningsChart from "@/components/dashboard/dashboardSkeleton/SkeletonEarningsChart.vue";
import SkeletonMilestoneCard from "@/components/dashboard/dashboardSkeleton/SkeletonMilestoneCard.vue";
import SkeletonNewProductCard from "@/components/dashboard/dashboardSkeleton/SkeletonNewProductCard.vue";
import SkeletonRecentActivity from "@/components/dashboard/dashboardSkeleton/SkeletonRecentActivity.vue";
import {
  dashboardApi,
  type DashboardOverviewResponse,
  type DashboardActivityItem,
} from "@/api";
import type { StatCardData, ActivityItem } from "@/types";

const POLL_INTERVAL_MS = 10_000;

const loading = ref(true);
const error = ref("");
const overview = ref<DashboardOverviewResponse | null>(null);
let pollTimer: ReturnType<typeof setInterval> | null = null;

function formatCurrency(amount: number): string {
  return `Rp${amount.toLocaleString("id-ID")}`;
}

function formatNumber(n: number): string {
  return n.toLocaleString("id-ID");
}

function formatTimeAgo(isoDate: string): string {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

const statsCards = computed<StatCardData[]>(() => {
  const s = overview.value?.snapshot;
  if (!s) return [];

  const totalEarnings =
    (s.total_revenue ?? 0) + (s.total_donations_amount ?? 0);

  return [
    {
      label: "Total Earnings",
      value: formatCurrency(totalEarnings),
      icon: "payments",
      iconBgClass: "bg-primary/5",
      iconTextClass: "text-primary",
      badge: `${formatNumber(s.total_transactions + s.total_donations_count)} txn`,
      badgeClass: "text-green-600 bg-green-50",
    },
    {
      label: "Total Sales",
      value: formatNumber(s.product_sales),
      icon: "shopping_cart",
      iconBgClass: "bg-secondary/5",
      iconTextClass: "text-secondary",
      badge: formatCurrency(s.total_revenue),
      badgeClass: "text-on-surface-variant bg-surface-container-low",
    },
    {
      label: "Total Donations",
      value: formatNumber(s.total_donations_count),
      icon: "volunteer_activism",
      iconBgClass: "bg-tertiary/5",
      iconTextClass: "text-tertiary",
      badge: formatCurrency(s.total_donations_amount),
      badgeClass: "text-on-surface-variant bg-surface-container-low",
    },
  ];
});

const recentActivities = computed<ActivityItem[]>(() => {
  const activities = overview.value?.recent_activities ?? [];
  return activities
    .map((a: DashboardActivityItem) => ({
      id: a.id,
      type: (a.activity_type === "donation"
        ? "donation"
        : "sale") as ActivityItem["type"],
      title: a.title,
      subtitle: a.subtitle || a.order_id,
      amount: a.amount_display || formatCurrency(a.amount),
      amountType: (a.source === "donation"
        ? "positive"
        : "neutral") as ActivityItem["amountType"],
      timeAgo: formatTimeAgo(a.occurred_at),
      icon: a.activity_type === "donation" ? "favorite" : "shopping_bag",
    }))
    .slice(0, 10);
});

async function fetchDashboard() {
  loading.value = true;
  error.value = "";
  try {
    overview.value = await dashboardApi.getOverview(10);
  } catch (err: unknown) {
    error.value =
      err instanceof Error ? err.message : "Failed to load dashboard";
  } finally {
    loading.value = false;
  }
}

async function silentRefresh() {
  try {
    overview.value = await dashboardApi.getOverview(10);
    if (error.value) error.value = "";
  } catch {
    // silent — don't overwrite UI on background poll failure
  }
}

function startPolling() {
  stopPolling();
  pollTimer = setInterval(silentRefresh, POLL_INTERVAL_MS);
}

function stopPolling() {
  if (pollTimer !== null) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
}

onMounted(async () => {
  await fetchDashboard();
  startPolling();
});

onBeforeUnmount(stopPolling);
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
