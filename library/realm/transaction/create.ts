import { Realm } from '@realm/react';
import { BasicBookInfo, Library } from '../../@types/googleBooks';
import { RealmBook, RealmLibrary, RealmLogs } from '../schema';
import { Store } from '../../../screens/components/books';

interface NewBookParams {
   id: string;
   data: Partial<BasicBookInfo>;
   isPrimary: boolean;
   isRereading: boolean;
   toDatePage?: number;
   logs?: RealmLogs;
}

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

   createNewBook({ id, data, isPrimary, isRereading, toDatePage }: NewBookParams): RealmBook {
      const newBook = this.realm.create<RealmBook>('Book', {
         id,
         bookInfo: {
            title: data.title,
            subtitle: data?.subtitle,
            authors: data?.authors?.toString(),
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

   handleBookInOtherLib(id: string, type: Store['type'], isPrimary: boolean, isRereading: boolean) {
      const oldLibrary = this.getOldLibrary(id, type);
      if (oldLibrary) {
         const oldBook = oldLibrary.books.find((book) => book.id === id);
         if (oldBook && oldLibrary.name.includes('finished') && type === 'reading' && isRereading) {
            oldBook.currentlyReading = true;
            oldBook.numberOfRead! += 1;
            oldBook.isPrimary = isPrimary;
            return true;
         }
         if (oldBook) {
            return oldBook;
         }
      }
      return false;
   }
   addBookToLibrary(
      library: RealmLibrary,
      oldBook: RealmBook | false,
      newBookParams: NewBookParams
   ) {
      if (oldBook) {
         const newBook = this.createNewBook(this.normalizeOldBook(oldBook));
         library.books.push(newBook);
         this.realm.delete(oldBook);
      } else {
         const newBook = this.createNewBook(newBookParams);
         library.books.push(newBook);
      }
   }
   private getOldLibrary(id: string, type: Store['type']) {
      return this.realm
         .objects<RealmLibrary>('Library')
         .filtered(`books.id = "${id}" AND name != "${type}"`)[0];
   }
   private getOldBook(id: string, type: Store['type']) {
      const oldLibrary = this.getOldLibrary(id, type);
      if (oldLibrary) {
         const oldBook = oldLibrary.books.find((book) => book.id === id);
         return oldBook;
      }
   }
   // CONSIDER: have this in another class
   // so it will normalize ALL realm objects so it will be easier to manipulate
   private normalizeOldBook(oldBook: RealmBook): NewBookParams {
      return {
         id: oldBook.id,
         data: {
            title: oldBook.bookInfo.title,
            subtitle: oldBook.bookInfo.subtitle,
            authors: oldBook.bookInfo.authors ? oldBook.bookInfo.authors.split(',') : [],
            page: oldBook.bookInfo.page,
            language: oldBook.bookInfo.language,
            publisher: oldBook.bookInfo.publisher,
            publishedDate: oldBook.bookInfo.publishedDate,
         },
         isPrimary: oldBook.isPrimary,
         isRereading: !!oldBook.currentlyReading,
         toDatePage: oldBook.pageStart,
         // add logs here once it is completed and likely have to use it from another class(?);
      };
   }
}
