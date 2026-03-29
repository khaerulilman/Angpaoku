<template>
  <div class="min-h-screen bg-surface flex items-center justify-center px-8">
    <div class="text-center space-y-8 max-w-lg">
      <div class="w-24 h-24 rounded-full bg-primary-fixed mx-auto flex items-center justify-center">
        <span class="material-symbols-outlined text-primary text-5xl">explore_off</span>
      </div>
      <div>
        <h1 class="text-6xl font-black font-headline text-on-surface mb-4 tracking-tighter">404</h1>
        <p class="text-xl text-on-surface-variant font-medium">
          This page doesn't exist or has been moved.
        </p>
      </div>
      <div class="flex flex-wrap justify-center gap-4">
        <router-link
          to="/"
          class="btn-gradient text-white px-8 py-3 rounded-full font-bold shadow-angpao-lg hover:opacity-90 transition-all active:scale-95 inline-flex items-center gap-2"
        >
          <span class="material-symbols-outlined">home</span>
          Go Home
        </router-link>
        <router-link
          to="/dashboard"
          class="bg-surface-container-highest text-on-surface px-8 py-3 rounded-full font-bold hover:bg-surface-container-high transition-all active:scale-95 inline-flex items-center gap-2"
        >
          <span class="material-symbols-outlined">dashboard</span>
          Dashboard
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 404 Page — no logic needed
</script>
