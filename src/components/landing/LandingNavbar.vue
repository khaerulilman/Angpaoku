<template>
  <nav
    class="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-2xl shadow-angpao h-20"
  >
    <div
      class="flex justify-between items-center h-20 px-8 max-w-[1440px] mx-auto"
    >
      <!-- Brand -->
      <router-link
        to="/"
        class="text-2xl font-black tracking-tighter text-on-surface font-headline"
      >
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
        <template v-if="authStore.isAuthenticated">
          <!-- Profile Section - Clickable to Dashboard -->
          <router-link
            to="/dashboard"
            class="hidden md:flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
          >
            <AppAvatar
              :src="`https://ui-avatars.com/api/?name=${displayName}`"
              size="sm"
            />
            <div>
              <p class="text-sm font-bold text-on-surface">
                {{ displayName }}
              </p>
            </div>
          </router-link>
          <button
            @click="handleLogout"
            class="px-6 py-2 text-primary font-bold hover:opacity-80 transition-all active:scale-95"
          >
            Logout
          </button>
        </template>
        <template v-else>
          <router-link
            to="/login"
            class="hidden md:block px-6 py-2 text-primary font-bold hover:opacity-80 transition-all active:scale-95"
          >
            Login
          </router-link>
          <AppButton variant="brand" size="md">Get Started</AppButton>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import AppButton from "@/components/common/AppButton.vue";
import AppAvatar from "@/components/common/AppAvatar.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();

const displayName = computed(() => {
  const fullName = authStore.user?.full_name?.trim() ?? "";
  if (fullName !== "") {
    return fullName;
  }

  return authStore.user?.username ?? "";
});

const navLinks = [
  { label: "Features", href: "#features", active: true },
  { label: "Showcase", href: "#showcase", active: false },
  { label: "Pricing", href: "#pricing", active: false },
  { label: "Support", href: "#support", active: false },
];

async function handleLogout() {
  await authStore.logout();
  router.push("/");
}
</script>
