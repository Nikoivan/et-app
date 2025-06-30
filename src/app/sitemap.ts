import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ay-petry.ru',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1
    }
  ];
}
