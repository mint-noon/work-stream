import {
    statSync,
    readFileSync,
    writeFileSync,
    existsSync,
    ensureLinkSync,unlinkSync
} from 'fs-extra';
import { join } from 'path';
import collect from './collect';


const TIME_DIFF_THRESHOLD = 1*1000;

export interface FilesCollection {
    path:string; collection:string[];
}

export const readFolder = (path: string, ignore: string[]): FilesCollection => {
    return {path,collection:collect(path, ignore)};
};

/**
 * Dest directory will be a hard-link mirror for the source directory
 *
 * @param {string} src - source files collection
 * @param {string} dst - target files collection
 * @param {string} ignore - file to be excluded
 */
export const syncFolders = (src: FilesCollection, dst: FilesCollection): void => {
    const srcCollectionSet = new Set(src.collection);
    const filesToDelete = dst.collection.filter((file)=>!srcCollectionSet.has(file));

    for (const file of filesToDelete) {
        const dstPath = join(dst.path, file);
        unlinkSync(dstPath);
    }

    // TODO а как быть с удалениями?
    // По идее mirror нужно разбить на два вызова
    // Для того чтобы выполнить задачу нужно три слепка данных
    // 1.src в начале операции
    // 2.dst в начале операции
    // 3.dst после merge из master
    // Первую нужно вызывать вначале syncFolders(1.src, 2.dst)
    // Потому что изменения мог внести пользователь
    // Она считает удалением исчезновение файла в 1.src по сравнению с 2.dst
    // Эти изменения коммитим и делаем push
    // А затем нужно сделать merge из master
    // Это может привести к удалению и изменению файлов в dst, поэтому его мы сканируем заного
    // Получая новый массив данных 3.dst
    // Вызываем вторую функцию syncFolders(3.dst, 1.src)
    //
    // Задача каждого вызова - перенести состояние src в dst, а не наоборот!

    for (const file of src.collection) {
        const dstPath = join(dst.path, file);
        const srcPath = join(src.path, file);

        if (!existsSync(dstPath))
            ensureLinkSync(srcPath, dstPath);
        else
        {
            const srcStat = statSync(srcPath);
            const dstStat = statSync(dstPath);
            const timeDiff = srcStat.mtimeMs - dstStat.mtimeMs;
            const sizeDiffAbs = Math.abs(srcStat.size-dstStat.size);

            if(sizeDiffAbs || Math.abs(timeDiff)> TIME_DIFF_THRESHOLD) {
                unlinkSync(dstPath);
                ensureLinkSync(srcPath, dstPath);
            }
        }
    }
};
