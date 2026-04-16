<template>
  <AppCard class="p-6 relative overflow-hidden" :shadow="'sm'">
    <!-- Optional glow effect -->
    <div
      v-if="data.hasGlow"
      class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"
    ></div>

    <div class="flex justify-between items-start mb-4 relative z-10">
      <div
        :class="[
          'w-12 h-12 rounded-lg flex items-center justify-center',
          data.iconBgClass,
        ]"
      >
        <span class="material-symbols-outlined" :class="data.iconTextClass">{{
          data.icon
        }}</span>
      </div>

      <!-- Badge or Live indicator -->
      <template v-if="data.isLive">
        <div class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span class="text-primary text-[10px] font-bold uppercase"
            >Live Now</span
          >
        </div>
      </template>
      <template v-else-if="data.badge">
        <span
          :class="[
            'text-[10px] font-bold px-2 py-1 rounded-full',
            data.badgeClass,
          ]"
        >
          {{ data.badge }}
        </span>
      </template>
    </div>

    <p
      class="text-on-surface-variant text-xs font-medium uppercase tracking-widest mb-1 relative z-10"
    >
      {{ data.label }}
    </p>
    <h3 class="text-2xl font-bold relative z-10">{{ data.value }}</h3>
  </AppCard>
</template>

<script setup lang="ts">
import AppCard from "@/components/common/AppCard.vue";
import type { StatCardData } from "@/types";

defineProps<{
  data: StatCardData;
}>();
</script>
