<template>
  <div>
    <DashboardNavbar
      page-title="Transactions"
      search-placeholder="Search by product, customer..."
    />

    <div class="pt-4 px-10 pb-20 mx-auto">
      <div class="space-y-1 mb-4">
        <h2 class="text-4xl font-extrabold tracking-tight text-on-surface">
          Transaction Activity
        </h2>
        <p class="text-on-surface-variant max-w-md">
          Track your successful product sales in real-time.
        </p>
      </div>

      <!-- Verification Warning -->
      <VerificationWarningBanner class="mb-4" />

      <div
        class="transactions-summary-grid grid grid-cols-1 gap-4 md:grid-cols-2 mt-6"
      >
        <AppCard class="p-6 h-full" shadow="angpao">
          <p
            class="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-1"
          >
            Total Revenue
          </p>
          <h3 class="text-2xl font-bold text-primary">
            {{ formatIDR(summary.total_revenue) }}
          </h3>
          <p class="text-xs text-on-surface-variant mt-2 font-medium">
            Successful payments only
          </p>
        </AppCard>

        <AppCard class="p-6 h-full" shadow="angpao">
          <p
            class="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-1"
          >
            Product Sales
          </p>
          <h3 class="text-2xl font-bold text-on-surface">
            {{ formatNumber(summary.product_sales) }}
          </h3>
          <p class="text-xs text-on-surface-variant mt-2 font-medium">
            Total units sold
          </p>
        </AppCard>
      </div>

      <p v-if="errorMessage" class="mt-6 text-sm font-medium text-red-600">
        {{ errorMessage }}
      </p>

      <AppCard shadow="angpao" class="overflow-hidden mt-6">
        <div
          v-if="isLoading"
          class="px-6 py-10 text-sm text-on-surface-variant"
        >
          Loading transaction history...
        </div>

        <div
          v-else-if="transactions.length === 0"
          class="px-6 py-10 text-sm text-on-surface-variant"
        >
          No successful transactions found.
        </div>

        <div v-else class="overflow-x-auto">
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
                  class="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-right"
                >
                  Order ID
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
                  <p class="text-sm font-semibold text-on-surface">
                    {{ tx.email }}
                  </p>
                </td>
                <td class="px-6 py-5">
                  <p class="text-sm font-medium text-on-surface">
                    {{ tx.product_name || "-" }}
                  </p>
                </td>
                <td class="px-6 py-5">
                  <p class="text-sm text-on-surface font-medium">
                    {{ formatDate(tx.created_at) }}
                  </p>
                  <p class="text-[11px] text-on-surface-variant">
                    {{ formatTime(tx.created_at) }}
                  </p>
                </td>
                <td class="px-6 py-5 text-right font-bold text-on-surface">
                  {{ formatIDR(tx.gross_amount) }}
                </td>
                <td class="px-6 py-5 text-right">
                  <span class="text-xs font-semibold text-on-surface-variant">
                    {{ tx.order_id }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="px-6 py-6 border-t border-slate-50 flex items-center justify-between"
        >
          <p class="text-xs text-on-surface-variant font-medium">
            Showing {{ transactions.length }} of
            {{ formatNumber(summary.total_transactions) }} successful
            transactions
          </p>
        </div>
      </AppCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar.vue";
import AppCard from "@/components/common/AppCard.vue";
import VerificationWarningBanner from "@/components/common/VerificationWarningBanner.vue";
import {
  transactionsApi,
  type TransactionHistoryItem,
  type TransactionHistorySummary,
} from "@/api";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const isLoading = ref(false);
const errorMessage = ref("");
const transactions = ref<TransactionHistoryItem[]>([]);
const summary = ref<TransactionHistorySummary>({
  total_revenue: 0,
  product_sales: 0,
  total_transactions: 0,
});

function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}

function formatDate(rawDate: string): string {
  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatTime(rawDate: string): string {
  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

async function loadTransactions(): Promise<void> {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    if (!authStore.user) {
      await authStore.bootstrap();
    }

    const userID = authStore.user?.id?.trim() ?? "";
    if (userID === "") {
      throw new Error("Sesi user tidak ditemukan, silakan login ulang.");
    }

    const result = await transactionsApi.getAll({
      user_id: userID,
      page: 1,
      limit: 100,
    });

    transactions.value = result.transactions;
    summary.value = result.summary;
  } catch (error) {
    transactions.value = [];
    summary.value = {
      total_revenue: 0,
      product_sales: 0,
      total_transactions: 0,
    };
    errorMessage.value =
      error instanceof Error
        ? error.message
        : "Failed to load transaction history.";
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  void loadTransactions();
});
</script>

<style scoped>
.transactions-summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
</style>
