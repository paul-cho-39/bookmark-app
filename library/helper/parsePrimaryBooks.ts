import { RealmBook } from '../realm/schema';

export default function parsePrimaryBooks(primaryBookData: RealmBook) {
   const authors = convertAuthorsToArray(primaryBookData.bookInfo.authors);
   return {
      id: primaryBookData.id,
      title: primaryBookData.bookInfo.title,
      subtitle: primaryBookData.bookInfo.subtitle,
      authors: authors,
      page: primaryBookData.bookInfo.page,
   };
}

type PrimaryData = ReturnType<typeof parsePrimaryBooks>;
export type { PrimaryData };

function convertAuthorsToArray(authors: string | undefined) {
   if (authors) {
      return authors.split(' ');
   }
}
