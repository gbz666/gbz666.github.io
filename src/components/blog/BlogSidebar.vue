<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { publishedBlogPosts } from '../../data/blogPosts'

const props = defineProps<{
  currentSlug?: string
}>()

const sidebarPosts = computed(() => publishedBlogPosts)
</script>

<template>
  <aside class="blog-sidebar" aria-label="博客侧边导航">
    <h2 class="blog-sidebar__title">博客导航</h2>

    <nav class="blog-sidebar__nav">
      <RouterLink class="blog-sidebar__home" to="/blog">全部文章</RouterLink>

      <ul class="blog-sidebar__list">
        <li v-for="post in sidebarPosts" :key="post.slug">
          <RouterLink
            :class="['blog-sidebar__post', { 'blog-sidebar__post--active': props.currentSlug === post.slug }]"
            :to="`/blog/${post.slug}`"
          >
            {{ post.title }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.blog-sidebar {
  position: sticky;
  top: 5.2rem;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--line-subtle);
  background: rgba(10, 18, 32, 0.8);
  backdrop-filter: blur(6px);
}

.blog-sidebar__title {
  margin: 0 0 0.8rem;
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--text-primary);
}

.blog-sidebar__nav {
  display: grid;
  gap: 0.65rem;
}

.blog-sidebar__home {
  color: var(--text-primary);
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.45rem 0.6rem;
  border-radius: 0.65rem;
  border: 1px solid var(--line-subtle);
  background: rgba(16, 28, 47, 0.8);
}

.blog-sidebar__home:hover {
  border-color: var(--line-strong);
}

.blog-sidebar__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}

.blog-sidebar__post {
  display: block;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.88rem;
  line-height: 1.55;
  padding: 0.35rem 0.5rem;
  border-radius: 0.55rem;
}

.blog-sidebar__post:hover {
  color: var(--text-primary);
  background: rgba(108, 181, 255, 0.12);
}

.blog-sidebar__post--active {
  color: var(--text-primary);
  background: rgba(108, 181, 255, 0.14);
  box-shadow: inset 0 0 0 1px rgba(108, 181, 255, 0.4);
}

@media (max-width: 980px) {
  .blog-sidebar {
    position: static;
    top: auto;
  }

  .blog-sidebar__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .blog-sidebar__list {
    grid-template-columns: 1fr;
  }
}
</style>
