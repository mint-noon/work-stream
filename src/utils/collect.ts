import walk from './walk';

const collect = (src: string, exclude: string[]): string[] => {
    const collection: string[] = [];

    walk(src, exclude, (path: string) => {
        collection.push(path.replace(src, ''));
    });

    return collection;
};

export default collect;
