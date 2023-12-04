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

   const language = bookInfo.language;
   const publisher = bookInfo.publisher;
   const publishedDate = bookInfo.publishedDate;

   const basicBookInfo = {
      id: id,
      thumbnail: thumbnail,
      title: title,
      subtitle: subtitle,
      authors: authors,
      page: page,
      language: language,
      publisher: publisher,
      publishedDate: publishedDate,
   };

   return basicBookInfo;
}

export { BasicBookInfo };
