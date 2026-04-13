<template>
  <header
    class="h-20 px-8 flex justify-between items-center glass-nav sticky top-0 z-30 bg-white/60"
  >
    <div class="flex items-center gap-4">
      <h1
        class="text-2xl font-extrabold tracking-tight text-on-surface font-headline"
      >
        {{ pageTitle }}
      </h1>
      <AppBadge v-if="showLiveBadge" variant="info">Live Updates</AppBadge>
    </div>

    <div class="flex items-center gap-6">
      <!-- Search -->
      <div class="relative hidden lg:block">
        <span
          class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50"
          >search</span
        >
        <input
          type="text"
          :placeholder="searchPlaceholder"
          class="bg-surface-container-highest/50 border-none rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-primary/20 placeholder-on-surface-variant/40"
        />
      </div>

      <div class="flex items-center gap-4">
        <div ref="notificationDropdownRef" class="relative">
          <button
            class="relative w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
            type="button"
            @click="toggleNotifications"
          >
            <span class="material-symbols-outlined">notifications</span>
            <span
              v-if="unreadCount > 0"
              class="absolute -top-1 -right-1 min-w-[18px] rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold leading-none text-white"
            >
              {{ unreadCount > 99 ? "99+" : unreadCount }}
            </span>
          </button>

          <div
            v-if="isNotificationOpen"
            class="absolute right-0 mt-3 w-[360px] max-w-[90vw] rounded-2xl border border-outline-variant/30 bg-white shadow-angpao-lg overflow-hidden"
          >
            <div
              class="flex items-center justify-between border-b border-outline-variant/20 px-4 py-3"
            >
              <p class="text-sm font-bold text-on-surface">Notifications</p>
              <button
                class="text-xs text-primary hover:underline"
                type="button"
                @click="refreshNotifications"
              >
                Refresh
              </button>
            </div>

            <div
              class="flex items-center justify-between border-b border-outline-variant/10 px-4 py-2"
            >
              <label
                for="email-notif-toggle"
                class="text-xs text-on-surface-variant"
              >
                Email Notifications
              </label>
              <button
                id="email-notif-toggle"
                type="button"
                role="switch"
                :aria-checked="isEmailAllowed"
                :disabled="isEmailPermissionLoading"
                class="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/30"
                :class="isEmailAllowed ? 'bg-primary' : 'bg-gray-300'"
                @click="toggleEmailPermission"
              >
                <span
                  class="pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  :class="isEmailAllowed ? 'translate-x-4' : 'translate-x-0.5'"
                />
              </button>
            </div>

            <div
              v-if="isNotificationLoading"
              class="px-4 py-4 text-sm text-on-surface-variant"
            >
              Memuat notifikasi...
            </div>

            <div
              v-else-if="notificationError"
              class="px-4 py-4 text-sm text-red-600"
            >
              {{ notificationError }}
            </div>

            <div
              v-else-if="notifications.length === 0"
              class="px-4 py-6 text-center text-sm text-on-surface-variant"
            >
              Belum ada notifikasi.
            </div>

            <ul v-else class="max-h-[420px] overflow-y-auto">
              <li
                v-for="item in notifications"
                :key="`${item.source ?? 'transaction'}-${item.id}`"
                class="border-b border-outline-variant/10 last:border-b-0"
              >
                <button
                  class="w-full px-4 py-3 text-left transition-colors hover:bg-surface-container-lowest"
                  type="button"
                  @click="onNotificationClick(item)"
                >
                  <div class="flex items-start justify-between gap-3">
                    <div class="min-w-0">
                      <span
                        class="inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                        :class="sourceBadgeClass(item.source)"
                      >
                        {{ sourceLabel(item.source) }}
                      </span>
                      <p
                        class="mt-1 text-sm font-semibold text-on-surface"
                        :class="{ 'opacity-70': item.is_read }"
                      >
                        {{ item.title }}
                      </p>
                      <p
                        v-if="(item.purchase_count ?? 0) > 1"
                        class="mt-1 text-[11px] font-semibold text-primary"
                      >
                        Total pembelian: x{{ item.purchase_count }}
                      </p>
                      <p
                        v-if="
                          item.source === 'donation' &&
                          (item.donation_count ?? 0) > 1
                        "
                        class="mt-1 text-[11px] font-semibold text-primary"
                      >
                        Total donasi hari ini: x{{ item.donation_count }}
                      </p>
                    </div>
                    <span
                      class="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                      :class="statusBadgeClass(item.status)"
                    >
                      {{ item.status || "info" }}
                    </span>
                  </div>
                  <p class="mt-1 text-xs text-on-surface-variant">
                    {{ item.message }}
                  </p>
                  <p
                    v-if="item.source === 'donation' && item.donor_display_name"
                    class="mt-1 text-xs font-medium text-on-surface"
                  >
                    Donor: {{ item.donor_display_name }}
                  </p>
                  <p
                    v-if="
                      item.source === 'donation' &&
                      item.amount !== null &&
                      item.amount !== undefined
                    "
                    class="mt-1 text-xs font-medium text-on-surface"
                  >
                    Amount: {{ formatCurrency(item.amount) }}
                  </p>
                  <p
                    v-if="item.source !== 'donation' && item.product_name"
                    class="mt-1 text-xs font-medium text-on-surface"
                  >
                    Product: {{ item.product_name }}
                  </p>
                  <p class="mt-1 text-[11px] text-on-surface-variant/80">
                    {{ formatDateTime(item.created_at) }}
                  </p>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <!-- User Info -->
        <div
          class="flex cursor-pointer items-center gap-3 pl-4 border-l border-outline-variant/30 transition-colors hover:bg-surface-container-lowest rounded-full px-2"
          @click="goToProfile"
        >
          <div class="text-right hidden sm:block">
            <p class="text-sm font-bold leading-tight">{{ displayName }}</p>
          </div>
          <AppAvatar :src="avatarSrc" :name="displayName" clickable />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {
  donationNotificationsApi,
  emailPermissionApi,
  notificationsApi,
  type NotificationRecord,
  profileApi,
} from "@/api";
import { useDashboardStore } from "@/stores/dashboard";
import { useAuthStore } from "@/stores/auth";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import AppBadge from "@/components/common/AppBadge.vue";
import AppAvatar from "@/components/common/AppAvatar.vue";

