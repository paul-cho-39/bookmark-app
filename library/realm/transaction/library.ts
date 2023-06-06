import { Realm } from '@realm/react';
import { RealmBook, RealmLibrary } from '../schema';

type AllBooks = { [key: string]: RealmBook[] };

// TODO: come up with a better name
export default class RealmLibraryEditor {
   private realm: Realm;

   constructor(realm: Realm) {
      this.realm = realm;
   }
   get booksInLibrary(): AllBooks {
      let allBooks: AllBooks = {};
      const libraries = this.realm.objects<RealmLibrary>('Library');
      libraries.forEach((library) => {
         allBooks[library.name] = [...library.books];
      });
      return allBooks;
   }
   booksInEachLibrary(fetcher: 'CURRENT' | 'READING' | 'FINISHED') {
      const name = fetcher.toLocaleLowerCase();
      const library = this.realm.objects<RealmLibrary>('Library').filtered(`name = "${name}"`)[0];
      return library ? { [library.name]: library.books } : {};
   }
   changePrimary(id: string) {
      const library = this.realm
         .objects<RealmLibrary>('Library')
         .filtered(`name = "finished" OR name = "current `)[0];
      const book = library.books.find((book) => book.id === id);
      const currentPrimary = this.getCurrentPrimary();
      if (book) {
         currentPrimary && (currentPrimary.isPrimary = false);
         book.isPrimary = true;
      }
   }
   deleteBook(id: string) {
      const libraries = this.getLibraryWithIds(id);
      libraries.forEach((lib) => {
         const toDelete = lib.books.find((book) => book.id === id);
         this.realm.delete(toDelete);
      });
   }
   private getCurrentPrimary() {
      return this.realm.objects<RealmBook>('Book').find((book) => book.isPrimary);
   }
   private getLibraryWithIds(id: string) {
      return this.realm.objects<RealmLibrary>('Library').filtered(`books.id = "${id}" `);
   }
}
