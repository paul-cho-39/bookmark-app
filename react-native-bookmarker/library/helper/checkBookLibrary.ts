import { Library } from '../@types/googleBooks';

// isBookInLibrary?
export function isBookInLibrary(library: Library | undefined, id: string) {
   if (library) {
      const allLibraryIds = Object.values(library).flat();
      return allLibraryIds.includes(id);
   }
}

export function isBookInLibraryList(library: Library | undefined, key: keyof Library, id: string) {
   if (library) {
      return library[key]?.includes(id);
   }
}

export function checkBookInLibrary(library: Library | undefined, id: string) {
   if (library) {
      const keys: string[] = [];
      (Object.keys(library) as (keyof Library)[]).forEach((key: keyof Library) => {
         const isInLib = isBookInLibraryList(library, key, id);
         isInLib && keys.push(key);
      });
      return keys;
   }
}
