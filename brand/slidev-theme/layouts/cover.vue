<script setup lang="ts">
defineProps({
  event: {
    type: String,
    default: 'alphalist Developer Bootcamp / Hamburg / June 16-17, 2026',
  },
})
</script>

<template>
  <div class="slidev-layout hw-cover">
    <div class="cover-bar" />
    <div class="cover-eyebrow">{{ event }}</div>
    <div class="cover-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.hw-cover {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.cover-bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 7px;
  background: linear-gradient(180deg, var(--primary), var(--secondary));
}

.cover-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--primary);
  margin-bottom: 1.4rem;
}

.cover-body :deep(h1) {
  font-size: 3.1rem;
  line-height: 1.08;
  max-width: 86%;
  margin-bottom: 1.2rem;
}

.cover-body :deep(h1 + p) {
  margin-top: 0;
  color: var(--muted);
  font-size: 1.3rem;
}

.cover-body :deep(strong) {
  color: var(--primary-deep);
}
</style>
