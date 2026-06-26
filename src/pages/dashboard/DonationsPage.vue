<template>
  <div>
    <DashboardNavbar
      page-title="Donations"
      search-placeholder="Search donations..."
    />

    <div class="pt-4 px-10 pb-20 mx-auto">
      <div class="flex justify-between">
        <div class="space-y-1 mb-4">
          <h2 class="text-4xl font-extrabold tracking-tight text-on-surface">
            Donations Received
          </h2>
          <p class="text-on-surface-variant max-w-md">
            Track every donation sent to your page and monitor successful
            payments.
          </p>
        </div>
        <div>
          <button
            type="button"
            class="px-4 py-2 rounded-xl bg-primary text-white font-semibold disabled:opacity-50"
            :disabled="!donationPublicUrl"
            @click="isQrOpen = true"
          >
            Get your QR
          </button>
        </div>
      </div>

      <!-- Verification Warning -->
      <VerificationWarningBanner class="mb-4" />

      <div class="grid grid-cols-1 gap-4 md:grid-cols-3 mt-6">
        <div v-if="isLoading">
          <AppCard class="p-6 h-full" shadow="angpao">
            <div class="space-y-3">
              <div
                class="h-3 w-32 rounded bg-surface-container-high animate-pulse"
              ></div>
              <div
                class="h-7 w-40 rounded bg-surface-container-high animate-pulse"
              ></div>
              <div
                class="h-3 w-44 rounded bg-surface-container-high animate-pulse"
              ></div>
            </div>
          </AppCard>
        </div>
        <div v-else>
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
        </div>

        <div v-if="isLoading">
          <AppCard class="p-6 h-full" shadow="angpao">
            <div class="space-y-3">
              <div
                class="h-3 w-32 rounded bg-surface-container-high animate-pulse"
              ></div>
              <div
                class="h-7 w-40 rounded bg-surface-container-high animate-pulse"
              ></div>
              <div
                class="h-3 w-44 rounded bg-surface-container-high animate-pulse"
              ></div>
            </div>
          </AppCard>
        </div>
        <div v-else>
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
        </div>

        <div v-if="isLoading">
          <AppCard class="p-6 h-full" shadow="angpao">
            <div class="space-y-3">
              <div
                class="h-3 w-32 rounded bg-surface-container-high animate-pulse"
              ></div>
              <div
                class="h-7 w-40 rounded bg-surface-container-high animate-pulse"
              ></div>
              <div
                class="h-3 w-44 rounded bg-surface-container-high animate-pulse"
              ></div>
            </div>
          </AppCard>
        </div>
        <div v-else>
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
      </div>

      <p v-if="errorMessage" class="mt-6 text-sm font-medium text-red-600">
        {{ errorMessage }}
      </p>

      <AppCard shadow="angpao" class="overflow-hidden mt-6">
        <div v-if="isLoading" class="overflow-x-auto">
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
                  Points
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr
                v-for="index in 6"
                :key="`skeleton-${index}`"
                class="group hover:bg-surface-container-low transition-colors duration-200"
              >
                <td class="px-6 py-5">
                  <div class="space-y-2">
                    <div
                      class="h-4 w-32 rounded bg-surface-container-high animate-pulse"
                    ></div>
                    <div
                      class="h-3 w-40 rounded bg-surface-container-high animate-pulse"
                    ></div>
                  </div>
                </td>
                <td class="px-6 py-5">
                  <div
                    class="h-4 w-48 rounded bg-surface-container-high animate-pulse"
                  ></div>
                </td>
                <td class="px-6 py-5">
                  <div class="space-y-2">
                    <div
                      class="h-4 w-24 rounded bg-surface-container-high animate-pulse"
                    ></div>
                    <div
                      class="h-3 w-20 rounded bg-surface-container-high animate-pulse"
                    ></div>
                  </div>
                </td>
                <td class="px-6 py-5 text-right">
                  <div
                    class="h-4 w-24 rounded bg-surface-container-high animate-pulse ml-auto"
                  ></div>
                </td>
              </tr>
            </tbody>
          </table>
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
                  Points
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
                <td class="px-6 py-5 text-right font-bold text-on-surface">
                  {{ formatNumber(donation.points ?? 0) }}
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
            {{ formatNumber(summary.total_donations) }} donations (Page
            {{ currentPage }} of {{ totalPages }})
          </p>
          <div class="flex items-center gap-2">
            <button
              type="button"
              :disabled="currentPage === 1 || isLoading"
              class="px-3 py-2 text-sm font-medium rounded-lg border border-outline-variant/30 text-on-surface hover:bg-surface-container-low disabled:opacity-50 disabled:cursor-not-allowed"
              @click="previousPage"
            >
              Previous
            </button>
            <span class="text-xs font-medium text-on-surface-variant">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button
              type="button"
              :disabled="
                currentPage === totalPages ||
                isLoading ||
                donations.length < itemsPerPage
              "
              class="px-3 py-2 text-sm font-medium rounded-lg border border-outline-variant/30 text-on-surface hover:bg-surface-container-low disabled:opacity-50 disabled:cursor-not-allowed"
              @click="nextPage"
            >
              Next
            </button>
          </div>
        </div>
      </AppCard>

      <div
        v-if="isQrOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        @click.self="isQrOpen = false"
      >
        <div class="w-full max-w-sm rounded-2xl bg-surface p-5 shadow-xl">
          <h3 class="mb-3 text-lg font-bold text-on-surface">
            Your Donation QR
          </h3>

          <div class="mb-3 flex justify-center">
            <QrcodeVue
              v-if="donationPublicUrl"
              :value="donationPublicUrl"
              :size="220"
              level="M"
              render-as="svg"
            />
          </div>

          <p class="mb-4 break-all text-xs text-on-surface-variant">
            {{ donationPublicUrl }}
          </p>

          <div class="flex justify-end gap-2">
            <button
              type="button"
              class="rounded-lg border border-outline px-3 py-2 text-sm font-medium text-on-surface"
              @click="isQrOpen = false"
            >
              Close
            </button>
            <a
              :href="donationPublicUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white"
            >
              Open link
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import QrcodeVue from "qrcode.vue";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar.vue";
import AppCard from "@/components/common/AppCard.vue";
import VerificationWarningBanner from "@/components/common/VerificationWarningBanner.vue";
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
const isQrOpen = ref(false);
const currentPage = ref(1);
const itemsPerPage = 10;

const donationPublicUrl = computed(() => {
  const username = authStore.user?.username?.trim() ?? "";
  if (username === "") {
    return "";
  }
  return window.location.origin + `/donations/` + encodeURIComponent(username);
});

const totalPages = computed(() => {
  return Math.ceil(summary.value.total_donations / itemsPerPage);
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

function nextPage(): void {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    void loadDonations();
  }
}

function previousPage(): void {
  if (currentPage.value > 1) {
    currentPage.value--;
    void loadDonations();
  }
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
      page: currentPage.value,
      limit: itemsPerPage,
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
