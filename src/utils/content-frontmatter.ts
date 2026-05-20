import { getDateFromFilepath } from './dates.ts';

export function publishedDate() {
    return function (_: any, file: any) {
        const filepath = file.history[0];
        try {
            const date = getDateFromFilepath(filepath);
            file.data.astro.frontmatter.date = date;
        } catch {
            return;
        }
    };
}
