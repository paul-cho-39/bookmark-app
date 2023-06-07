import { RealmBook, RealmLibrary } from '../../schema';
import { Library as LibraryType } from '../../../@types/googleBooks';
import { RealmLibraryResult } from '../@realmTypes';

type Keys = keyof LibraryType;
export type RealmBooksType<T extends Keys> = T extends Keys
   ? { [K in T]: RealmBook[] }
   : { [K in Keys]: RealmBook[] };

export default class RealmLibraryRead {
   private library: RealmLibraryResult;

   constructor(library: RealmLibraryResult) {
      this.library = library;
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

// export default class RealmLibraryEditor {
//    private realm: Realm;

//    constructor(realm: Realm) {
//       this.realm = realm;
//    }
//    get booksInLibrary(): RealmBooksType<any> {
//       let allBooks: RealmBooksType<any> = {};
//       const libraries = this.realm.objects<RealmLibrary>('Library');
//       libraries.forEach((library) => {
//          allBooks[library.name as Keys] = [...library.books];
//       });
//       return allBooks;
//    }
//    booksInEachLibrary<Key extends Keys>(fetcher: Keys): RealmBooksType<Key> {
//       const name = fetcher.toLocaleLowerCase(); // should be lower case
//       const isCurrent = name === 'reading';
//       const library = this.getLibrary(fetcher);

//       if (!library) return {} as RealmBooksType<Key>;

//       let currentLib: RealmBook[];
//       if (isCurrent) {
//          const currentlyReadingBooks = this.getCurrentlyReadingBookFromFinished();
//          currentLib = [...library.books];
//          currentlyReadingBooks && currentLib.push(currentlyReadingBooks);
//       } else {
//          currentLib = [...library.books];
//       }

//       return { [library.name]: currentLib } as RealmBooksType<Key>;
//    }
//    changePrimary(id: string) {
//       const library = this.realm
//          .objects<RealmLibrary>('Library')
//          .filtered(`name = "finished" OR name = "current `)[0];
//       const book = library.books.find((book) => book.id === id);
//       const currentPrimary = this.getCurrentPrimary();
//       if (book) {
//          currentPrimary && (currentPrimary.isPrimary = false);
//          book.isPrimary = true;
//       }
//    }
//    deleteBook(id: string) {
//       const libraries = this.getLibraryWithIds(id);
//       libraries.forEach((lib) => {
//          const toDelete = lib.books.find((book) => book.id === id);
//          this.realm.delete(toDelete);
//       });
//    }
//    private getCurrentlyReadingBookFromFinished() {
//       const finishedLib = this.getLibrary('finished');
//       if (finishedLib) {
//          return finishedLib.books.filtered(`currentlyReading = true`)[0];
//       }
//    }
//    private getLibrary(name: Keys) {
//       // feel like this should be refactord and create another class
//       return this.realm.objects<RealmLibrary>('Library').filtered(`name = "${name}" `)[0];
//    }
//    private getCurrentPrimary() {
//       return this.realm.objects<RealmBook>('Book').find((book) => book.isPrimary);
//    }
//    private getLibraryWithIds(id: string) {
//       return this.realm.objects<RealmLibrary>('Library').filtered(`books.id = "${id}" `);
//    }
// }
