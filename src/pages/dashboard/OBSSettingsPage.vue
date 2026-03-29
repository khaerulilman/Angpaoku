<template>
  <div>
    <DashboardNavbar
      page-title="OBS Overlay"
      search-placeholder="Search settings..."
    />

    <div class="pt-4 px-6 pb-12 max-w-6xl mx-auto">
      <!-- Header -->
      <div
        class="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
      >
        <div>
          <h1
            class="text-4xl font-extrabold font-headline tracking-tight text-on-surface"
          >
            OBS Overlay Settings
          </h1>
          <p class="text-on-surface-variant mt-2 max-w-lg">
            Configure your donation alerts to match your stream's aesthetic.
            Changes are applied in real-time to your unique URL.
          </p>
        </div>
        <div class="flex gap-3">
          <AppButton variant="secondary" size="md" icon="refresh"
            >Reset</AppButton
          >
          <AppButton variant="brand" size="md">Save Changes</AppButton>
        </div>
      </div>

      <!-- Main Grid -->
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <!-- Left Column: Controls -->
        <div class="xl:col-span-5 flex flex-col gap-6">
          <!-- URL Generator -->
          <div
            class="bg-surface-container-lowest rounded-xl p-6 shadow-angpao relative overflow-hidden"
          >
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-primary-fixed-dim/20 rounded-full -mr-16 -mt-16 blur-3xl"
            ></div>
            <div class="relative z-10">
              <h3
                class="font-headline font-bold text-lg mb-4 flex items-center gap-2"
              >
                <span class="material-symbols-outlined text-primary">link</span
                >OBS Widget URL
              </h3>
              <div class="flex gap-2">
                <input
                  type="text"
                  readonly
                  class="flex-1 bg-surface-container-low border-none rounded-lg px-4 py-3 text-sm font-mono text-on-surface-variant focus:ring-2 focus:ring-secondary/10"
                  value="https://angpaoku.com/overlay/v1/u_4829375"
                />
                <button
                  class="bg-primary-container text-on-primary-container px-4 py-3 rounded-lg flex items-center justify-center hover:opacity-90 transition-all active:scale-95"
                >
                  <span class="material-symbols-outlined">content_copy</span>
                </button>
              </div>
              <p
                class="text-[10px] mt-3 text-on-surface-variant/70 uppercase tracking-widest font-bold"
              >
                Keep this link private
              </p>
            </div>
          </div>

          <!-- Customize Section -->
          <div
            class="bg-surface-container-low rounded-xl p-8 flex flex-col gap-8"
          >
            <!-- Theme Color Picker -->
            <div>
              <label class="block font-headline font-bold text-on-surface mb-4"
                >Theme Accent</label
              >
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="color in themeColors"
                  :key="color.value"
                  :class="[
                    'w-10 h-10 rounded-full hover:scale-110 transition-transform',
                    selectedColor === color.value
                      ? 'ring-4 ring-white shadow-sm ring-offset-2 ring-primary'
                      : '',
                  ]"
                  :style="{ backgroundColor: color.value }"
                  @click="selectedColor = color.value"
                ></button>
                <button
                  class="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant flex items-center justify-center"
                >
                  <span class="material-symbols-outlined text-sm">palette</span>
                </button>
              </div>
            </div>

            <!-- Animation Selection -->
            <div>
              <label class="block font-headline font-bold text-on-surface mb-4"
                >Entry Animation</label
              >
              <div class="grid grid-cols-3 gap-3">
                <button
                  v-for="anim in animations"
                  :key="anim.value"
                  :class="[
                    'py-3 rounded-xl flex flex-col items-center gap-2 text-xs',
                    selectedAnimation === anim.value
                      ? 'bg-white border-2 border-primary text-primary font-bold'
                      : 'bg-white border-2 border-transparent hover:border-outline-variant text-on-surface-variant font-medium',
                  ]"
                  @click="selectedAnimation = anim.value"
                >
                  <span class="material-symbols-outlined">{{ anim.icon }}</span>
                  {{ anim.label }}
                </button>
              </div>
            </div>

            <!-- Sound Library -->
            <div>
              <label class="block font-headline font-bold text-on-surface mb-4"
                >Alert Sound</label
              >
              <div class="space-y-2">
                <div
                  class="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm"
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="material-symbols-outlined text-secondary"
                      style="font-variation-settings: &quot;FILL&quot; 1"
                      >music_note</span
                    >
                    <div>
                      <p class="text-sm font-bold">Zen Chime</p>
                      <p class="text-[10px] text-on-surface-variant">
                        Default Sound
                      </p>
                    </div>
                  </div>
                  <button
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-low hover:bg-surface-container-high"
                  >
                    <span
                      class="material-symbols-outlined text-sm"
                      style="font-variation-settings: &quot;FILL&quot; 1"
                      >play_arrow</span
                    >
                  </button>
                </div>
                <div
                  class="flex items-center justify-between p-3 bg-white/40 opacity-70 rounded-xl hover:opacity-100 transition-opacity"
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="material-symbols-outlined text-on-surface-variant"
                      >music_note</span
                    >
                    <p class="text-sm font-medium">Arcade Coin</p>
                  </div>
                  <button
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-low"
                  >
                    <span
                      class="material-symbols-outlined text-sm"
                      style="font-variation-settings: &quot;FILL&quot; 1"
                      >play_arrow</span
                    >
                  </button>
                </div>
                <button
                  class="w-full border-2 border-dashed border-outline-variant py-4 rounded-xl text-on-surface-variant text-sm font-medium hover:bg-white/50 transition-colors"
                >
                  Upload Custom MP3
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Preview -->
        <div class="xl:col-span-7">
          <div
            class="sticky top-28 bg-surface-container-lowest rounded-2xl shadow-angpao-xl p-4 md:p-8 aspect-video flex flex-col overflow-hidden"
          >
            <!-- Toolbar -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-2">
                <div class="flex gap-1.5">
                  <div class="w-3 h-3 rounded-full bg-error/20"></div>
                  <div class="w-3 h-3 rounded-full bg-tertiary/20"></div>
                  <div class="w-3 h-3 rounded-full bg-secondary/20"></div>
                </div>
                <span
                  class="text-[10px] font-bold tracking-widest text-on-surface-variant/40 uppercase ml-2"
                  >Live Canvas Preview</span
                >
              </div>
              <button
                class="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
              >
                <span class="material-symbols-outlined text-sm">fullscreen</span
                >Expand Preview
              </button>
            </div>

            <!-- Stream Preview -->
            <div
              class="relative flex-1 rounded-xl overflow-hidden bg-zinc-900 shadow-inner"
            >
              <img
                class="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.5]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0FK8MEsZH8dViFwR8qlY5fnJOW2EFXhuA1CmLKZZQMTfz0i-jYEtxlr7Sh6C2sr4b_uE5JOzItYhVh6ffBQ7zpU6GG1kQ4qTuBFvOS4LJ-7E94IJCMnP8b6BC7KIUKcm4rjrXwwxRhHMFqctNnRtd5daZCQpe-d2FawBdR658wSkV_wQmp_nJCujd83d9Xz1OWKlLXdHopHb0YcxZSFwGLdFN2Av2v3WrSjm-XESy_WvFREBFP4CJwogbXBlZ2GV95-iCP6Y2l4w"
                alt="Stream preview background"
              />
              <!-- Alert Mockup -->
              <div
                class="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div
                  class="w-full max-w-sm bg-white/90 glass-effect rounded-2xl p-6 shadow-2xl translate-y-[-10%] border-l-8 border-primary flex items-center gap-6 animate-pulse"
                >
                  <div
                    class="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center shrink-0"
                  >
                    <span
                      class="material-symbols-outlined text-3xl text-primary"
                      style="font-variation-settings: &quot;FILL&quot; 1"
                      >redeem</span
                    >
                  </div>
                  <div>
                    <p
                      class="text-primary font-headline font-black text-xl tracking-tight leading-none"
                    >
                      Angpao Received!
                    </p>
                    <p class="text-on-surface-variant font-bold text-sm mt-1">
                      CreatorFan99 sent
                      <span class="text-on-surface">IDR 50.000</span>
                    </p>
                    <p
                      class="text-on-surface-variant text-[11px] italic mt-2 opacity-80 leading-snug"
                    >
                      "Keep up the amazing content! Your streams help me unwind
                      after work."
                    </p>
                  </div>
                </div>
              </div>

              <!-- Overlay Indicators -->
              <div class="absolute bottom-4 left-4 flex gap-2">
                <div
                  class="px-2 py-1 bg-black/50 text-[10px] text-white rounded font-mono"
                >
                  1920 x 1080
                </div>
                <div
                  class="px-2 py-1 bg-primary text-[10px] text-white rounded font-bold uppercase tracking-tighter flex items-center gap-1"
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"
                  ></span
                  >Rendering
                </div>
              </div>
            </div>

            <!-- Gold Progress Bar -->
            <div class="mt-8">
              <div class="flex justify-between items-end mb-2">
                <p
                  class="text-xs font-headline font-bold uppercase tracking-wider text-on-surface-variant"
                >
                  Donation Goal Progress
                </p>
                <p class="text-xs font-bold text-tertiary">
                  75% • IDR 750.000 / 1.000.000
                </p>
              </div>
              <div
                class="h-3 w-full bg-tertiary-fixed rounded-full overflow-hidden"
              >
                <div class="h-full bg-tertiary w-3/4 rounded-full relative">
                  <div
                    class="absolute top-0 right-0 h-full w-8 bg-white/20 blur-sm"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar.vue";
import AppButton from "@/components/common/AppButton.vue";

const selectedColor = ref("#b7102a");
const selectedAnimation = ref("slide_up");

const themeColors = [
  { value: "#b7102a" },
  { value: "#705d00" },
  { value: "#1b1b1d" },
  { value: "#8e4e14" },
  { value: "#5b403f" },
];

const animations = [
  { value: "slide_up", label: "Slide Up", icon: "move_up" },
  { value: "bounce", label: "Bounce", icon: "open_in_new" },
  { value: "fade_in", label: "Fade In", icon: "blur_on" },
];
</script>
