import { RealmBook, RealmLibrary } from '../../../schema';
import { Library as LibraryType } from '../../../../@types/googleBooks';
import { RealmLibraryResult } from '../../@realmTypes';

type Keys = keyof LibraryType;
export type RealmBooksType<T extends Keys> = T extends Keys
   ? { [K in T]: RealmBook[] }
   : { [K in Keys]: RealmBook[] };

export default class RealmLibraryRead {
   private library: RealmLibraryResult;

   constructor(library: RealmLibraryResult) {
      this.library = library;
   }
   get getPrimary() {
      const books = this.getBooks<'reading'>('reading');
      return books.reading.find((book) => book.isPrimary);
   }
   get allBooks(): RealmBooksType<any> {
      let allBooks: RealmBooksType<any> = {};
      const libraries = this.library;
      libraries.forEach((library) => {
         allBooks[library.name as Keys] = [...library.books];
      });

      return allBooks;
   }
   getBooks<Key extends Keys>(fetcher: Keys): RealmBooksType<Key> {
      const name = fetcher.toLocaleLowerCase(); // should be lower case
      const isCurrent = name === 'reading';
      const library = this.getLibrary(fetcher);

      if (!library) return {} as RealmBooksType<Key>;

      let currentLib: RealmBook[];
      if (isCurrent) {
         const currentlyReadingBooks = this.getCurrentlyReadingBookFromFinished();
         currentLib = [...library.books];
         currentlyReadingBooks && currentLib.push(currentlyReadingBooks);
      } else {
         currentLib = [...library.books];
      }

      return { [library.name]: currentLib } as RealmBooksType<Key>;
   }
   private getCurrentlyReadingBookFromFinished() {
      const finishedLib = this.getLibrary('finished');
      if (finishedLib) {
         return finishedLib.books.filtered(`currentlyReading = true`)[0];
      }
   }
   private getLibrary(name: Keys) {
      // feel like this should be refactord and create another class
      return this.library.filtered(`name = "${name}" `)[0];
   }
}
