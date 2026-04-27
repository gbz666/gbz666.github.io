<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface Spark {
  id: number
  x: number
  y: number
  dx: number
  dy: number
  size: number
  duration: number
  color: string
}

const sparks = ref<Spark[]>([])
let sparkId = 0
const timers = new Set<number>()

const palette = ['#9bd1ff', '#78b8ff', '#b8dcff', '#f7fbff']

function spawnSparks(event: PointerEvent): void {
  const burstCount = 14

  for (let index = 0; index < burstCount; index += 1) {
    const angle = (Math.PI * 2 * index) / burstCount + Math.random() * 0.38
    const distance = 20 + Math.random() * 44
    const spark: Spark = {
      id: sparkId,
      x: event.clientX,
      y: event.clientY,
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
      size: 10 + Math.random() * 8,
      duration: 520 + Math.random() * 300,
      color: palette[Math.floor(Math.random() * palette.length)]!,
    }

    sparkId += 1
    sparks.value.push(spark)

    const timer = window.setTimeout(() => {
      sparks.value = sparks.value.filter((item) => item.id !== spark.id)
      timers.delete(timer)
    }, spark.duration)

    timers.add(timer)
  }
}

onMounted(() => {
  window.addEventListener('pointerdown', spawnSparks)
})

onBeforeUnmount(() => {
  window.removeEventListener('pointerdown', spawnSparks)

  for (const timer of timers) {
    window.clearTimeout(timer)
  }

  timers.clear()
})
</script>

<template>
  <div class="click-stars" aria-hidden="true">
    <span
      v-for="spark in sparks"
      :key="spark.id"
      class="click-stars__item"
      :style="{
        left: `${spark.x}px`,
        top: `${spark.y}px`,
        '--spark-dx': `${spark.dx}px`,
        '--spark-dy': `${spark.dy}px`,
        '--spark-size': `${spark.size}px`,
        '--spark-duration': `${spark.duration}ms`,
        '--spark-color': spark.color,
      }"
    >
      ✦
    </span>
  </div>
</template>

<style scoped>
.click-stars {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 50;
}

.click-stars__item {
  position: fixed;
  display: block;
  font-size: var(--spark-size);
  color: var(--spark-color);
  text-shadow: 0 0 10px rgba(161, 214, 255, 0.45);
  transform: translate(-50%, -50%);
  animation: spark-burst var(--spark-duration) cubic-bezier(0.16, 0.84, 0.22, 1) forwards;
}

@keyframes spark-burst {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(0.2) rotate(0deg);
  }

  100% {
    opacity: 0;
    transform: translate(calc(-50% + var(--spark-dx)), calc(-50% + var(--spark-dy))) scale(1) rotate(120deg);
  }
}
</style>
