<template>
  <div class="bg-surface-container-lowest p-8 rounded-2xl shadow-angpao">
    <!-- Header -->
    <div class="flex justify-between items-center mb-10">
      <div>
        <h2 class="text-xl font-bold">Earnings Performance</h2>
        <p class="text-sm text-on-surface-variant">
          Your revenue flow over the last 30 days
        </p>
      </div>
      <div class="flex gap-2 bg-surface-container-low p-1 rounded-lg">
        <button
          v-for="period in periods"
          :key="period.value"
          :class="[
            'px-4 py-1.5 text-xs font-medium transition-colors',
            activePeriod === period.value
              ? 'bg-white rounded-md shadow-sm font-bold'
              : 'text-on-surface-variant hover:text-on-surface',
          ]"
          @click="switchPeriod(period.value)"
        >
          {{ period.label }}
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="h-64 flex items-center justify-center">
      <span class="material-symbols-outlined animate-spin text-2xl text-primary"
        >progress_activity</span
      >
    </div>

    <!-- Empty State -->
    <div
      v-else-if="chartData.length === 0"
      class="h-64 flex items-center justify-center"
    >
      <p class="text-sm text-on-surface-variant">No earnings data yet</p>
    </div>

    <!-- SVG Chart -->
    <div v-else class="h-64 w-full relative">
      <svg
        class="w-full h-full overflow-visible"
        preserveAspectRatio="none"
        :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
      >
        <defs>
          <linearGradient id="chart-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style="stop-color: rgba(187, 21, 44, 0.1); stop-opacity: 1"
            />
            <stop
              offset="100%"
              style="stop-color: rgba(187, 21, 44, 0); stop-opacity: 1"
            />
          </linearGradient>
        </defs>
        <!-- Fill area -->
        <path :d="areaPath" fill="url(#chart-gradient)" />
        <!-- Line -->
        <path
          :d="linePath"
          fill="none"
          stroke="#b7102a"
          stroke-linecap="round"
          stroke-width="3"
        />
        <!-- Data points -->
        <circle
          v-for="(point, index) in points"
          :key="index"
          :cx="point.x"
          :cy="point.y"
          r="4"
          fill="#b7102a"
          stroke="white"
          stroke-width="2"
          class="cursor-pointer"
        >
          <title>
            {{ chartLabels[index] }}: {{ formatCurrency(chartData[index]) }}
          </title>
        </circle>
      </svg>

      <!-- Chart Labels -->
      <div
        class="absolute bottom-0 left-0 w-full flex justify-between text-[10px] text-on-surface-variant/60 font-medium px-2 transform translate-y-6"
      >
        <span v-for="(label, i) in displayLabels" :key="i">{{ label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { analyticsApi } from "@/api";

const POLL_INTERVAL_MS = 10_000;

const periods = [
  { label: "Week", value: "week" as const },
  { label: "Month", value: "month" as const },
];

const activePeriod = ref<"week" | "month">("month");
const chartLabels = ref<string[]>([]);
const chartData = ref<number[]>([]);
const loading = ref(true);
let pollTimer: ReturnType<typeof setInterval> | null = null;

const svgWidth = 800;
const svgHeight = 200;
const paddingY = 20;

function formatCurrency(amount: number): string {
  return `Rp${amount.toLocaleString("id-ID")}`;
}

const maxValue = computed(() => Math.max(...chartData.value, 1));

const points = computed(() => {
  const data = chartData.value;
  if (data.length === 0) return [];

  const stepX = data.length > 1 ? svgWidth / (data.length - 1) : svgWidth / 2;
  return data.map((val, i) => ({
    x: data.length > 1 ? i * stepX : svgWidth / 2,
    y:
      svgHeight -
      paddingY -
      (val / maxValue.value) * (svgHeight - paddingY * 2),
  }));
});

const linePath = computed(() => {
  if (points.value.length === 0) return "";
  return points.value
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");
});

const areaPath = computed(() => {
  if (points.value.length === 0) return "";
  const line = points.value
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");
  const lastX = points.value[points.value.length - 1].x;
  const firstX = points.value[0].x;
  return `${line} L${lastX},${svgHeight} L${firstX},${svgHeight} Z`;
});

const displayLabels = computed(() => {
  const labels = chartLabels.value;
  if (labels.length <= 7) return labels.map(formatDateLabel);
  // Show max 5-7 labels evenly spaced
  const step = Math.ceil(labels.length / 5);
  return labels
    .filter((_, i) => i % step === 0 || i === labels.length - 1)
    .map(formatDateLabel);
});

function formatDateLabel(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d
      .toLocaleDateString("en-US", { day: "2-digit", month: "short" })
      .toUpperCase();
  } catch {
    return dateStr;
  }
}

async function fetchChart() {
  loading.value = true;
  try {
    const result = await analyticsApi.getEarningsChart(activePeriod.value);
    chartLabels.value = result.labels ?? [];
    chartData.value = (result.data ?? []).map(Number);
  } catch (err) {
    console.error("Failed to load earnings chart:", err);
    chartLabels.value = [];
    chartData.value = [];
  } finally {
    loading.value = false;
  }
}

async function silentRefreshChart() {
  try {
    const result = await analyticsApi.getEarningsChart(activePeriod.value);
    chartLabels.value = result.labels ?? [];
    chartData.value = (result.data ?? []).map(Number);
  } catch {
    // silent
  }
}

function startPolling() {
  stopPolling();
  pollTimer = setInterval(silentRefreshChart, POLL_INTERVAL_MS);
}

function stopPolling() {
  if (pollTimer !== null) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
}

function switchPeriod(period: "week" | "month") {
  activePeriod.value = period;
}

watch(activePeriod, async () => {
  await fetchChart();
  startPolling();
});

onMounted(async () => {
  await fetchChart();
  startPolling();
});

onBeforeUnmount(stopPolling);
</script>
