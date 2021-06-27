export type Exclude = string | string[]

export type Config = {
    src: string;
    dst: string;
    exclude: string[];
    workBranchName: string;
}

export type WatchOptions = {
    watch?: boolean;
    delay?: number;
}

export type ConfigWriterProps = Partial<Omit<Config, 'exclude'>>

export type ConfigWriterPropsKeys = keyof ConfigWriterProps
