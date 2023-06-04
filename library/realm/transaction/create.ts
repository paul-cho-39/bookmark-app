import { Realm } from '@realm/react';
import { BasicBookInfo, Library } from '../../@types/googleBooks';
import { RealmBook, RealmLibrary } from '../schema';
import { Store } from '../../../screens/components/books';

export default class RealmBookCreator {
   private realm: Realm;

   constructor(realm: Realm) {
      this.realm = realm;
   }

   getOrCreateLibrary(type: Store['type']): RealmLibrary {
      let library = this.realm.objects<RealmLibrary>('Library').filtered(`name = "${type}" `)[0];
      if (!library) {
         library = this.realm.create<RealmLibrary>('Library', { name: type, books: [] });
      }
      return library;
   }

   createNewBook(
      id: string,
      data: BasicBookInfo,
      isPrimary: boolean,
      isRereading: boolean,
      toDatePage?: number
   ): RealmBook {
      const newBook = this.realm.create<RealmBook>('Book', {
         id,
         bookInfo: {
            title: data.title,
            subtitle: data?.subtitle,
            authors: data?.authors.toString(),
            page: data?.page,
            language: data?.language,
            publisher: data?.publisher,
            publishedDate: data?.publishedDate,
         },
         isPrimary,
         pageStart: toDatePage ?? 0,
         numberOfRead: isRereading ? 1 : 0,
      });
      return newBook;
   }

   getExistingBook(library: RealmLibrary, id: string, toDatePage?: number): boolean {
      const existingBook = library.books.filtered(`id = "${id}"`)[0];
      if (existingBook) {
         if (toDatePage) existingBook.pageStart = toDatePage;
         return true;
      }
      return false;
   }

   isBookPrimary(type: Store['type'], library: RealmLibrary): boolean {
      return type === 'reading' && library && library.books.length < 1;
   }

   handleBookInOtherLib(
      id: string,
      type: Store['type'],
      isPrimary: boolean,
      isRereading: boolean
   ): boolean {
      const oldLibrary = this.realm
         .objects<RealmLibrary>('Library')
         .filtered(`books.id = "${id}" AND name != "${type}"`)[0];

      if (oldLibrary) {
         const oldBook = oldLibrary.books.find((book) => book.id === id);
         if (oldBook && oldLibrary.name.includes('finished') && type === 'reading' && isRereading) {
            oldBook.currentlyReading = true;
            oldBook.numberOfRead! += 1;
            oldBook.isPrimary = isPrimary;
            return true;
         }
         if (oldBook) {
            this.realm.delete(oldBook);
         }
      }
      return false;
   }
}
