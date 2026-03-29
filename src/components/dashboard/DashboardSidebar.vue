<template>
  <aside
    class="dashboard-sidebar z-40 bg-surface-container-low hidden md:flex flex-col p-6 bg-gradient-to-r from-transparent to-surface"
  >
    <!-- Brand Identity -->
    <div class="mb-10 px-4 flex-shrink-0">
      <router-link
        to="/"
        class="text-xl font-bold text-primary tracking-tighter font-headline"
        >Angpaoku</router-link
      >
      <p
        class="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 font-bold mt-1"
      >
        Creator Portal
      </p>
    </div>

    <!-- Navigation (scrollable if needed) -->
    <nav class="flex-1 space-y-1 overflow-y-auto custom-scrollbar min-h-0">
      <router-link
        v-for="item in navItems"
        :key="item.route"
        :to="item.route"
        :class="[
          'flex items-center gap-3 px-4 py-3 font-headline text-sm transition-all',
          isActive(item.route)
            ? 'bg-white text-primary rounded-xl shadow-sm font-bold scale-[1.02]'
            : 'text-on-surface/60 hover:bg-white/50 hover:translate-x-1',
        ]"
      >
        <span class="material-symbols-outlined">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- Bottom Actions (always pinned at bottom) -->
    <div class="pt-6 flex flex-col gap-4 flex-shrink-0">
      <button
        class="bg-primary text-white rounded-full py-3 px-6 text-sm font-bold shadow-angpao-lg hover:opacity-90 transition-opacity"
      >
        Upgrade Plan
      </button>
      <div class="space-y-1 border-t border-outline-variant/20 pt-4">
        <a
          href="#"
          class="flex items-center gap-3 text-on-surface/60 px-4 py-2 text-xs hover:text-primary transition-colors"
        >
          <span class="material-symbols-outlined text-lg">help</span>
          <span>Help Center</span>
        </a>
        <a
          href="#"
          class="flex items-center gap-3 text-on-surface/60 px-4 py-2 text-xs hover:text-primary transition-colors"
        >
          <span class="material-symbols-outlined text-lg">logout</span>
          <span>Logout</span>
        </a>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useDashboardStore } from "@/stores/dashboard";

const route = useRoute();
const store = useDashboardStore();
const navItems = store.navItems;

function isActive(itemRoute: string): boolean {
  // Exact match for dashboard root, startsWith for children
  if (itemRoute === "/dashboard") return route.path === "/dashboard";
  return route.path.startsWith(itemRoute);
}
</script>

<style scoped>
.dashboard-sidebar {
  width: 288px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* no scroll on sidebar itself */
}
</style>
