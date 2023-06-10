import { Realm } from '@realm/react';
import { RealmBook } from '../../../schema';
import { RealmBookResult, RealmLibraryResult } from '../../@realmTypes';

export default class RealmBookEditor {
   private realm: Realm;
   private library: RealmLibraryResult;
   constructor(realm: Realm, library: RealmLibraryResult) {
      this.realm = realm;
      this.library = library;
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
      const library = this.library.filtered(`name = "finished" OR name = "current `)[0];
      return library.books.find((book) => book.isPrimary === true);
   }
   private getLibraryWithIds(id: string) {
      return this.library.filtered(`books.id = "${id}" `);
   }
}
