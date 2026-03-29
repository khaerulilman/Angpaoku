<template>
  <div
    :class="[
      'bg-surface-container-lowest rounded-xl transition-all duration-300',
      hoverable ? 'hover:shadow-lg cursor-pointer' : '',
      shadowClass,
      $attrs.class,
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  shadow?: 'none' | 'sm' | 'md' | 'angpao'
  hoverable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  shadow: 'sm',
  hoverable: false,
})

const shadowClass = computed(() => {
  const map: Record<string, string> = {
    none: '',
    sm: 'shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-outline-variant/5',
    md: 'shadow-[0_20px_40px_rgba(187,21,44,0.04)]',
    angpao: 'shadow-angpao',
  }
  return map[props.shadow]
})
</script>
