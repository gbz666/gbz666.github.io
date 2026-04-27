<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { BlogPost } from '../../types/blog'

const props = defineProps<{
  post: BlogPost
}>()

function formatDate(dateText: string): string {
  if (!dateText) {
    return '待发布'
  }

  const date = new Date(dateText)

  if (Number.isNaN(date.getTime())) {
    return dateText
  }

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}
</script>

<template>
  <article class="blog-card">
    <div class="blog-card__meta">
      <time :datetime="props.post.publishedAt">{{ formatDate(props.post.publishedAt) }}</time>
      <span>{{ props.post.tags.join(' · ') }}</span>
    </div>

    <h3 class="blog-card__title">{{ props.post.title }}</h3>
    <p class="blog-card__summary">{{ props.post.summary }}</p>

    <RouterLink class="blog-card__link" :to="`/blog/${props.post.slug}`">阅读文章</RouterLink>
  </article>
</template>

<style scoped>
.blog-card {
  padding: 1.35rem;
  border-radius: 1rem;
  background: var(--surface-raised);
  border: 1px solid var(--line-subtle);
  display: grid;
  gap: 0.85rem;
}

.blog-card__meta {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.blog-card__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--text-primary);
  line-height: 1.35;
}

.blog-card__summary {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.75;
}

.blog-card__link {
  color: var(--brand-blue);
  text-decoration: none;
  font-size: 0.92rem;
  width: fit-content;
}

.blog-card__link:hover {
  text-decoration: underline;
}
</style>
