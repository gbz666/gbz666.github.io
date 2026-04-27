<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import BlogCard from '../components/blog/BlogCard.vue'
import { publishedBlogPosts } from '../data/blogPosts'
import { siteSections } from '../data/siteSections'

const latestPost = computed(() => publishedBlogPosts[0])
</script>

<template>
  <section class="page-shell home">
    <header class="hero">
      <p class="hero__eyebrow">Personal Homepage</p>
      <h1 class="hero__title">记录一下我自己。</h1>
      <p class="hero__desc">
        是的，这就是一个vibe的个人主页。
      </p>

      <div class="hero__actions">
        <RouterLink class="hero__button hero__button--solid" to="/blog">进入博客</RouterLink>
        <a class="hero__button hero__button--ghost" href="https://github.com/gbz666" target="_blank" rel="noreferrer">GitHub Profile</a>
      </div>
    </header>

    <section class="modules">
      <div class="section-heading">
        <h2>内容导览</h2>
        <p>探索各类技术文章与实战沉淀。</p>
      </div>

      <div class="modules__grid">
        <article v-for="section in siteSections" :key="section.key" class="module-card">
          <div class="module-card__top">
            <h3>{{ section.title }}</h3>
            <span :class="['module-card__status', `module-card__status--${section.status}`]">
              {{ section.status === 'ready' ? '可用' : '待开放' }}
            </span>
          </div>
          <p>{{ section.description }}</p>
          <RouterLink v-if="section.status === 'ready'" :to="section.path">查看</RouterLink>
          <span v-else>后续扩展</span>
        </article>
      </div>
    </section>

    <section class="featured">
      <div class="section-heading">
        <h2>推荐阅读</h2>
        <p>查阅最新发布的技术博客与复盘文章。</p>
      </div>

      <BlogCard v-if="latestPost" :post="latestPost" />
      <div v-else class="empty-state">暂无文章</div>
    </section>
  </section>
</template>

<style scoped>
.home {
  display: grid;
  gap: 2.25rem;
}

.hero {
  padding: 2rem;
  border-radius: 1.4rem;
  border: 1px solid var(--line-subtle);
  background:
    radial-gradient(circle at 16% -20%, rgba(122, 186, 255, 0.26), transparent 52%),
    radial-gradient(circle at 88% 120%, rgba(141, 176, 255, 0.2), transparent 50%),
    linear-gradient(145deg, rgba(16, 30, 53, 0.88), rgba(11, 22, 39, 0.9));
  box-shadow: var(--shadow-soft);
}

.hero__eyebrow {
  margin: 0;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.hero__title {
  margin: 0.8rem 0 1rem;
  max-width: 20ch;
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 4vw, 3rem);
  line-height: 1.15;
  color: var(--text-primary);
}

.hero__desc {
  margin: 0;
  max-width: 62ch;
  color: var(--text-secondary);
  line-height: 1.9;
}

.hero__actions {
  margin-top: 1.4rem;
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
}

.hero__button {
  text-decoration: none;
  border-radius: 999px;
  padding: 0.55rem 1rem;
  font-size: 0.9rem;
  transition: transform 0.18s ease;
}

.hero__button:hover {
  transform: translateY(-2px);
}

.hero__button--solid {
  color: #fff;
  background: var(--brand-blue);
}

.hero__button--ghost {
  color: var(--text-primary);
  border: 1px solid var(--line-strong);
  background: rgba(11, 17, 30, 0.42);
}

.section-heading h2 {
  margin: 0;
  font-family: var(--font-display);
  color: var(--text-primary);
}

.section-heading p {
  margin: 0.4rem 0 0;
  color: var(--text-muted);
}

.modules,
.featured {
  display: grid;
  gap: 1rem;
}

.modules__grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.module-card {
  padding: 1.2rem;
  border-radius: 1rem;
  border: 1px solid var(--line-subtle);
  background: rgba(10, 19, 34, 0.82);
  display: grid;
  gap: 0.65rem;
}

.module-card__top {
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;
}

.module-card h3 {
  margin: 0;
  font-size: 1.05rem;
  color: var(--text-primary);
}

.module-card p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.7;
}

.module-card a,
.module-card span {
  width: fit-content;
  font-size: 0.88rem;
}

.module-card a {
  color: var(--brand-blue);
  text-decoration: none;
}

.module-card a:hover {
  text-decoration: underline;
}

.module-card__status {
  font-size: 0.76rem;
  border-radius: 999px;
  padding: 0.15rem 0.5rem;
}

.module-card__status--ready {
  color: #0b4f8a;
  background: rgba(0, 113, 227, 0.12);
}

.module-card__status--coming-soon {
  color: var(--text-muted);
  background: rgba(132, 148, 170, 0.18);
}

.empty-state {
  border: 1px dashed var(--line-strong);
  border-radius: 1rem;
  padding: 1.3rem;
  color: var(--text-muted);
}

@media (max-width: 860px) {
  .hero {
    padding: 1.3rem;
  }

  .modules__grid {
    grid-template-columns: 1fr;
  }
}
</style>
