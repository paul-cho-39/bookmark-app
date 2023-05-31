import { Items } from '../@types/googleBooks';
import { BasicBookInfo } from '../@types/googleBooks';

export default function getBasicBookInfo(book: Items<Record<string, string>>) {
   const id = book.id;
   // rest of book info that is needed
   const bookInfo = book?.volumeInfo;
   const thumbnail = bookInfo?.imageLinks && bookInfo?.imageLinks.thumbnail;
   const title = bookInfo.title;
   const subtitle = bookInfo.subtitle;
   const authors = bookInfo.authors;
   const page = bookInfo.pageCount;

   const basicBookInfo = {
      id: id,
      thumbnail: thumbnail,
      title: title,
      subtitle: subtitle,
      authors: authors,
      page: page,
   };

   return basicBookInfo;
}

export { BasicBookInfo };
