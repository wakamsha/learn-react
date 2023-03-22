import type { BuildOptions, UserConfig } from 'vite';
type Props = {
    basePath: string;
    /**
     * @default 3000
     */
    port?: number;
    /**
     * @default {}
     */
    define?: Record<string, unknown>;
    /**
     * @default {}
     */
    build?: BuildOptions;
    /**
     * @default {}
     */
    alias?: Record<string, string>;
};
export declare function createUserConfig({ basePath, port, define, build, alias }: Props): UserConfig;
export {};
