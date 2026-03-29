<template>
  <div class="mt-20 flex flex-wrap justify-center gap-12 opacity-40 grayscale contrast-125">
    <span v-for="brand in brands" :key="brand" class="text-2xl font-black italic tracking-tighter">
      {{ brand }}
    </span>
  </div>
</template>

<script setup lang="ts">
const brands = ['STREAMX', 'GAMERLAB', 'CREATOR.UI', 'VELOCITY']
</script>
