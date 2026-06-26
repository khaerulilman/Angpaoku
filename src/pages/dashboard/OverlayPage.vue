<template>
  <div class="flex flex-col gap-6 pb-8">
    <!-- Page Header -->
    <div class="space-y-2">
      <h1 class="text-3xl font-bold text-on-surface font-headline">
        Donation Overlay
      </h1>
      <p class="text-on-surface/70">
        Generate your OBS overlay URL for live streaming.
      </p>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Overlay URL Card -->
        <div
          class="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/20"
        >
          <h2 class="text-lg font-bold text-on-surface mb-4">Overlay URL</h2>
          <div class="space-y-3">
            <div class="flex gap-2">
              <div
                class="flex-1 bg-surface rounded-xl px-4 py-3 border border-outline-variant/30 flex items-center"
              >
                <code class="text-sm text-on-surface/90 break-all">
                  {{ overlayURL }}
                </code>
              </div>
              <button
                @click="copyURL"
                class="px-6 py-3 bg-primary text-on-primary rounded-xl font-semibold hover:shadow-lg transition-all active:scale-95"
              >
                Copy URL
              </button>
            </div>
            <button
              @click="openOverlay"
              class="w-full px-4 py-3 border border-primary text-primary rounded-xl font-semibold hover:bg-primary/10 transition-all"
            >
              Open Overlay
            </button>
          </div>
        </div>

        <!-- OBS Settings Card -->
        <div
          class="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/20"
        >
          <h2 class="text-lg font-bold text-on-surface mb-4">OBS Settings</h2>
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-surface rounded-xl p-4">
                <p
                  class="text-xs uppercase tracking-wider text-on-surface/60 font-bold mb-2"
                >
                  Width
                </p>
                <p class="text-2xl font-bold text-on-surface">1920</p>
              </div>
              <div class="bg-surface rounded-xl p-4">
                <p
                  class="text-xs uppercase tracking-wider text-on-surface/60 font-bold mb-2"
                >
                  Height
                </p>
                <p class="text-2xl font-bold text-on-surface">1080</p>
              </div>
            </div>
            <div class="space-y-3 pt-2 border-t border-outline-variant/20">
              <div class="flex justify-between items-center">
                <span class="text-on-surface/80">FPS</span>
                <span class="font-semibold text-on-surface">60</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-on-surface/80">Background</span>
                <span class="font-semibold text-on-surface">Transparent</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-on-surface/80"
                  >Shutdown when not visible</span
                >
                <span class="font-semibold text-on-surface">OFF</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Guide -->
        <div
          class="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/20"
        >
          <h2 class="text-lg font-bold text-on-surface mb-4">How to Use</h2>
          <ol class="space-y-3">
            <li v-for="(step, idx) in quickGuide" :key="idx" class="flex gap-3">
              <span
                class="flex-shrink-0 w-8 h-8 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold text-sm"
              >
                {{ idx + 1 }}
              </span>
              <span class="text-on-surface/90 pt-1">{{ step }}</span>
            </li>
          </ol>
        </div>
      </div>

      <!-- Right Column -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Live Preview -->
        <div
          class="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/20"
        >
          <h2 class="text-lg font-bold text-on-surface mb-4">Live Preview</h2>
          <div
            class="mb-4 rounded-xl overflow-hidden border border-outline-variant/30 bg-black/80 aspect-video flex items-center justify-center"
          >
            <OverlayPreview :test-alert="testAlertData" />
          </div>
          <button
            @click="sendTestAlert"
            class="w-full px-4 py-3 bg-secondary text-on-secondary rounded-xl font-semibold hover:shadow-lg transition-all active:scale-95"
          >
            Test Alert
          </button>
        </div>

        <!-- Connection Status -->
        <div
          class="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/20"
        >
          <h2 class="text-lg font-bold text-on-surface mb-4">Connection</h2>
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <span
                class="inline-block w-3 h-3 rounded-full"
                :class="isConnected ? 'bg-success' : 'bg-error'"
              ></span>
              <span class="text-on-surface font-semibold">
                {{ isConnected ? "Connected" : "Disconnected" }}
              </span>
            </div>
            <p class="text-xs text-on-surface/70">
              {{ connectionMessage }}
            </p>
          </div>
        </div>

        <!-- Theme Preview -->
        <div
          class="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/20"
        >
          <h2 class="text-lg font-bold text-on-surface mb-4">Theme</h2>
          <div
            class="flex items-center justify-between bg-surface rounded-xl p-3"
          >
            <span class="text-on-surface font-semibold">Default Theme</span>
            <span
              class="text-xs px-2 py-1 bg-success/20 text-success rounded-full font-semibold"
            >
              Available
            </span>
          </div>
        </div>

        <!-- Overlay Information -->
        <div
          class="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/20"
        >
          <h2 class="text-lg font-bold text-on-surface mb-4">Information</h2>
          <div class="space-y-3 text-sm">
            <div>
              <p
                class="text-on-surface/70 uppercase tracking-wider text-xs font-bold mb-1"
              >
                Username
              </p>
              <p class="text-on-surface font-semibold">{{ username }}</p>
            </div>
            <div>
              <p
                class="text-on-surface/70 uppercase tracking-wider text-xs font-bold mb-1"
              >
                Status
              </p>
              <p class="text-on-surface font-semibold">Active</p>
            </div>
            <div>
              <p
                class="text-on-surface/70 uppercase tracking-wider text-xs font-bold mb-1"
              >
                Last Connected
              </p>
              <p class="text-on-surface font-semibold">
                {{ lastConnectedTime }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div
        v-if="showToast"
        class="fixed bottom-6 right-6 bg-success text-on-success px-6 py-3 rounded-lg font-semibold shadow-lg flex items-center gap-2"
      >
        <span class="material-symbols-outlined text-xl">check_circle</span>
        {{ toastMessage }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import OverlayPreview from "@/components/overlay/OverlayPreview.vue";

interface TestAlertData {
  donor_display_name: string;
  amount: number;
  amount_display: string;
  message: string;
}

const route = useRoute();
const authStore = useAuthStore();
const showToast = ref(false);
const toastMessage = ref("");
const isConnected = ref(true);
const lastConnectedTime = ref("Now");

const testAlertData = ref<TestAlertData | null>(null);

const username = computed(() => {
  return authStore.user?.username || "username";
});

const overlayURL = computed(() => {
  return `https://angpaoku.com/overlay/donations/${username.value}`;
});

const connectionMessage = computed(() => {
  return isConnected.value
    ? "WebSocket is connected and receiving donations in real-time."
    : "WebSocket disconnected. Overlay may not receive live updates.";
});

const quickGuide = [
  "Copy your overlay URL using the Copy URL button above",
  "Open OBS and add a new Browser Source",
  "Paste the URL in the Browser Source URL field",
  "Set Width to 1920 and Height to 1080",
  "Position and resize the source on your canvas",
];

function copyURL() {
  navigator.clipboard.writeText(overlayURL.value).then(() => {
    toastMessage.value = "✓ Overlay URL copied";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  });
}

function openOverlay() {
  window.open(overlayURL.value, "overlay", "width=1920,height=1080");
}

function sendTestAlert() {
  testAlertData.value = {
    donor_display_name: "John Doe",
    amount: 25000,
    amount_display: "Rp25.000",
    message: "Semoga sukses!",
  };

  // Clear the test alert after animation
  setTimeout(() => {
    testAlertData.value = null;
  }, 8000);
}

onMounted(() => {
  // Simulate connection status
  isConnected.value = true;
  lastConnectedTime.value = "Now";
});
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 300ms ease;
}

.toast-enter-from {
  transform: translateY(100px);
  opacity: 0;
}

.toast-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
</style>
