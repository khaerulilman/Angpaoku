<template>
  <div>
    <DashboardNavbar
      page-title="Analytics"
      search-placeholder="Search insights..."
    />

    <div class="p-8 mx-auto">
      <!-- Header -->
      <div class="mb-6">
        <h1
          class="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-2"
        >
          Analytics
        </h1>
        <p class="text-on-surface-variant max-w-md leading-relaxed">
          Deep insights into your creator performance, audience behavior, and
          revenue trends.
        </p>
      </div>

      <!-- Verification Warning -->
      <VerificationWarningBanner class="mb-8" />

      <!-- Top Stats Row -->
      <div class="analytics-stats-grid mb-8">
        <AppCard
          v-for="stat in topStats"
          :key="stat.label"
          class="p-6"
          shadow="sm"
        >
          <p
            class="text-xs font-bold uppercase tracking-widest text-on-surface-variant/50 mb-2"
          >
            {{ stat.label }}
          </p>
          <h3 class="text-2xl font-bold">{{ stat.value }}</h3>
          <span
            :class="['text-xs font-bold mt-1 inline-block', stat.changeClass]"
            >{{ stat.change }}</span
          >
        </AppCard>
      </div>

      <!-- Chart Area -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div class="lg:col-span-2">
          <EarningsChart />
        </div>

        <!-- Top Products -->
        <AppCard class="p-6" shadow="sm">
          <h3 class="font-bold text-lg mb-6">Top Products</h3>
          <div class="space-y-5">
            <div
              v-for="(product, i) in topProducts"
              :key="i"
              class="flex items-center gap-3"
            >
              <span class="text-xs font-bold text-on-surface-variant w-5">{{
                i + 1
              }}</span>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold truncate">{{ product.name }}</p>
                <p class="text-[10px] text-on-surface-variant">
                  {{ product.sales }} sales
                </p>
              </div>
              <span class="text-sm font-bold text-primary">{{
                product.revenue
              }}</span>
            </div>
          </div>
        </AppCard>
      </div>

      <!-- Audience Insights -->
      <div class="analytics-audience-grid">
        <AppCard class="p-8" shadow="sm">
          <h3 class="font-bold text-lg mb-6">Audience by Region</h3>
          <div class="space-y-4">
            <div
              v-for="region in regions"
              :key="region.name"
              class="flex items-center gap-4"
            >
              <span class="text-sm font-medium text-on-surface w-24">{{
                region.name
              }}</span>
              <div
                class="flex-1 h-2 bg-surface-container-low rounded-full overflow-hidden"
              >
                <div
                  class="h-full bg-primary rounded-full"
                  :style="{ width: `${region.percent}%` }"
                ></div>
              </div>
              <span
                class="text-xs font-bold text-on-surface-variant w-10 text-right"
                >{{ region.percent }}%</span
              >
            </div>
          </div>
        </AppCard>

        <AppCard class="p-8" shadow="sm">
          <h3 class="font-bold text-lg mb-6">Engagement Overview</h3>
          <div class="analytics-engagement-grid">
            <div
              v-for="metric in engagementMetrics"
              :key="metric.label"
              class="text-center"
            >
              <div
                :class="[
                  'w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center',
                  metric.bgClass,
                ]"
              >
                <span
                  class="material-symbols-outlined"
                  :class="metric.iconClass"
                  >{{ metric.icon }}</span
                >
              </div>
              <p class="text-xl font-bold">{{ metric.value }}</p>
              <p
                class="text-[10px] text-on-surface-variant uppercase tracking-widest font-medium"
              >
                {{ metric.label }}
              </p>
            </div>
          </div>
        </AppCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardNavbar from "@/components/dashboard/DashboardNavbar.vue";
import AppCard from "@/components/common/AppCard.vue";
import EarningsChart from "@/components/dashboard/EarningsChart.vue";
import VerificationWarningBanner from "@/components/common/VerificationWarningBanner.vue";

const topStats = [
  {
    label: "Page Views",
    value: "24,891",
    change: "+18.2%",
    changeClass: "text-green-600",
  },
  {
    label: "Conversion Rate",
    value: "8.4%",
    change: "+2.1%",
    changeClass: "text-green-600",
  },
  {
    label: "Avg. Order Value",
    value: "$32.50",
    change: "+5.3%",
    changeClass: "text-green-600",
  },
  {
    label: "Bounce Rate",
    value: "24.1%",
    change: "-3.2%",
    changeClass: "text-red-500",
  },
];

const topProducts = [
  { name: "Exclusive Wallpapers Pack", sales: 1204, revenue: "$18,060" },
  { name: "Creator Masterclass Vol 1", sales: 352, revenue: "$17,248" },
  { name: "1-on-1 Consulting", sales: 18, revenue: "$2,700" },
  { name: "Lightroom Presets", sales: 89, revenue: "$1,068" },
];

const regions = [
  { name: "Indonesia", percent: 42 },
  { name: "USA", percent: 28 },
  { name: "Japan", percent: 14 },
  { name: "South Korea", percent: 9 },
  { name: "Others", percent: 7 },
];

const engagementMetrics = [
  {
    icon: "visibility",
    label: "Viewers",
    value: "4,312",
    bgClass: "bg-primary/10",
    iconClass: "text-primary",
  },
  {
    icon: "favorite",
    label: "Donations",
    value: "892",
    bgClass: "bg-primary-fixed",
    iconClass: "text-primary",
  },
  {
    icon: "shopping_bag",
    label: "Purchases",
    value: "1,284",
    bgClass: "bg-secondary/10",
    iconClass: "text-secondary",
  },
  {
    icon: "share",
    label: "Shares",
    value: "3,201",
    bgClass: "bg-tertiary-fixed",
    iconClass: "text-tertiary",
  },
];
</script>

<style scoped>
.analytics-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.analytics-audience-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.analytics-engagement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
}
</style>
