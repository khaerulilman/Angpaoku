<template>
  <button
    :class="[
      'inline-flex items-center justify-center gap-2 font-bold transition-all active:scale-95',
      sizeClasses,
      variantClasses,
    ]"
    v-bind="$attrs"
  >
    <span v-if="icon" class="material-symbols-outlined" :class="iconSizeClass">{{ icon }}</span>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'brand' | 'outline' | 'ghost' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'brand',
  size: 'md',
  rounded: true,
})

const variantClasses = computed(() => {
  const map: Record<string, string> = {
    brand: 'btn-gradient text-white shadow-angpao-lg hover:opacity-90',
    outline: 'border-2 border-outline-variant text-on-surface hover:bg-surface-container-low',
    ghost: 'text-on-surface-variant hover:bg-surface-container-high',
    secondary: 'bg-surface-container-highest text-on-surface hover:bg-surface-container-high',
  }
  return map[props.variant]
})

const sizeClasses = computed(() => {
  const base = props.rounded ? 'rounded-full' : 'rounded-xl'
  const map: Record<string, string> = {
    sm: `${base} px-4 py-2 text-xs`,
    md: `${base} px-6 py-3 text-sm`,
    lg: `${base} px-10 py-5 text-base`,
  }
  return map[props.size]
})

const iconSizeClass = computed(() => {
  return props.size === 'sm' ? 'text-sm' : props.size === 'lg' ? 'text-xl' : 'text-base'
})
</script>
