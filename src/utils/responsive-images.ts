import { breakpoints, layouts } from './breakpoints';

const buildSizesQuery = (sizes: Record<keyof typeof breakpoints, string>) => Object.entries(sizes).reduce((carry, entry) => {
    const [breakpoint, width] = entry;
    const breakpointWidth = breakpoint in breakpoints ? breakpoints[breakpoint as keyof typeof breakpoints] : breakpoint;
    const query = breakpointWidth ? `(min-width: ${breakpointWidth}) ` : '';
    return `${carry}${carry ? ', ' : ''}${query}${width}`;
}, '');

export const responsiveImages = {
    oneColumn: {
        base: {
            sizes: buildSizesQuery(layouts.base),
            srcset: [360, 480, 576, 704, 1080, 1420],
        },
        wide: {
            sizes: buildSizesQuery(layouts.wide),
            srcset: [360, 480, 736, 944, 1420, 1888],
        },
        full: {
            sizes: buildSizesQuery(layouts.full),
            srcset: [360, 480, 720, 1080, 1600, 2400],
        },
    },
    twoColumns: {
        base: {
            sizes: buildSizesQuery({
                lg: `calc((${layouts.base.lg} - 2rem) / 2)`,
                md: `calc((${layouts.base.md} - 2rem) / 2)`,
                sm: `calc((${layouts.base.sm} - 2rem) / 2)`,
                xs: layouts.base.xs,
            }),
            srcset: [320, 480, 640, 960, 1280],
        },
        wide: {
            sizes: buildSizesQuery({
                lg: `calc((${layouts.wide.lg} - 2rem) / 2)`,
                md: `calc((${layouts.wide.md} - 2rem) / 2)`,
                sm: `calc((${layouts.wide.sm} - 2rem) / 2)`,
                xs: layouts.wide.xs,
            }),
            srcset: [320, 480, 640, 912, 1280, 1600],
        },
        full: {
            sizes: buildSizesQuery({
                lg: `calc((${layouts.full.lg} - 2rem) / 2)`,
                md: `calc((${layouts.full.md} - 2rem) / 2)`,
                sm: `calc((${layouts.full.sm} - 2rem) / 2)`,
                xs: layouts.full.xs,
            }),
            srcset: [320, 480, 640, 960, 1400],
        },
    },
    threeColumns: {
        base: {
            sizes: buildSizesQuery({
                lg: `calc((${layouts.base.lg} - 4rem) / 3)`,
                md: `calc((${layouts.base.md} - 2rem) / 2)`,
                sm: `calc((${layouts.base.sm} - 2rem) / 2)`,
                xs: layouts.base.xs,
            }),
            srcset: [280, 400, 576, 840, 1280],
        },
        wide: {
            sizes: buildSizesQuery({
                lg: `calc((${layouts.wide.lg} - 4rem) / 3)`,
                md: `calc((${layouts.wide.md} - 2rem) / 2)`,
                sm: `calc((${layouts.wide.sm} - 2rem) / 2)`,
                xs: layouts.wide.xs,
            }),
            srcset: [320, 480, 640, 960, 1280],
        },
        full: {
            sizes: buildSizesQuery({
                lg: `calc((${layouts.full.lg} - 4rem) / 3)`,
                md: `calc((${layouts.full.md} - 2rem) / 2)`,
                sm: `calc((${layouts.full.sm} - 2rem) / 2)`,
                xs: layouts.full.xs,
            }),
            srcset: [320, 480, 640, 960, 1400],
        },
    },
}