interface Props {
  pageTitle?: string;
  showLiveBadge?: boolean;
  searchPlaceholder?: string;
}

withDefaults(defineProps<Props>(), {
  pageTitle: "Overview",
  showLiveBadge: false,
  searchPlaceholder: "Search...",
});

const router = useRouter();
const store = useDashboardStore();
const authStore = useAuthStore();

const profileName = ref("");
const profilePhotoUrl = ref("");

const isNotificationOpen = ref(false);
const isNotificationLoading = ref(false);
const notificationError = ref("");
const transactionNotifications = ref<NotificationRecord[]>([]);
const donationNotifications = ref<NotificationRecord[]>([]);
const unreadTransactionCount = ref(0);
const unreadDonationCount = ref(0);
const notificationDropdownRef = ref<HTMLElement | null>(null);
const isEmailAllowed = ref(false);
const isEmailPermissionLoading = ref(false);

const currentUserID = computed(() => authStore.user?.id?.trim() ?? "");
const notifications = computed<NotificationRecord[]>(() => {
  return [
    ...transactionNotifications.value,
    ...donationNotifications.value,
  ].sort((left, right) => {
    const leftTime = new Date(left.created_at).getTime();
    const rightTime = new Date(right.created_at).getTime();
    return rightTime - leftTime;
  });
});
const unreadCount = computed(() => {
  return unreadTransactionCount.value + unreadDonationCount.value;
});

const displayName = computed(() => {
  return profileName.value.trim() !== "" ? profileName.value.trim() : "";
});

const avatarSrc = computed(() => {
  return profilePhotoUrl.value.trim() !== "" ? profilePhotoUrl.value : "";
});

async function refreshNotifications(): Promise<void> {
  const userID = currentUserID.value;
  if (userID === "") {
    transactionNotifications.value = [];
    donationNotifications.value = [];
    unreadTransactionCount.value = 0;
    unreadDonationCount.value = 0;
    notificationError.value = "";
    return;
  }

  isNotificationLoading.value = true;
  notificationError.value = "";

  const [transactionResult, donationResult] = await Promise.allSettled([
    notificationsApi.getByUser(userID, {
      limit: 12,
      offset: 0,
    }),
    donationNotificationsApi.getByUser(userID, {
      limit: 12,
      offset: 0,
    }),
  ]);

  const errors: string[] = [];

  if (transactionResult.status === "fulfilled") {
    transactionNotifications.value = (
      transactionResult.value.notifications ?? []
    ).map((item) => ({
      ...item,
      source: "transaction",
    }));
    unreadTransactionCount.value = Number(
      transactionResult.value.unread_count ?? 0,
    );
  } else {
    transactionNotifications.value = [];
    unreadTransactionCount.value = 0;
    errors.push(
      transactionResult.reason instanceof Error
        ? transactionResult.reason.message
        : "Gagal memuat notifikasi transaksi.",
    );
  }

  if (donationResult.status === "fulfilled") {
    donationNotifications.value = (
      donationResult.value.notifications ?? []
    ).filter((item) => item.status.trim().toLowerCase() === "success");
    unreadDonationCount.value = Number(donationResult.value.unread_count ?? 0);
  } else {
    donationNotifications.value = [];
    unreadDonationCount.value = 0;
    errors.push(
      donationResult.reason instanceof Error
        ? donationResult.reason.message
        : "Gagal memuat notifikasi donasi.",
    );
  }

  if (
    errors.length > 0 &&
    transactionResult.status === "rejected" &&
    donationResult.status === "rejected"
  ) {
    notificationError.value = errors.join(" ");
  } else {
    notificationError.value = "";
  }
  isNotificationLoading.value = false;
}

