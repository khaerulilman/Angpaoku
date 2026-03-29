<template>
  <div class="bg-surface-container-lowest p-8 rounded-2xl shadow-angpao">
    <!-- Header -->
    <div class="flex justify-between items-center mb-10">
      <div>
        <h2 class="text-xl font-bold">Earnings Performance</h2>
        <p class="text-sm text-on-surface-variant">Your revenue flow over the last 30 days</p>
      </div>
      <div class="flex gap-2 bg-surface-container-low p-1 rounded-lg">
        <button
          v-for="period in ['Week', 'Month']"
          :key="period"
          :class="[
            'px-4 py-1.5 text-xs font-medium transition-colors',
            activePeriod === period
              ? 'bg-white rounded-md shadow-sm font-bold'
              : 'text-on-surface-variant hover:text-on-surface',
          ]"
          @click="activePeriod = period"
        >
          {{ period }}
        </button>
      </div>
    </div>

    <!-- SVG Chart -->
    <div class="h-64 w-full relative">
      <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 200">
        <defs>
          <linearGradient id="chart-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:rgba(187,21,44,0.1);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgba(187,21,44,0);stop-opacity:1" />
          </linearGradient>
        </defs>
        <path
          d="M0,150 Q50,140 100,160 T200,100 T300,120 T400,60 T500,80 T600,40 T700,50 T800,20 L800,200 L0,200 Z"
          fill="url(#chart-gradient)"
        />
        <path
          d="M0,150 Q50,140 100,160 T200,100 T300,120 T400,60 T500,80 T600,40 T700,50 T800,20"
          fill="none"
          stroke="#b7102a"
          stroke-linecap="round"
          stroke-width="3"
        />
        <circle cx="600" cy="40" r="6" fill="#b7102a" stroke="white" stroke-width="3" />
      </svg>

      <!-- Chart Labels -->
      <div class="absolute bottom-0 left-0 w-full flex justify-between text-[10px] text-on-surface-variant/60 font-medium px-2 transform translate-y-6">
        <span>01 SEP</span>
        <span>08 SEP</span>
        <span>15 SEP</span>
        <span>22 SEP</span>
        <span>30 SEP</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activePeriod = ref('Week')
</script>
