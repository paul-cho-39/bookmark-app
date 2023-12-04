import Config from '../config';

export const getCompleteUrl = (
   search: string,
   maxResultNumber: number = 15,
   pageIndex: number = 0
): string => {
   const GOOGLE_BOOK_KEY = Config.GOOGLE_BOOK_KEY;
   const url = 'https://www.googleapis.com/books/v1/volumes?q=';
   const index = `&startIndex=${pageIndex}`;
   const maxResult = `&maxResults=${maxResultNumber}`;
   const rest = `&orderBy=relevance&printType=books&key=${GOOGLE_BOOK_KEY}`;

   return url + search + index + maxResult + rest;
};

export const getDataByVolumeId = (id: string) => {
   const GOOGLE_BOOK_KEY = Config.GOOGLE_BOOK_KEY;
   const url = 'https://www.googleapis.com/books/v1/volumes/';
   const keys = `&key=${GOOGLE_BOOK_KEY}`;
   return url + id;
};
