<template>
  <span
    :class="[
      'inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider',
      variantClasses,
    ]"
  >
    <span v-if="dot" :class="['w-1.5 h-1.5 rounded-full', dotClass]"></span>
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'success' | 'danger' | 'warning' | 'live' | 'info' | 'neutral'
  dot?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'neutral',
  dot: false,
})

const variantClasses = computed(() => {
  const map: Record<string, string> = {
    success: 'bg-emerald-100 text-emerald-700',
    danger: 'bg-red-100 text-red-700',
    warning: 'bg-amber-100 text-amber-700',
    live: 'bg-primary/10 text-primary',
    info: 'bg-secondary-container/30 text-on-secondary-container',
    neutral: 'bg-surface-container-high text-on-surface-variant',
  }
  return map[props.variant]
})

const dotClass = computed(() => {
  const map: Record<string, string> = {
    success: 'bg-emerald-500',
    danger: 'bg-red-500',
    warning: 'bg-amber-500',
    live: 'bg-primary animate-pulse',
    info: 'bg-secondary',
    neutral: 'bg-on-surface-variant',
  }
  return map[props.variant]
})
</script>
