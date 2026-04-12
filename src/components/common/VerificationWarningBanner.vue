<template>
  <div
    v-if="authStore.user && !authStore.user.is_verified"
    class="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3"
  >
    <span
      class="material-symbols-outlined mt-0.5 shrink-0 text-amber-500"
      style="font-variation-settings: &quot;FILL&quot; 1"
      >warning</span
    >
    <div class="min-w-0 flex-1">
      <p class="text-sm font-semibold text-amber-800">
        Akun kamu belum terverifikasi
      </p>
      <p class="mt-0.5 text-xs text-amber-700">
        Beberapa fitur dibatasi sebelum verifikasi selesai. Selesaikan proses
        verifikasi untuk mengakses semua fitur.
      </p>
    </div>
    <router-link
      :to="`/get-verified/${authStore.user.id}`"
      class="shrink-0 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-amber-600"
    >
      Verifikasi Sekarang
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>
