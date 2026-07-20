import { getCollection, type CollectionEntry } from "astro:content";

export const getBlogCollectionInOrder = async (): Promise<CollectionEntry<'blog'>[]> => {
    const blog = await getCollection('blog');
    return blog.sort((a, b) => a.id < b.id ? -1 : 1);
}

export const getFavouritesCollectionInOrder = async (): Promise<CollectionEntry<'favourites'>[]> => {
    const favourites = await getCollection('favourites');
    return favourites.sort((a, b) => a.id < b.id ? -1 : 1);
}

export const getSubjectsCollectionInOrder = async (): Promise<CollectionEntry<'subjects'>[]> => {
    const subjects = await getCollection('subjects');
    return subjects.sort((a, b) => a.data.sort - b.data.sort);
}

export const getProjectsCollectionInOrder = async (): Promise<CollectionEntry<'projects'>[]> => {
    const projects = await getCollection('projects');
    return projects
        .map(entry => {
            const date = entry.filePath!.split('/').pop()!.slice(0, 10);
            entry.data.date = new Date(date);
            return entry;
        })
        .sort((a, b) => b.data.date!.valueOf() - a.data.date!.valueOf());
};
