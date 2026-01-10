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
