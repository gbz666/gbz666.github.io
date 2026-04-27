<script setup lang="ts">
import BlogCard from '../components/blog/BlogCard.vue'
import BlogSidebar from '../components/blog/BlogSidebar.vue'
import { publishedBlogPosts } from '../data/blogPosts'
</script>

<template>
  <section class="page-shell blog-layout">
    <BlogSidebar />

    <main class="blog-index">
      <header class="blog-index__header">
        <p class="blog-index__eyebrow">Blog</p>
        <h1>技术博客</h1>
        <p>
          集中放置工程实践与复盘文章，沉淀日常开发中的思考与技术积累。
        </p>
      </header>

      <section v-if="publishedBlogPosts.length > 0" class="blog-index__list">
        <BlogCard v-for="post in publishedBlogPosts" :key="post.slug" :post="post" />
      </section>

      <section v-else class="blog-index__empty">暂时还没有已发布文章。</section>
    </main>
  </section>
</template>

<style scoped>
.blog-layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 1.3rem;
  align-items: start;
}

.blog-index {
  display: grid;
  gap: 1.3rem;
}

.blog-index__header {
  padding: 1.5rem;
  border: 1px solid var(--line-subtle);
  border-radius: 1.2rem;
  background: rgba(13, 24, 42, 0.85);
}

.blog-index__eyebrow {
  margin: 0;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: var(--text-muted);
}

.blog-index h1 {
  margin: 0.5rem 0 0.8rem;
  font-family: var(--font-display);
  color: var(--text-primary);
}

.blog-index p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.8;
}

.blog-index__list {
  display: grid;
  gap: 1rem;
}

.blog-index__empty {
  border: 1px dashed var(--line-strong);
  border-radius: 1rem;
  padding: 1.2rem;
  color: var(--text-muted);
}

@media (max-width: 980px) {
  .blog-layout {
    grid-template-columns: 1fr;
  }
}
</style>
