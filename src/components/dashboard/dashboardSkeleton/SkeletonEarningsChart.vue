<template>
  <div class="bg-surface-container-lowest p-8 rounded-2xl shadow-angpao">
    <!-- Header -->
    <div class="flex justify-between items-center mb-10">
      <div class="space-y-2">
        <div
          class="h-6 w-48 bg-surface-container-low rounded animate-pulse"
        ></div>
        <div
          class="h-4 w-60 bg-surface-container-low rounded animate-pulse"
        ></div>
      </div>
      <div class="flex gap-2 bg-surface-container-low p-1 rounded-lg">
        <div
          class="px-4 py-1.5 w-12 h-8 bg-white rounded-md animate-pulse"
        ></div>
        <div
          class="px-4 py-1.5 w-12 h-8 bg-surface-container-low rounded animate-pulse"
        ></div>
        <div
          class="px-4 py-1.5 w-12 h-8 bg-surface-container-low rounded animate-pulse"
        ></div>
      </div>
    </div>

    <!-- Skeleton bars -->
    <div class="h-64 flex items-end justify-between gap-2">
      <div
        v-for="i in 12"
        :key="i"
        class="flex-1 bg-surface-container-low rounded-t animate-pulse"
        :style="{ height: Math.random() * 70 + 20 + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
