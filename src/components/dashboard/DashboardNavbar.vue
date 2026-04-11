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
                :key="item.id"
                class="border-b border-outline-variant/10 last:border-b-0"
              >
                <button
                  class="w-full px-4 py-3 text-left transition-colors hover:bg-surface-container-lowest"
                  type="button"
                  @click="onNotificationClick(item)"
                >
                  <div class="flex items-start justify-between gap-3">
                    <div class="min-w-0">
                      <p
                        class="text-sm font-semibold text-on-surface"
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
                    v-if="item.product_name"
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
import { notificationsApi, type NotificationRecord, profileApi } from "@/api";
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
const notifications = ref<NotificationRecord[]>([]);
const unreadCount = ref(0);
const notificationDropdownRef = ref<HTMLElement | null>(null);

const currentUserID = computed(() => authStore.user?.id?.trim() ?? "");

const displayName = computed(() => {
  return profileName.value.trim() !== "" ? profileName.value.trim() : "";
});

const avatarSrc = computed(() => {
  return profilePhotoUrl.value.trim() !== "" ? profilePhotoUrl.value : "";
});

async function refreshNotifications(): Promise<void> {
  const userID = currentUserID.value;
  if (userID === "") {
    notifications.value = [];
    unreadCount.value = 0;
    notificationError.value = "";
    return;
  }

  isNotificationLoading.value = true;
  notificationError.value = "";

  try {
    const result = await notificationsApi.getByUser(userID, {
      limit: 12,
      offset: 0,
    });
    notifications.value = result.notifications ?? [];
    unreadCount.value = Number(result.unread_count ?? 0);
  } catch (error) {
    notificationError.value =
      error instanceof Error ? error.message : "Gagal memuat notifikasi.";
  } finally {
    isNotificationLoading.value = false;
  }
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

async function onNotificationClick(_item: NotificationRecord): Promise<void> {
  isNotificationOpen.value = false;
}

async function markAllNotificationsAsRead(): Promise<void> {
  const userID = currentUserID.value;
  if (userID === "") {
    return;
  }

  try {
    await notificationsApi.markAllAsRead(userID);
    unreadCount.value = 0;
    notifications.value = notifications.value.map((item) => ({
      ...item,
      is_read: true,
    }));
  } catch (error) {
    notificationError.value =
      error instanceof Error
        ? error.message
        : "Gagal menandai semua notifikasi sebagai dibaca.";
  }
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
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleDocumentClick);
});

// Navigate to profile page when avatar is clicked
const goToProfile = () => {
  router.push("/dashboard/profile");
};
</script>
