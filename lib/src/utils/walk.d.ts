import type { Exclude } from '../types';
declare const walk: (src: string, exclude: Exclude, fn: (path: string) => void) => void;
export default walk;
