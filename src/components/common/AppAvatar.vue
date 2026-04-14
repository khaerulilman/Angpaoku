<template>
  <div
    :class="[
      'rounded-full overflow-hidden flex items-center justify-center flex-shrink-0',
      sizeClasses,
      clickable ? 'cursor-pointer transition-transform hover:scale-105' : '',
    ]"
    @click="handleClick"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover"
      :class="
        grayscale ? 'grayscale group-hover:grayscale-0 transition-all' : ''
      "
    />
    <span
      v-else-if="computedInitials"
      class="font-bold text-primary bg-primary-fixed w-full h-full flex items-center justify-center"
      :class="initialsSizeClass"
    >
      {{ computedInitials }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  src?: string;
  alt?: string;
  initials?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  grayscale?: boolean;
  clickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  alt: "Avatar",
  size: "md",
  grayscale: false,
  clickable: false,
});

const emit = defineEmits<{
  (e: "click"): void;
}>();

const sizeClasses = computed(() => {
  const map: Record<string, string> = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };
  return map[props.size];
});

const initialsSizeClass = computed(() => {
  return props.size === "sm"
    ? "text-xs"
    : props.size === "lg"
      ? "text-lg"
      : "text-sm";
});

const computedInitials = computed(() => {
  if (props.initials) return props.initials;
  if (props.name) {
    return props.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  return "";
});

const handleClick = () => {
  if (props.clickable) {
    emit("click");
  }
};
</script>
