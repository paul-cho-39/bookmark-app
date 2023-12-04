function _normalizeAuthorString(author: string) {
   return author.toLowerCase().replace(/(^|\s|-)\S/g, (c) => c.toUpperCase());
}

function getAuthorCutoff(
   authors: string[] | undefined,
   authorCutoff: number,
   singleAuthorCutoff: number
): string[] | string | undefined {
   if (!authors) return;
   const numberOfAuthors = authors?.length;
   if (numberOfAuthors === 1) {
      return authors[0].length < authorCutoff - singleAuthorCutoff
         ? _normalizeAuthorString(authors[0])
         : _normalizeAuthorString(authors[0].slice(0, authorCutoff - singleAuthorCutoff)) + '...';
   }

   return authors?.toString().length < authorCutoff
      ? authors
      : getAuthorCutoff(authors?.slice(0, numberOfAuthors - 1), authorCutoff, singleAuthorCutoff);
}

function createAbbreviationForAuthors(
   author: string,
   numberOfAuthors: number,
   numberOfAuthorToCut: number,
   index: number,
   editedAuthorLength: number
) {
   const normalizedAuthor = _normalizeAuthorString(author);
   const normalizedIndex = index + 1;

   if (numberOfAuthors == normalizedIndex) {
      return normalizedAuthor;
   }
   if (
      numberOfAuthors > normalizedIndex &&
      (normalizedIndex == numberOfAuthorToCut || editedAuthorLength == normalizedIndex)
   ) {
      return normalizedAuthor + '...';
   }
   if (normalizedIndex < numberOfAuthorToCut) {
      return normalizedAuthor + ', ';
   }
   return normalizedAuthor;
}

export { getAuthorCutoff, createAbbreviationForAuthors };
