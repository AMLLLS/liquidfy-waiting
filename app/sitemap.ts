import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://liquidfy.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]
} 