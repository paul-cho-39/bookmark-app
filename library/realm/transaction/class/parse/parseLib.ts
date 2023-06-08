import { CurrentRealmBookData } from '../../../../@types/googleBooks';
import { RealmBook } from '../../../schema';

const PRIMARY = 'PRIMARY';
const READING = 'CURRENTLY_READING';

export default class ParseLibrary {
   uncleanedBooks: RealmBook[];
   constructor(uncleanedBooks: RealmBook[]) {
      this.uncleanedBooks = uncleanedBooks;
   }
   get getCleanedData() {
      return this.shuffleData();
   }
   shuffleData() {
      // normalize this data so that it can be set differently
      const unshuffledBooks = this.uncleanedBooks.map((book) => this.normalize(book));
      const primaryIndex = unshuffledBooks.findIndex((book) => book.type === PRIMARY);
      if (primaryIndex >= 0) {
         unshuffledBooks.splice(1, 0, unshuffledBooks.splice(primaryIndex, 1)[0]);
      }

      unshuffledBooks.push(this._dummyData());
      unshuffledBooks.unshift(this._dummyData());

      return unshuffledBooks as CurrentRealmBookData[];
   }
   normalize(book: RealmBook) {
      const type = this.getBookTypes(book);
      const authors = this.authorToArray(book);
      return {
         id: book.id,
         title: book.bookInfo.title,
         subtitle: book.bookInfo?.subtitle,
         authors,
         page: book.bookInfo?.pageCount,
         language: book.bookInfo?.language,
         publisher: book.bookInfo?.publisher,
         publishedDate: book.bookInfo?.publishedDate,
         type: type as CurrentRealmBookData['type'],
      };
   }
   // since authors cannot be referred as string[] this method normalizes authors
   private authorToArray(book: RealmBook) {
      const authors = book.bookInfo?.authors;
      if (authors) {
         return authors.split(',');
      }
   }
   private getBookTypes(book: RealmBook) {
      return book.isPrimary ? PRIMARY : READING;
   }
   private _dummyData(): CurrentRealmBookData {
      return {
         id: '',
         title: '',
         subtitle: '',
         language: '',
         page: undefined,
         publishedDate: '',
         publisher: '',
         authors: [],
         type: 'DUMMY' as CurrentRealmBookData['type'],
      };
   }
}
