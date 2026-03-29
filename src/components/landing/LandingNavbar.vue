<template>
  <nav class="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-2xl shadow-angpao h-20">
    <div class="flex justify-between items-center h-20 px-8 max-w-[1440px] mx-auto">
      <!-- Brand -->
      <router-link to="/" class="text-2xl font-black tracking-tighter text-on-surface font-headline">
        Angpaoku
      </router-link>

      <!-- Nav Links -->
      <div class="hidden md:flex items-center gap-8 font-headline font-medium">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          :class="[
            'transition-all duration-300',
            link.active
              ? 'text-primary font-bold border-b-2 border-primary'
              : 'text-on-surface/70 hover:text-primary',
          ]"
        >
          {{ link.label }}
        </a>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <router-link
          to="/dashboard"
          class="hidden md:block px-6 py-2 text-primary font-bold hover:opacity-80 transition-all active:scale-95"
        >
          Login
        </router-link>
        <AppButton variant="brand" size="md">Get Started</AppButton>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import AppButton from '@/components/common/AppButton.vue'

const navLinks = [
  { label: 'Features', href: '#features', active: true },
  { label: 'Showcase', href: '#showcase', active: false },
  { label: 'Pricing', href: '#pricing', active: false },
  { label: 'Support', href: '#support', active: false },
]
</script>
