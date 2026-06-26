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
          @click="activeNav = link.label"
          :class="[
            'pb-1 border-b-2 transition-all duration-300',
            activeNav === link.label
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-on-surface/70 hover:text-primary hover:border-primary/40',
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
            class="hidden md:flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 active:scale-95"
          >
            <AppAvatar :src="avatarSrc" size="sm" />
            <div>
              <p class="text-sm font-bold text-on-surface">
                {{ displayName }}
              </p>
            </div>
          </router-link>
          <button
            @click="handleLogout"
            class="px-6 py-2 rounded-lg text-primary font-bold transition-all duration-200 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 active:scale-95"
          >
            Logout
          </button>
        </template>
        <template v-else>
          <router-link
            to="/login"
            class="hidden md:block px-6 py-2 rounded-lg text-primary font-bold transition-all duration-200 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 active:scale-95"
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
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import AppButton from "@/components/common/AppButton.vue";
import AppAvatar from "@/components/common/AppAvatar.vue";
import { useAuthStore } from "@/stores/auth";
import { profileApi } from "@/api";

const authStore = useAuthStore();
const router = useRouter();

const profileName = ref("");
const profilePhotoUrl = ref("");

const displayName = computed(() => {
  if (profileName.value.trim() !== "") {
    return profileName.value.trim();
  }

  const fullName = authStore.user?.full_name?.trim() ?? "";
  if (fullName !== "") {
    return fullName;
  }

  return authStore.user?.username ?? "";
});

const avatarSrc = computed(() => {
  if (profilePhotoUrl.value.trim() !== "") {
    return profilePhotoUrl.value;
  }

  return `https://ui-avatars.com/api/?name=${displayName.value}`;
});

const activeNav = ref("Features");
const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Pricing", href: "#pricing" },
  { label: "Support", href: "#support" },
];

async function loadProfileData(): Promise<void> {
  try {
    const profileResponse = await profileApi.getMyProfile();
    profileName.value = profileResponse.user.full_name ?? "";
    profilePhotoUrl.value = profileResponse.profile.profile_photo ?? "";
  } catch (error) {
    console.error("Failed to load profile data:", error);
  }
}

async function handleLogout() {
  await authStore.logout();
  router.push("/");
}

onMounted(() => {
  if (authStore.isAuthenticated) {
    loadProfileData();
  }
});
</script>
