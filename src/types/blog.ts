export interface BlogPost {
  slug: string
  title: string
  summary: string
  publishedAt: string
  tags: string[]
  cover: string
  content: string
  status: 'draft' | 'published'
}
