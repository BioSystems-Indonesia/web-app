'use client';

import { useArticleContentImageFix } from '@/lib/helper/useArticleContentImageFix';

interface ArticleContentProps {
  contentHtml: string;
}

export default function ArticleContent({ contentHtml }: ArticleContentProps) {
  const contentRef = useArticleContentImageFix();

  return (
    <div 
      ref={contentRef}
      className="article-content" 
      dangerouslySetInnerHTML={{ __html: contentHtml }} 
    />
  );
}
