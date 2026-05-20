export const getDateFromFilepath = (filepath: string): Date => {
    const filename = filepath.split('/').slice(-1)[0];
    const result = filename.match(/^\d{4}-\d{2}-\d{2}/);
    if (!result) throw new Error(`No date found in filename: ${filename}`);
    return new Date(result[0]);
};
