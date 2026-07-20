import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const LAYOUTS = ['one_column', 'two_columns', 'three_columns'] as const;
export const WIDTHS = ['base', 'wide', 'full'] as const;
export const ICON_STYLES = ['solid', 'regular', 'brands'] as const;

export const collections = {
    blog: defineCollection({
        loader: file(
            'src/content/blog.json',
            {
                parser: (json) => {
                    const content = JSON.parse(json);
                    return content.map((entry: any, index: number) => ({
                        id: `${String(index).padStart(4, '0')}-${entry.date}`,
                        ...entry,
                    }))
                }
            }
        ),
        schema: ({ image }) => z.object({
            date: z.coerce.date(),
            image: z.object({
                file: image(),
                alt: z.string(),
            }),
            caption: z.string().optional(),
            link: z.object({
                text: z.string(),
                url: z.string(),
                icon: z.string().optional(),
                iconStyle: z.enum(ICON_STYLES).optional(),
            }).optional(),
        }),
    }),
    subjects: defineCollection({
        loader: glob({
            pattern: '*.json',
            base: "./src/content/subjects",
        }),
        schema: ({ image }) => z.object({
            sort: z.number(),
            layout: z.enum(LAYOUTS),
            title: z.string(),
            description: z.string(),
            image: image(),
            photos: z.array(z.object({
                src: image(),
                span: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
            })),
        }),
    }),
    projects: defineCollection({
        loader: glob({
            pattern: '*.md',
            base: "./src/content/projects",
            generateId: ({ entry }) => entry.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, ''),
        }),
        schema: ({ image }) => z.object({
            date: z.date().optional(),
            title: z.string(),
            headline: z.string().optional(),
            layout: z.enum(LAYOUTS),
            width: z.enum(WIDTHS),
            themeColor: z.string().regex(/^#[0-9a-f]{6}$/i).optional(),
            image: image(),
            photos: z.array(image()),
        }),
    }),
    favourites: defineCollection({
        loader: file(
            'src/content/favourites.json',
            {
                parser: (json) => {
                    const content = JSON.parse(json);
                    return content.map((image: string, index: number) => ({
                        id: `${String(index).padStart(4, '0')}-${image}`,
                        image,
                    }))
                }
            }
        ),
        schema: ({ image }) => z.object({
            image: image(),
        }),
    }),
}
