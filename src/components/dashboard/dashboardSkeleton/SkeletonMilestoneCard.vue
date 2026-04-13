<template>
  <AppCard class="p-6" :shadow="'sm'">
    <div class="flex justify-between items-start mb-4">
      <div class="space-y-3 flex-1">
        <div
          class="h-4 w-32 bg-surface-container-low rounded animate-pulse"
        ></div>
        <div
          class="h-8 w-48 bg-surface-container-low rounded animate-pulse"
        ></div>
      </div>
      <div
        class="w-10 h-10 rounded-full bg-surface-container-low animate-pulse"
      ></div>
    </div>

    <div class="space-y-2 mt-4">
      <div
        class="h-3 w-64 bg-surface-container-low rounded animate-pulse"
      ></div>
      <div
        class="h-3 w-48 bg-surface-container-low rounded animate-pulse"
      ></div>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import AppCard from "@/components/common/AppCard.vue";
</script>