async function loadProfileData(): Promise<void> {
  try {
    const profileResponse = await profileApi.getMyProfile();
    profileName.value = profileResponse.user.full_name ?? "";
    profilePhotoUrl.value = profileResponse.profile.profile_photo ?? "";
  } catch (error) {
    console.error("Failed to load profile data:", error);
  }
}

async function loadEmailPermission(): Promise<void> {
  try {
    isEmailPermissionLoading.value = true;
    const result = await emailPermissionApi.get();
    isEmailAllowed.value = result.is_allowed_email;
  } catch (error) {
    console.error("Failed to load email permission:", error);
  } finally {
    isEmailPermissionLoading.value = false;
  }
}

async function toggleEmailPermission(): Promise<void> {
  if (isEmailPermissionLoading.value) return;

  const newValue = !isEmailAllowed.value;
  isEmailPermissionLoading.value = true;
  try {
    const result = await emailPermissionApi.update(newValue);
    isEmailAllowed.value = result.is_allowed_email;
  } catch (error) {
    console.error("Failed to update email permission:", error);
  } finally {
    isEmailPermissionLoading.value = false;
  }
}

async function onNotificationClick(_item: NotificationRecord): Promise<void> {
  isNotificationOpen.value = false;
}

async function markAllNotificationsAsRead(): Promise<void> {
  const userID = currentUserID.value;
  if (userID === "") {
    return;
  }

  const [transactionResult, donationResult] = await Promise.allSettled([
    notificationsApi.markAllAsRead(userID),
    donationNotificationsApi.markAllAsRead(userID),
  ]);

  const errors: string[] = [];

  if (transactionResult.status === "fulfilled") {
    unreadTransactionCount.value = 0;
    transactionNotifications.value = transactionNotifications.value.map(
      (item) => ({
        ...item,
        is_read: true,
      }),
    );
  } else {
    errors.push(
      transactionResult.reason instanceof Error
        ? transactionResult.reason.message
        : "Gagal menandai notifikasi transaksi sebagai dibaca.",
    );
  }

  if (donationResult.status === "fulfilled") {
    unreadDonationCount.value = 0;
    donationNotifications.value = donationNotifications.value.map((item) => ({
      ...item,
      is_read: true,
    }));
  } else {
    errors.push(
      donationResult.reason instanceof Error
        ? donationResult.reason.message
        : "Gagal menandai notifikasi donasi sebagai dibaca.",
    );
  }

  notificationError.value = errors.join(" ");
}

async function toggleNotifications(): Promise<void> {
  isNotificationOpen.value = !isNotificationOpen.value;
  if (isNotificationOpen.value) {
    await markAllNotificationsAsRead();
    await refreshNotifications();
  }
}

function statusBadgeClass(status: string): string {
  const normalizedStatus = status.trim().toLowerCase();
  if (normalizedStatus === "success") {
    return "bg-emerald-100 text-emerald-700";
  }
  if (normalizedStatus === "pending") {
    return "bg-amber-100 text-amber-700";
  }
  return "bg-slate-100 text-slate-700";
}

function sourceBadgeClass(source: NotificationRecord["source"]): string {
  if (source === "donation") {
    return "bg-fuchsia-100 text-fuchsia-700";
  }
  return "bg-cyan-100 text-cyan-700";
}

function sourceLabel(source: NotificationRecord["source"]): string {
  if (source === "donation") {
    return "Donation";
  }
  return "Transaction";
}

function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function handleDocumentClick(event: MouseEvent): void {
  if (!isNotificationOpen.value) {
    return;
  }

  const target = event.target as Node | null;
  if (!target) {
    return;
  }

  if (notificationDropdownRef.value?.contains(target)) {
    return;
  }

  isNotificationOpen.value = false;
}

watch(
  () => currentUserID.value,
  () => {
    void refreshNotifications();
  },
  { immediate: true },
);

onMounted(() => {
  document.addEventListener("click", handleDocumentClick);
  loadProfileData();
  loadEmailPermission();
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleDocumentClick);
});

// Navigate to profile page when avatar is clicked
const goToProfile = () => {
  router.push("/dashboard/profile");
};
</script>
