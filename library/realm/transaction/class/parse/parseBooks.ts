import { RealmBook } from '../../schema';
import { RealmBooksType } from '../class/library';

export default class ParseBooks {
   book?: RealmBook;
   books?: RealmBooksType;

   constructor(book: RealmBook, books: RealmBooksType) {
      this.book = book;
      this.books = books;
   }
}
