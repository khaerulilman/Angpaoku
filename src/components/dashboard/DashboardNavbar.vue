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
        <!-- Notifications -->
        <button
          class="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
        >
          <span class="material-symbols-outlined">notifications</span>
        </button>

        <!-- User Info -->
        <div
          class="flex cursor-pointer items-center gap-3 pl-4 border-l border-outline-variant/30 transition-colors hover:bg-surface-container-lowest rounded-full px-2"
          @click="goToProfile"
        >
          <div class="text-right hidden sm:block">
            <p class="text-sm font-bold leading-tight">{{ user.name }}</p>
            <p class="text-[10px] text-on-surface-variant font-medium">
              {{ user.plan === "pro" ? "Pro Creator" : "Free Creator" }}
            </p>
          </div>
          <AppAvatar :src="user.avatar" :name="user.name" clickable />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useDashboardStore } from "@/stores/dashboard";
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
const user = store.user;

// Navigate to profile page when avatar is clicked
const goToProfile = () => {
  router.push("/dashboard/profile");
};
</script>
