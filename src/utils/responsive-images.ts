import { breakpoints, layouts } from './breakpoints';

export type Layout = 'one_column' | 'two_columns' | 'three_columns';
export type Width = 'base' | 'wide' | 'full';

type BreakpointSizes = Record<keyof typeof breakpoints, string>;
type BreakpointColumns = Record<keyof typeof breakpoints, number>;

const columns: Record<Layout, BreakpointColumns> = {
    one_column:    { lg: 1, md: 1, sm: 1, xs: 1 },
    two_columns:   { lg: 2, md: 2, sm: 2, xs: 1 },
    three_columns: { lg: 3, md: 2, sm: 2, xs: 1 },
};

const responsiveImages: Record<Layout, Record<Width, { sizes: BreakpointSizes; srcset: number[] }>> = {
    one_column: {
        base: {
            sizes: layouts.base,
            srcset: [360, 480, 576, 704, 1080, 1420],
        },
        wide: {
            sizes: layouts.wide,
            srcset: [360, 480, 736, 944, 1420, 1888],
        },
        full: {
            sizes: layouts.full,
            srcset: [360, 480, 720, 1080, 1600, 2400],
        },
    },
    two_columns: {
        base: {
            sizes: {
                lg: `calc((${layouts.base.lg} - 2rem) / 2)`,
                md: `calc((${layouts.base.md} - 2rem) / 2)`,
                sm: `calc((${layouts.base.sm} - 2rem) / 2)`,
                xs: layouts.base.xs,
            },
            srcset: [320, 480, 640, 960, 1280],
        },
        wide: {
            sizes: {
                lg: `calc((${layouts.wide.lg} - 2rem) / 2)`,
                md: `calc((${layouts.wide.md} - 2rem) / 2)`,
                sm: `calc((${layouts.wide.sm} - 2rem) / 2)`,
                xs: layouts.wide.xs,
            },
            srcset: [320, 480, 640, 912, 1280, 1600],
        },
        full: {
            sizes: {
                lg: `calc((${layouts.full.lg} - 2rem) / 2)`,
                md: `calc((${layouts.full.md} - 2rem) / 2)`,
                sm: `calc((${layouts.full.sm} - 2rem) / 2)`,
                xs: layouts.full.xs,
            },
            srcset: [320, 480, 640, 960, 1400],
        },
    },
    three_columns: {
        base: {
            sizes: {
                lg: `calc((${layouts.base.lg} - 4rem) / 3)`,
                md: `calc((${layouts.base.md} - 2rem) / 2)`,
                sm: `calc((${layouts.base.sm} - 2rem) / 2)`,
                xs: layouts.base.xs,
            },
            srcset: [280, 400, 576, 840, 1280],
        },
        wide: {
            sizes: {
                lg: `calc((${layouts.wide.lg} - 4rem) / 3)`,
                md: `calc((${layouts.wide.md} - 2rem) / 2)`,
                sm: `calc((${layouts.wide.sm} - 2rem) / 2)`,
                xs: layouts.wide.xs,
            },
            srcset: [320, 480, 640, 960, 1280],
        },
        full: {
            sizes: {
                lg: `calc((${layouts.full.lg} - 4rem) / 3)`,
                md: `calc((${layouts.full.md} - 2rem) / 2)`,
                sm: `calc((${layouts.full.sm} - 2rem) / 2)`,
                xs: layouts.full.xs,
            },
            srcset: [320, 480, 640, 960, 1400],
        },
    },
};

const buildSizesQuery = (sizes: BreakpointSizes, layout: Layout, span: number = 1) => Object.entries(sizes).reduce((carry, entry) => {
    const [breakpoint, value] = entry;
    const bp = breakpoint as keyof typeof breakpoints;
    const breakpointWidth = breakpoints[bp];
    const query = breakpointWidth ? `(min-width: ${breakpointWidth}) ` : '';
    const effectiveSpan = Math.min(span, columns[layout][bp]);
    const width = effectiveSpan > 1 ? `calc((${value}) * ${effectiveSpan})` : value;
    return `${carry}${carry ? ', ' : ''}${query}${width}`;
}, '');

export const buildImageConfig = (layout: Layout, width: Width, span: number = 1) => {
    const config = responsiveImages[layout][width];
    return {
        sizes: buildSizesQuery(config.sizes, layout, span),
        srcset: config.srcset,
    };
};
