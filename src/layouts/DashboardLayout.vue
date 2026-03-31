<template>
  <div class="min-h-screen w-full bg-surface">
    <!-- Sidebar -->
    <DashboardSidebar />

    <div class="flex h-screen min-w-0 flex-col overflow-y-auto bg-surface md:ml-[288px]">
      <!-- Main Content -->
      <main class="min-w-0 flex-1">
        <router-view />
      </main>

      <!-- Dashboard Footer -->
      <footer class="shrink-0 border-t border-outline-variant/10 px-8 py-8">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p class="font-body text-xs tracking-wide text-on-surface/50">
            &copy; 2024 Angpaoku. Designed for the high-end creator economy.
          </p>
          <div class="flex gap-8">
            <a
              href="#"
              class="text-on-surface/50 hover:text-primary transition-colors text-xs"
              >Terms of Service</a
            >
            <a
              href="#"
              class="text-on-surface/50 hover:text-primary transition-colors text-xs"
              >Privacy Policy</a
            >
            <a
              href="#"
              class="text-on-surface/50 hover:text-primary transition-colors text-xs"
              >Contact Us</a
            >
          </div>
        </div>
      </footer>
    </div>

    <!-- Mobile FAB -->
    <button
      class="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-angpao-lg hover:scale-110 active:scale-95 transition-all lg:hidden z-50"
    >
      <span class="material-symbols-outlined">add</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import DashboardSidebar from "@/components/dashboard/DashboardSidebar.vue";
</script>
