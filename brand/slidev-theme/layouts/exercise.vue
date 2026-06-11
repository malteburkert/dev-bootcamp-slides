<script setup lang="ts">
defineProps({
  duration: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="slidev-layout hw-exercise">
    <div class="exercise-header">
      <span class="exercise-tag">Exercise</span>
      <span v-if="duration" class="exercise-duration">{{ duration }}</span>
    </div>
    <div class="exercise-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.exercise-header {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 1.1rem;
}

.exercise-tag {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--primary-deep);
  background: var(--hw-teal-tint);
  padding: 0.25em 0.7em;
  border-radius: var(--radius-sm);
}

.exercise-duration {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--fg);
  background: var(--accent-amber-tint);
  padding: 0.25em 0.7em;
  border-radius: var(--radius-sm);
}

.exercise-body :deep(h1) {
  font-size: 2rem;
  margin-bottom: 0.9rem;
}

.exercise-body :deep(ol li),
.exercise-body :deep(ul li) {
  margin-bottom: 0.35em;
}
</style>
