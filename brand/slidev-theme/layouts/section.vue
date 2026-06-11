<script setup lang="ts">
defineProps({
  kicker: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="slidev-layout hw-section">
    <div v-if="kicker" class="section-kicker">{{ kicker }}</div>
    <div class="section-body">
      <slot />
    </div>
    <div class="section-bar" />
  </div>
</template>

<style scoped>
.hw-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.section-kicker {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--secondary);
  margin-bottom: 1rem;
}

.section-body :deep(h1) {
  font-size: 2.8rem;
  line-height: 1.1;
  max-width: 85%;
}

.section-body :deep(h1 + p) {
  color: var(--muted);
  font-size: 1.2rem;
}

.section-bar {
  width: 5.5rem;
  height: 6px;
  border-radius: 3px;
  margin-top: 1.6rem;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
}
</style>
