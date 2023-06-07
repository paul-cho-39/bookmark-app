import { Realm } from '@realm/react';
import { RealmBook } from '../../../schema';
import { RealmBookResult, RealmLibraryResult } from '../../@realmTypes';

export default class RealmBookEditor {
   private book: RealmBookResult;
   private library: RealmLibraryResult;
   private realm: Realm;
   constructor(book: RealmBookResult, library: RealmLibraryResult, realm: Realm) {
      this.book = book;
      this.library = library;
      this.realm = realm;
   }
   changePrimary(id: string) {
      const library = this.library.filtered(`name = "finished" OR name = "current `)[0];
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
      return this.book.find((book) => book.isPrimary);
   }
   private getLibraryWithIds(id: string) {
      return this.library.filtered(`books.id = "${id}" `);
   }
}
