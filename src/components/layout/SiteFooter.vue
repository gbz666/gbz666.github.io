<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <p>© {{ new Date().getFullYear() }} Bai Zhou. Personal knowledge base in progress.</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--line-subtle);
  background: var(--bg-surface);
}

.site-footer__inner {
  width: min(1100px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 1.4rem 0 2rem;
}

p {
  margin: 0;
  font-size: 0.82rem;
  color: var(--text-muted);
}
</style>
