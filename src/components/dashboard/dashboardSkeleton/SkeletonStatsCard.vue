<template>
  <AppCard class="p-6" :shadow="'sm'">
    <div class="flex justify-between items-start mb-4">
      <div
        class="w-12 h-12 rounded-lg bg-surface-container-low animate-pulse"
      ></div>
      <div
        class="w-16 h-6 rounded-full bg-surface-container-low animate-pulse"
      ></div>
    </div>

    <p
      class="text-on-surface-variant text-xs font-medium uppercase tracking-widest mb-3 w-24 h-3 bg-surface-container-low rounded animate-pulse"
    ></p>
    <div class="w-32 h-8 bg-surface-container-low rounded animate-pulse"></div>
  </AppCard>
</template>

<script setup lang="ts">
import AppCard from "@/components/common/AppCard.vue";
</script>
