<template>
  <section
    class="mx-auto px-8 mb-32 w-full py-20"
    :style="{
      backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url('${heroBg}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <div class="max-w-[1440px] mx-auto px-8">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left Content -->
        <div class="space-y-8">
          <!-- Badge -->
          <div
            class="inline-flex items-center gap-2 bg-primary-fixed text-on-primary-fixed px-4 py-2 rounded-full text-sm font-bold tracking-tight"
          >
            <span
              class="material-symbols-outlined text-sm"
              style="font-variation-settings: &quot;FILL&quot; 1"
              >stars</span
            >
            NEW: OBS LIVE OVERLAYS INTEGRATION
          </div>

          <!-- Headline -->
          <h1
            class="text-[3.5rem] leading-[1.1] font-extrabold tracking-tighter font-headline text-on-surface"
          >
            Turn Your Passion Into
            <span class="text-gradient">Red Envelopes</span>
          </h1>

          <!-- Subtitle -->
          <p class="text-lg text-on-surface-variant max-w-xl leading-relaxed">
            The ultimate high-end creator toolkit. Sell digital products, accept
            real-time donations, and engage your audience with stunning OBS
            overlays that make every contribution feel like a gift.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap gap-4 pt-4">
            <RouterLink to="/dashboard">
              <AppButton variant="brand" size="lg" icon="rocket_launch">
                Start Selling
              </AppButton>
            </RouterLink>

            <RouterLink to="/guides/obs-connect">
              <AppButton variant="secondary" size="lg" icon="videocam">
                Connect OBS
              </AppButton>
            </RouterLink>
          </div>

          <!-- Social Proof -->
          <div class="flex items-center gap-4 pt-8">
            <div class="flex -space-x-3">
              <div
                v-for="(avatar, i) in avatars"
                :key="i"
                class="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-zinc-200"
              >
                <img
                  :src="avatar"
                  class="w-full h-full object-cover"
                  alt="Creator avatar"
                />
              </div>
            </div>
            <p class="text-sm font-medium text-on-surface-variant italic">
              Joined by 10,000+ top-tier creators this month
            </p>
          </div>
        </div>

        <!-- Right Content - Hero Image -->
        <div class="relative">
          <div
            class="absolute -top-10 -left-10 w-64 h-64 bg-primary-fixed-dim rounded-full blur-[100px] opacity-20"
          ></div>
          <div
            class="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-surface-container-low border-[12px] border-white"
          >
            <img
              class="w-full aspect-[4/3] object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCthx0zZYPBREhDG5priGMjB8qZqCbHDb-9ULxEfwwgYpUInUJLqYlHbK8uEsqNiTifW51ooOj9HFqm8fgymFFdTAdVdCa_u9frtetBgkYbK7wkV3ymGsUV7hNQn_JBDtC2d4kcvzp3nIUH3cU55g6a9dPkrqyM_aI9NGWp2IMvB5eRO48VHiH28obYq0e7z-IJa8sU1EcwLLuu4fJPFxRdtB33VhPWhOFm_JhIESWrjGrktQ746gChl5kul9Plb3Am8NVKBCQURGY"
              alt="Creator streaming setup"
            />
            <!-- Floating Notification -->
            <div
              class="absolute top-8 right-8 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-outline-variant/20"
            >
              <div
                class="w-12 h-12 bg-tertiary-fixed rounded-full flex items-center justify-center"
              >
                <span
                  class="material-symbols-outlined text-tertiary"
                  style="font-variation-settings: &quot;FILL&quot; 1"
                  >redeem</span
                >
              </div>
              <div>
                <p
                  class="text-xs font-bold text-tertiary uppercase tracking-wider"
                >
                  New Angpao!
                </p>
                <p class="font-bold text-on-surface">Andi sent $50.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AppButton from "@/components/common/AppButton.vue";

const heroBg =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDeSghs0Kc4HvZsTeW0bFYXPPxsewyu8wC0o7-HI2jtQB8p7a3R_fH25WIHX5lpEWwyOK8o4QTQ0L_LKGNF1TpcED-JYSwaVIQ_Cey8j66391jvNNUYKrfdMheY_gh_qB9w6OL1LrobQP8S4QI3-PGtdfE1BWk1QDrwSuekBOSy8tMcAHhZV9DJxItqSR2pqdd8sRMDiXw4Ldyffz19P4e4HqJIOmRFlJgQsWoHOyux5YhN7Zvod-Kinw0dkMdMfxgSO2GWHgnufr8";

const avatars = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBZrsdmQ5GRUyQj7MNIrTMJqElMGuCbYTB550OEQQCHAkqqPSzb8tYAzkt4fC9FmGIKzFsu_hTdFqAWPU4vYc3WG1A05FcfMWcyM4rRE9Su1GlWSd8dpMZx1tYBJf4Z_nvwRSIQHAbOuVEvUFdsmLvUcCSdtmXvbyGF5YKugunRAAiU8ohnPfO0ZKmkMhsnp0PdJMkn3DR9xStWDGQveYZc4JMFHdKS84icj8ApsHgUUyLaMxxKOJAcnJm3sicjTnSRwJT6SzIJL64",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBYs6Xi6V_Sc3mfeogoosnARLc5WKHfX6gJ3PyHYr8ipkRDDJBOLusD8BWWg0hSy9rhDLpkd3GnPRD_S2GF3eytLc1I-F9_o98EUqdI3Wz6Dd2gNB8PRi6nPGXzDce3osdvoKJUYRbDr1P3VoH7Qsaccy3yfEryFnjKWyA_xV5ZXcltxdqg1hrpOt5H3QqGxtUWlEUU7NSt1YrtRiH82z1u_Te7uvViuxbAiErOJ88jBT9UV71pcCH2oOXJyJuhtfnnzaQ0UMHeeMM",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuACv2F1M1X0LOdR63qTO7FROrhDxjJrC0dap6zmQMxe59XZGM6KqTkz4Qrm9FlQfRNEnFSTksvMDZLvDGaH6F98wU_Dsw6wWbNnQJ89hRPTTeQiykteIInzQph4GThKPzh0cuJsgV40RBVZtSmlwiFsIwz2pWonT3axZiOxSH4JkMce_KOs8S5thH-Qsz1DxS4y7m-gnVjVq0IoEEq0pWu4EBCJh-87l9CzxmuwsUn93XYZyM2dKVh-pGmZ7u-uLcXUnNcGnwvHXBI",
];
</script>
