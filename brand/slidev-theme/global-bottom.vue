<script setup lang="ts">
import logo from '../logos/hw-logo.svg'
</script>

<template>
  <img :src="logo" class="hw-watermark" alt="" />
</template>

<style scoped>
.hw-watermark {
  position: absolute;
  bottom: 1rem;
  right: 1.1rem;
  height: 1.9rem;
  z-index: 50;
  pointer-events: none;
}
</style>
