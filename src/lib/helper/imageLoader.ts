export function ensureAbsoluteImageUrl(url: string | null | undefined): string {
  if (!url) return '/logo.png';
  
  // Already absolute URL
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Relative URL - make it absolute
  if (url.startsWith('/')) {
    // In production
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${url}`;
    }
    // During SSR
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://biosystems.id';
    return `${baseUrl}${url}`;
  }
  
  return url;
}

export function getImageProps(src: string | null | undefined) {
  const absoluteUrl = ensureAbsoluteImageUrl(src);
  
  return {
    src: absoluteUrl,
    loading: 'eager' as const,
    decoding: 'async' as const,
    fetchPriority: 'high' as const,
  };
}
