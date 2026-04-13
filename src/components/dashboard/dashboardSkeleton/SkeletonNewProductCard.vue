<template>
  <AppCard
    class="p-6 flex flex-col justify-center items-center text-center"
    :shadow="'sm'"
  >
    <div
      class="w-12 h-12 rounded-full bg-surface-container-low mb-3 animate-pulse"
    ></div>
    <div
      class="h-4 w-24 bg-surface-container-low rounded animate-pulse mb-2"
    ></div>
    <div class="h-3 w-32 bg-surface-container-low rounded animate-pulse"></div>
  </AppCard>
</template>

<script setup lang="ts">
import AppCard from "@/components/common/AppCard.vue";
</script>
