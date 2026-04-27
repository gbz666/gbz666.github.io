<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <RouterLink to="/" class="site-header__brand">Bai Zhou</RouterLink>

      <nav class="site-header__nav" aria-label="主导航">
        <RouterLink to="/" class="site-header__link">首页</RouterLink>
        <RouterLink to="/blog" class="site-header__link">博客</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--line-subtle);
  background: color-mix(in oklab, var(--bg-surface) 92%, #0b1220 8%);
  backdrop-filter: blur(10px);
}

.site-header__inner {
  width: min(1100px, calc(100% - 2rem));
  margin: 0 auto;
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.site-header__brand {
  color: var(--text-primary);
  text-decoration: none;
  font-family: var(--font-display);
  font-size: 1.05rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.site-header__nav {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.site-header__link {
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  font-size: 0.92rem;
  transition: all 0.2s ease;
}

.site-header__link:hover {
  color: var(--text-primary);
  background: var(--surface-raised);
}

.site-header__link.router-link-exact-active {
  color: var(--text-primary);
  background: var(--surface-raised);
  box-shadow: inset 0 0 0 1px var(--line-subtle);
}
</style>
