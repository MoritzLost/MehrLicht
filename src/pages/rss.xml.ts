import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { getBlogCollectionInOrder } from '@utils/collections';

export const GET: APIRoute = async context => {
    const blog = await getBlogCollectionInOrder();
    const blogReversed = [...blog].reverse();

    const items = await Promise.all(
        blogReversed.map(async entry => {
            const image = await getImage({ src: entry.data.image.file, width: 1600, quality: 'high' });
            const format = entry.data.image.file.format === 'jpg' ? 'jpeg' : entry.data.image.file.format;

            return {
                title: entry.data.caption || entry.data.image.alt,
                pubDate: entry.data.date,
                description: entry.data.image.alt,
                link: `/blog/#post-${entry.id}`,
                enclosure: {
                    url: image.src,
                    length: 0,
                    type: `image/${format}`,
                },
            };
        }),
    );

    return rss({
        title: 'Moritz L’Hoest – Photo Blog',
        description: 'Photo blog by Moritz L’Hoest',
        site: context.site!,
        items,
        xmlns: { atom: 'http://www.w3.org/2005/Atom' },
        customData: `<language>en</language><atom:link href="${new URL('rss.xml', context.site)}" rel="self" type="application/rss+xml"/>`,
    });
};
