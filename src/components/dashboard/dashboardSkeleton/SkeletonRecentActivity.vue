<template>
  <div
    class="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] h-full"
  >
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div
        class="h-6 w-32 bg-surface-container-low rounded animate-pulse"
      ></div>
      <div
        class="h-4 w-16 bg-surface-container-low rounded animate-pulse"
      ></div>
    </div>

    <!-- Activity Items Skeleton -->
    <div class="space-y-6">
      <div v-for="i in 5" :key="i" class="flex items-center gap-4">
        <div
          class="w-10 h-10 rounded-full bg-surface-container-low animate-pulse flex-shrink-0"
        ></div>
        <div class="flex-1 space-y-2 min-w-0">
          <div
            class="h-4 w-40 bg-surface-container-low rounded animate-pulse"
          ></div>
          <div
            class="h-3 w-32 bg-surface-container-low rounded animate-pulse"
          ></div>
        </div>
        <div class="space-y-2 text-right flex-shrink-0">
          <div
            class="h-4 w-20 bg-surface-container-low rounded animate-pulse"
          ></div>
          <div
            class="h-3 w-16 bg-surface-container-low rounded animate-pulse"
          ></div>
        </div>
      </div>
    </div>

    <!-- Weekly Tip Skeleton -->
    <div class="mt-8">
      <div
        class="w-full h-32 bg-surface-container-low rounded-xl animate-pulse"
      ></div>
      <div class="mt-4 p-4 bg-surface-container-low rounded-xl space-y-2">
        <div
          class="h-4 w-24 bg-surface-container/60 rounded animate-pulse"
        ></div>
        <div class="space-y-1">
          <div
            class="h-3 w-full bg-surface-container/60 rounded animate-pulse"
          ></div>
          <div
            class="h-3 w-5/6 bg-surface-container/60 rounded animate-pulse"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
