<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BlogSidebar from '../components/blog/BlogSidebar.vue'
import { getBlogPostBySlug, renderMarkdown } from '../data/blogPosts'

const route = useRoute()

const post = computed(() => {
  return getBlogPostBySlug(String(route.params.slug ?? ''))
})

const renderedContent = computed(() => {
  if (!post.value) {
    return ''
  }

  return renderMarkdown(post.value.content)
})
</script>

<template>
  <section class="page-shell post-layout">
    <BlogSidebar :current-slug="post?.slug" />

    <article v-if="post" class="post">
      <RouterLink class="post__back" to="/blog">← 返回博客列表</RouterLink>
      <p class="post__eyebrow">Proxy · Agent · 复盘</p>
      <h1 class="post__title">{{ post.title }}</h1>
      <p class="post__summary">{{ post.summary }}</p>

      <img v-if="post.cover" :src="post.cover" :alt="post.title" class="post__cover" />

      <div class="post__content" v-html="renderedContent"></div>
    </article>

    <section v-else class="post-not-found">
      <h1>文章不存在</h1>
      <p>当前地址没有匹配到文章，请返回博客页查看已有内容。</p>
      <RouterLink to="/blog">返回博客页</RouterLink>
    </section>
  </section>
</template>

<style scoped>
.post-layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 1.3rem;
  align-items: start;
}

.post {
  display: grid;
  min-width: 0;
  gap: 1rem;
}

.post__back {
  width: fit-content;
  color: var(--brand-blue);
  text-decoration: none;
  font-size: 0.9rem;
}

.post__back:hover {
  text-decoration: underline;
}

.post__eyebrow {
  margin: 0;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.post__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.7rem);
  line-height: 1.2;
  color: var(--text-primary);
}

.post__summary {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.85;
}

.post__cover {
  width: 100%;
  border-radius: 1rem;
  border: 1px solid var(--line-subtle);
}

.post__content {
  padding: 1.4rem;
  border-radius: 1rem;
  border: 1px solid var(--line-subtle);
  background: rgba(13, 24, 42, 0.88);
}

.post__content :deep(h2) {
  margin: 1.3rem 0 0.8rem;
  color: var(--text-primary);
  font-family: var(--font-display);
}

.post__content :deep(p),
.post__content :deep(li) {
  color: var(--text-secondary);
  line-height: 1.9;
}

.post__content :deep(ul) {
  padding-left: 1.2rem;
}

.post__content :deep(img) {
  display: block;
  max-width: 100%;
  width: auto;
  height: auto;
  margin: 1rem auto;
  border-radius: 0.8rem;
  border: 1px solid var(--line-subtle);
}

.post__content :deep(code) {
  padding: 0.1rem 0.35rem;
  border-radius: 0.35rem;
  background: rgba(26, 39, 63, 0.9);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.9em;
}

.post__content :deep(pre) {
  overflow: auto;
  padding: 0.9rem;
  border-radius: 0.8rem;
  background: rgba(14, 20, 33, 0.92);
}

.post__content :deep(pre code) {
  background: transparent;
  padding: 0;
}

.post__content :deep(a) {
  color: var(--brand-blue);
}

.post-not-found {
  border: 1px dashed var(--line-strong);
  border-radius: 1rem;
  padding: 1.3rem;
}

.post-not-found h1 {
  margin: 0;
  color: var(--text-primary);
}

.post-not-found p {
  color: var(--text-secondary);
}

.post-not-found a {
  color: var(--brand-blue);
  text-decoration: none;
}

.post-not-found a:hover {
  text-decoration: underline;
}

@media (max-width: 980px) {
  .post-layout {
    grid-template-columns: 1fr;
  }
}
</style>
