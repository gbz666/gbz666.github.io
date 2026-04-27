import { marked } from 'marked'
import type { BlogPost } from '../types/blog'
import proxy502Markdown from '../content/blog/proxy-502.md?raw'

type Frontmatter = Record<string, string>

const markdownSources = [proxy502Markdown]

function parseFrontmatter(markdown: string): { frontmatter: Frontmatter; content: string } {
  const frontmatterMatch = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)

  if (!frontmatterMatch) {
    return { frontmatter: {}, content: markdown.trim() }
  }

  const [, rawFrontmatter, rawContent] = frontmatterMatch
  const frontmatter = rawFrontmatter.split(/\r?\n/).reduce<Frontmatter>((acc, line) => {
    const separatorIndex = line.indexOf(':')

    if (separatorIndex === -1) {
      return acc
    }

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()
    acc[key] = value
    return acc
  }, {})

  return { frontmatter, content: rawContent.trim() }
}

function toBlogPost(markdown: string): BlogPost {
  const { frontmatter, content } = parseFrontmatter(markdown)

  return {
    slug: frontmatter.slug ?? 'untitled',
    title: frontmatter.title ?? '未命名文章',
    summary: frontmatter.summary ?? '',
    publishedAt: frontmatter.publishedAt ?? '',
    tags: (frontmatter.tags ?? '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    cover: frontmatter.cover ?? '',
    content,
    status: frontmatter.status === 'draft' ? 'draft' : 'published',
  }
}

const posts = markdownSources.map(toBlogPost)

export const blogPosts = posts.sort((a, b) => {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
})

export const publishedBlogPosts = blogPosts.filter((post) => post.status === 'published')

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function renderMarkdown(content: string): string {
  return marked.parse(content, { async: false }) as string
}
