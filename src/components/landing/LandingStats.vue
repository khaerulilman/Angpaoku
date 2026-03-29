<template>
  <section class="bg-surface-container-low py-24 mb-32">
    <div class="max-w-[1440px] mx-auto px-8">
      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        <div v-for="stat in stats" :key="stat.label">
          <div class="text-4xl font-extrabold text-primary font-headline mb-2">{{ stat.value }}</div>
          <p class="text-on-surface-variant font-medium">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { LandingStat } from '@/types'

const stats: LandingStat[] = [
  { value: '10K+', label: 'Active Creators' },
  { value: '1M+', label: 'Transactions' },
  { value: '99.9%', label: 'Uptime Guarantee' },
  { value: '$0', label: 'Monthly Setup Fee' },
]
</script>
