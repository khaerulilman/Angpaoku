<template>
  <div class="min-h-screen bg-surface">
    <!-- Landing Navbar -->
    <LandingNavbar />

    <!-- Page Content -->
    <router-view />

    <!-- Landing Footer -->
    <footer class="w-full py-12 px-8 pt-12 mt-20 bg-surface-container-low font-body text-xs tracking-wide">
      <div class="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto border-t-4 border-surface-container-low pt-12">
        <div class="mb-8 md:mb-0 space-y-4 text-center md:text-left">
          <div class="font-bold text-on-surface text-xl font-headline tracking-tighter">Angpaoku</div>
          <p class="text-on-surface/50 max-w-xs">© 2024 Angpaoku. Designed for the high-end creator economy.</p>
        </div>

        <div class="flex flex-wrap justify-center gap-8 mb-8 md:mb-0">
          <a href="#" class="text-on-surface/50 hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" class="text-on-surface/50 hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" class="text-on-surface/50 hover:text-primary transition-colors">Cookie Policy</a>
          <a href="#" class="text-on-surface/50 hover:text-primary transition-colors">Contact Us</a>
        </div>

        <div class="flex gap-4">
          <a
            v-for="icon in socialIcons"
            :key="icon"
            href="#"
            class="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:text-primary transition-colors shadow-sm"
          >
            <span class="material-symbols-outlined">{{ icon }}</span>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import LandingNavbar from '@/components/landing/LandingNavbar.vue'

const socialIcons = ['public', 'play_circle', 'campaign']
</script>
