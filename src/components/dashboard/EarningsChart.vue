<template>
  <div class="bg-surface-container-lowest p-8 rounded-2xl shadow-angpao">
    <div class="flex justify-between items-center mb-8 gap-4">
      <div>
        <h2 class="text-xl font-bold">Earnings Performance</h2>
        <p class="text-sm text-on-surface-variant mt-1">
          Your revenue flow over the last
          {{ activePeriod === "week" ? "7" : "30" }} days
        </p>
      </div>

      <div class="flex gap-1 bg-surface-container-low p-1 rounded-xl">
        <button
          v-for="period in periods"
          :key="period.value"
          :class="[
            'px-5 py-2 text-sm font-medium rounded-lg transition-all',
            activePeriod === period.value
              ? 'bg-surface-container-lowest text-on-surface shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface',
          ]"
          @click="switchPeriod(period.value)"
        >
          {{ period.label }}
        </button>
      </div>
    </div>

    <div class="relative h-[300px]">
      <div
        v-if="loading"
        class="absolute inset-0 z-10 flex items-center justify-center bg-surface-container-lowest/80"
      >
        <span
          class="material-symbols-outlined animate-spin text-2xl text-primary"
        >
          progress_activity
        </span>
      </div>

      <div
        v-else-if="errorMessage"
        class="absolute inset-0 z-10 flex items-center justify-center text-sm text-error"
      >
        {{ errorMessage }}
      </div>

      <canvas ref="chartCanvas"></canvas>
    </div>

    <div
      class="chart-legend mt-5 pt-4 border-t border-outline-variant/30 flex flex-wrap gap-6"
    >
      <div class="flex items-center gap-2 text-xs text-on-surface-variant">
        <span class="h-[9px] w-[9px] rounded-full bg-[#C0392B]"></span>
        Sales
        <span class="font-bold text-on-surface">{{
          formatCurrency(salesTotal)
        }}</span>
      </div>
      <div class="flex items-center gap-2 text-xs text-on-surface-variant">
        <span class="h-[9px] w-[9px] rounded-full bg-[#27AE60]"></span>
        Donations
        <span class="font-bold text-on-surface">{{
          formatCurrency(donationsTotal)
        }}</span>
      </div>
      <div class="flex items-center gap-2 text-xs text-on-surface-variant">
        <span class="h-[9px] w-[9px] rounded-full bg-[#1A1A1A]"></span>
        Total
        <span class="font-bold text-on-surface">{{
          formatCurrency(totalAmount)
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import Chart from "chart.js/auto";
import type { ScriptableContext } from "chart.js";
import { analyticsApi } from "@/api";

type Period = "week" | "month";

const POLL_INTERVAL_MS = 10_000;

const periods = [
  { label: "Week", value: "week" as const },
  { label: "Month", value: "month" as const },
];

const activePeriod = ref<Period>("month");
const chartCanvas = ref<HTMLCanvasElement | null>(null);
const loading = ref(true);
const errorMessage = ref("");

const labels = ref<string[]>([]);
const sales = ref<number[]>([]);
const donations = ref<number[]>([]);
const total = ref<number[]>([]);

let chart: Chart | null = null;
let pollTimer: ReturnType<typeof setInterval> | null = null;

const salesTotal = computed(() =>
  sales.value.reduce((sum, value) => sum + value, 0),
);
const donationsTotal = computed(() =>
  donations.value.reduce((sum, value) => sum + value, 0),
);
const totalAmount = computed(() =>
  total.value.reduce((sum, value) => sum + value, 0),
);

function toNumber(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeSeries(source: unknown, length: number): number[] {
  const arraySource = Array.isArray(source) ? source : [];
  return Array.from({ length }, (_, index) => toNumber(arraySource[index]));
}

function formatCurrency(value: number): string {
  return `Rp${Math.round(value).toLocaleString("id-ID")}`;
}

function formatYAxisTick(value: string | number): string {
  const amount = toNumber(value);
  if (amount === 0) return "0";
  return `Rp${Math.round(amount / 1000)}rb`;
}

function formatDateLabel(dateStr: string): string {
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const date = new Date(
    Number(parts[0]),
    Number(parts[1]) - 1,
    Number(parts[2]),
  );
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

function buildGradient(
  ctx: CanvasRenderingContext2D,
  color: "sales" | "donations" | "total",
) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 320);

  if (color === "sales") {
    gradient.addColorStop(0, "rgba(192,57,43,0.20)");
    gradient.addColorStop(1, "rgba(192,57,43,0)");
    return gradient;
  }

  if (color === "donations") {
    gradient.addColorStop(0, "rgba(39,174,96,0.16)");
    gradient.addColorStop(1, "rgba(39,174,96,0)");
    return gradient;
  }

  gradient.addColorStop(0, "rgba(26,26,26,0.08)");
  gradient.addColorStop(1, "rgba(26,26,26,0)");
  return gradient;
}

function destroyChart() {
  if (chart) {
    chart.destroy();
    chart = null;
  }
}

function renderChart() {
  const canvas = chartCanvas.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  destroyChart();

  const salesGradient = buildGradient(ctx, "sales");
  const donationGradient = buildGradient(ctx, "donations");
  const totalGradient = buildGradient(ctx, "total");

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels.value,
      datasets: [
        {
          label: "Sales",
          data: sales.value,
          borderColor: "#C0392B",
          backgroundColor: salesGradient,
          borderWidth: 3,
          pointBackgroundColor: "#C0392B",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 8,
          fill: true,
          tension: 0.1,
        },
        {
          label: "Donations",
          data: donations.value,
          borderColor: "#27AE60",
          backgroundColor: donationGradient,
          borderWidth: 3,
          pointBackgroundColor: "#27AE60",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 8,
          fill: true,
          tension: 0.1,
        },
        {
          label: "Total",
          data: total.value,
          borderColor: "#1A1A1A",
          backgroundColor: totalGradient,
          borderWidth: 3,
          borderDash: [6, 4],
          pointBackgroundColor: "#1A1A1A",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 7,
          fill: true,
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      animations: {
        y: {
          from: (ctx: ScriptableContext<"line">) =>
            ctx.chart.scales.y.getPixelForValue(0),
          duration: 2000,
          easing: "easeInOutCubic",
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#1a1a1a",
          padding: 12,
          cornerRadius: 10,
          callbacks: {
            label: (ctx) =>
              ` ${ctx.dataset.label}: ${formatCurrency(toNumber(ctx.parsed.y))}`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: "#8a8a8a",
            font: { size: 12 },
          },
        },
        y: {
          position: "right",
          beginAtZero: true,
          grid: { color: "#f0eeec" },
          border: { display: false },
          ticks: {
            color: "#8a8a8a",
            font: { size: 12 },
            maxTicksLimit: 5,
            callback: (value) => formatYAxisTick(value),
          },
        },
      },
    },
  });
}

function updateChartData() {
  if (!chart) {
    renderChart();
    return;
  }
  chart.data.labels = labels.value;
  chart.data.datasets[0].data = sales.value;
  chart.data.datasets[1].data = donations.value;
  chart.data.datasets[2].data = total.value;
  chart.update("active");
}

function applyPayload(payload: {
  labels?: unknown;
  data?: unknown;
  sales?: unknown;
  donations?: unknown;
  total?: unknown;
}) {
  const nextLabels = Array.isArray(payload.labels)
    ? payload.labels.map((item) => formatDateLabel(String(item)))
    : [];
  const baseLength = nextLabels.length;

  const salesSeries = Array.isArray(payload.sales)
    ? normalizeSeries(payload.sales, baseLength)
    : [];
  const donationsSeries = Array.isArray(payload.donations)
    ? normalizeSeries(payload.donations, baseLength)
    : [];
  const dataSeries = normalizeSeries(payload.data, baseLength);
  const totalSeriesFromApi = Array.isArray(payload.total)
    ? normalizeSeries(payload.total, baseLength)
    : [];

  labels.value = nextLabels;

  // Use only available API fields, no fabricated hardcoded values.
  sales.value = salesSeries.length > 0 ? salesSeries : dataSeries;
  donations.value =
    donationsSeries.length > 0
      ? donationsSeries
      : Array.from({ length: baseLength }, () => 0);
  total.value =
    totalSeriesFromApi.length > 0
      ? totalSeriesFromApi
      : sales.value.map(
          (salesValue, index) => salesValue + donations.value[index],
        );
}

async function loadChart(showLoader: boolean) {
  if (showLoader) loading.value = true;
  errorMessage.value = "";

  try {
    const result = await analyticsApi.getEarningsChart(activePeriod.value);
    applyPayload(result);
    renderChart();
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : "failed to load earnings chart";
    labels.value = [];
    sales.value = [];
    donations.value = [];
    total.value = [];
    destroyChart();
  } finally {
    if (showLoader) loading.value = false;
  }
}

async function silentRefresh() {
  try {
    const result = await analyticsApi.getEarningsChart(activePeriod.value);
    applyPayload(result);
    updateChartData();
  } catch {
    // silent refresh failure
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

function switchPeriod(period: Period) {
  if (activePeriod.value === period) return;
  activePeriod.value = period;
}

watch(activePeriod, async () => {
  await loadChart(true);
  startPolling();
});

onMounted(async () => {
  await loadChart(true);
  startPolling();
});

onBeforeUnmount(() => {
  stopPolling();
  destroyChart();
});
</script>
