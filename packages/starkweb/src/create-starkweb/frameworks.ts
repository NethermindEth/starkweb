import pc from 'picocolors';

type ColorFunc = (str: string | number) => string;

type FrameworkVariant = {
    name: string;
    display: string;
    color: ColorFunc;
    customCommand?: string;
};

export type Framework = {
    name: string;
    display: string;
    color: ColorFunc;
    variants: readonly FrameworkVariant[];
};

export const frameworks: readonly Framework[] = [
    {
        name: 'react',
        display: 'React',
        color: pc.cyan,
        variants: [
            {
                name: 'nextjs',
                display: 'Next App (Pages Router)',
                color: pc.green,
            },
            {
                name: 'nextjs-app',
                display: 'Next App (App Router)',
                color: pc.red,
            },
            {
                name: 'nextjs-siwe',
                display: 'Next App + SIWS',
                color: pc.blue,
            },
        ],
    },
];
