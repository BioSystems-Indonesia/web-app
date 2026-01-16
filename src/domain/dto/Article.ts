export interface ArticleRequest {
  title: string;
  subTitle: string;
  authorId: string;
  heroImage?: string;
  contentHtml: string;
  excerpt?: string;
  references?: string;
  status: string;
}

export interface ArticleSummary {
  title: string;
  excerpt: string;
  createdAt: Date;
  heroImage: string | null;
}
