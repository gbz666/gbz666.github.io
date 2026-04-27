export interface SiteSection {
  key: string
  title: string
  description: string
  status: 'ready' | 'coming-soon'
  path: string
}

export const siteSections: SiteSection[] = [
  {
    key: 'blog',
    title: '博客',
    description: '记录踩坑复盘、工程实践和思考过程。',
    status: 'ready',
    path: '/blog',
  },
  // 后续开放时取消注释。
  // {
  //   key: 'research',
  //   title: '研究内容',
  //   description: '预留研究主题与实验记录，后续按专题扩展。',
  //   status: 'coming-soon',
  //   path: '/research',
  // },
  // {
  //   key: 'notes',
  //   title: '学习笔记',
  //   description: '知识碎片与系统化笔记沉淀区。',
  //   status: 'coming-soon',
  //   path: '/notes',
  // },
  // {
  //   key: 'hobbies',
  //   title: '个人爱好',
  //   description: '生活侧内容预留，包括摄影、观影与兴趣项目。',
  //   status: 'coming-soon',
  //   path: '/hobbies',
  // },
]
