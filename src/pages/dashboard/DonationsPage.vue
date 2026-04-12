<template>
  <div>
    <DashboardNavbar
      page-title="Donations"
      search-placeholder="Search donations..."
    />

    <div class="pt-4 px-10 pb-20 mx-auto">
      <div class="space-y-1 mb-6">
        <h2 class="text-4xl font-extrabold tracking-tight text-on-surface">
          Donations Received
        </h2>
        <p class="text-on-surface-variant max-w-md">
          Track every donation sent to your page and monitor successful payments.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-3 mt-6">
        <AppCard class="p-6 h-full" shadow="angpao">
          <p
            class="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-1"
          >
            Total Donation Amount
          </p>
          <h3 class="text-2xl font-bold text-primary">
            {{ formatIDR(summary.total_amount) }}
          </h3>
          <p class="text-xs text-on-surface-variant mt-2 font-medium">
            Successful donations only
          </p>
        </AppCard>

        <AppCard class="p-6 h-full" shadow="angpao">
          <p
            class="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-1"
          >
            Total Donations
          </p>
          <h3 class="text-2xl font-bold text-on-surface">
            {{ formatNumber(summary.total_donations) }}
          </h3>
          <p class="text-xs text-on-surface-variant mt-2 font-medium">
            Number of paid donations
          </p>
        </AppCard>

        <AppCard class="p-6 h-full" shadow="angpao">
          <p
            class="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-1"
          >
            Unique Donors
          </p>
          <h3 class="text-2xl font-bold text-on-surface">
            {{ formatNumber(summary.unique_donors) }}
          </h3>
          <p class="text-xs text-on-surface-variant mt-2 font-medium">
            Distinct donor emails
          </p>
        </AppCard>
      </div>

      <p v-if="errorMessage" class="mt-6 text-sm font-medium text-red-600">
        {{ errorMessage }}
      </p>

      <AppCard shadow="angpao" class="overflow-hidden mt-6">
        <div v-if="isLoading" class="px-6 py-10 text-sm text-on-surface-variant">
          Loading donations...
        </div>

        <div
          v-else-if="donations.length === 0"
          class="px-6 py-10 text-sm text-on-surface-variant"
        >
          No donations found yet.
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-surface-container-low/50">
                <th
                  class="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest"
                >
                  Donor
                </th>
                <th
                  class="px-6 py-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest"
                >
                  Message
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
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr
                v-for="donation in donations"
                :key="donation.id"
                class="group hover:bg-surface-container-low transition-colors duration-200"
              >
                <td class="px-6 py-5">
                  <p class="text-sm font-semibold text-on-surface">
                    {{ donation.donor_display_name || "Anonymous" }}
                  </p>
                  <p class="text-xs text-on-surface-variant">
                    {{ donation.donor_email }}
                  </p>
                </td>
                <td class="px-6 py-5">
                  <p class="text-sm text-on-surface-variant line-clamp-2">
                    {{ donation.message || "-" }}
                  </p>
                </td>
                <td class="px-6 py-5">
                  <p class="text-sm text-on-surface font-medium">
                    {{ formatDate(donation.created_at) }}
                  </p>
                  <p class="text-[11px] text-on-surface-variant">
                    {{ formatTime(donation.created_at) }}
                  </p>
                </td>
                <td class="px-6 py-5 text-right font-bold text-on-surface">
                  {{ formatIDR(donation.amount) }}
                </td>
                <td class="px-6 py-5 text-right">
                  <AppBadge :variant="badgeVariant(donation.transaction_status)">
                    {{ normalizeStatusLabel(donation.transaction_status) }}
                  </AppBadge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="px-6 py-6 border-t border-slate-50 flex items-center justify-between"
        >
          <p class="text-xs text-on-surface-variant font-medium">
            Showing {{ donations.length }} of
            {{ formatNumber(summary.total_donations) }} successful donations
            (including pending rows in table)
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
import AppBadge from "@/components/common/AppBadge.vue";
import {
  donationsApi,
  type DonationHistoryItem,
  type DonationHistorySummary,
} from "@/api";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const isLoading = ref(false);
const errorMessage = ref("");
const donations = ref<DonationHistoryItem[]>([]);
const summary = ref<DonationHistorySummary>({
  total_amount: 0,
  total_donations: 0,
  unique_donors: 0,
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

function normalizeStatusLabel(status: string): string {
  const normalized = status.trim().toLowerCase();
  if (normalized === "") {
    return "pending";
  }
  return normalized;
}

function badgeVariant(status: string): "success" | "warning" | "danger" | "info" {
  const normalized = normalizeStatusLabel(status);
  if (normalized === "success" || normalized === "settlement") {
    return "success";
  }
  if (normalized === "failed" || normalized === "deny" || normalized === "cancel") {
    return "danger";
  }
  if (normalized === "expired" || normalized === "expire") {
    return "warning";
  }
  return "info";
}

async function loadDonations(): Promise<void> {
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

    const result = await donationsApi.getHistory({
      user_id: userID,
      page: 1,
      limit: 100,
    });

    donations.value = result.donations;
    summary.value = result.summary;
  } catch (error) {
    donations.value = [];
    summary.value = {
      total_amount: 0,
      total_donations: 0,
      unique_donors: 0,
    };
    errorMessage.value =
      error instanceof Error
        ? error.message
        : "Failed to load donation history.";
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  void loadDonations();
});
</script>
