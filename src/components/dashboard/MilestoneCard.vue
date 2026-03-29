<template>
  <div class="bg-gradient-to-br from-secondary to-on-secondary-container p-6 rounded-2xl text-white relative overflow-hidden group">
    <div class="relative z-10">
      <h4 class="text-lg font-bold mb-2">{{ title }}</h4>
      <p class="text-xs text-white/80 mb-4">{{ description }}</p>
      <div class="w-full bg-white/20 h-2 rounded-full mb-2">
        <div
          class="bg-tertiary-fixed h-full rounded-full transition-all duration-700"
          :style="{ width: `${progressPercent}%` }"
        ></div>
      </div>
      <span class="text-[10px] font-bold uppercase tracking-wider">
        {{ progressPercent }}% TO MILESTONE
      </span>
    </div>
    <span class="material-symbols-outlined absolute -bottom-6 -right-6 text-9xl opacity-10 rotate-12 transition-transform group-hover:rotate-0">
      military_tech
    </span>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
    progressPercent?: number
  }>(),
  {
    title: 'Angpaoku Gold',
    description: 'Reach your next goal of $20,000 to unlock exclusive merchant perks.',
    progressPercent: 62,
  }
)
</script>
