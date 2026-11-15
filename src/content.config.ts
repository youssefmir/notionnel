import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
const modules = defineCollection({
  loader: glob({ base: './src/content/modules', pattern: '*.md' }),
  schema: z.object({
    id: z.number().int().positive(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    title: z.string().min(1),
    subtitle: z.string().min(1),
    minutes: z.number().int().positive(),
    chapter: z.string().min(1),
    optional: z.boolean().default(false),
  }),
});
export const collections = { modules };
