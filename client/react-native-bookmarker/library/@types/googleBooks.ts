import getBasicBookInfo from '../helper/getBasicBookInfo';
import { RealmBook } from '../realm/schema';

export interface Data<T extends Record<string, string>> {
   pageParams?: unknown[] | [];
   pages: Array<Pages<T>>;
}

export interface Pages<T extends Record<string, string>> {
   items: Array<Items<T>>;
   totalItems?: number;
}

export interface Items<T extends Record<string, string>> {
   accessInfo?: T;
   readonly etag?: string;
   id: string;
   readonly kind?: string;
   saleInfo?: T;
   searchInfo?: T;
   readonly selfLink: string;
   volumeInfo: VolumeInfo;
}

export interface VolumeInfo {
   authors: string[];
   averageRating?: number;
   categories?: string[];
   pageCount?: number;
   publishedDate?: string;
   publisher?: string;
   subtitle?: string;
   title: string;
   imageLinks?: Record<string, string>;
   language?: string;
   industryIdentifiers?: IndustryIdentifiers[];
}

export type ImageProps = VolumeInfo['imageLinks'];

export type IndustryIdentifiers = {
   type: 'ISBN_10' | 'ISBN-13' | 'ISSN' | 'OTHER';
   identifier: string;
};

export type BookIdProps = { id: string };

export interface Book {
   // id: string;
   authors: string[];
   categories: string[];
   description: string;
   imageLinks?: Partial<ImageLinks>;
   industryIdentifiers: IndustryIdentifiers[];
   language: string;
   pageCount: number;
   publishedDate: string;
   publisher: string;
   subtitle: string;
   title: string;
}

export interface ImageLinks {
   extraLarge: string;
   large: string;
   medium: string;
   small: string;
   smallThumbnail: string;
   thumbnail: string;
}

export type ImageLinksPairs = Pick<ImageLinks, 'thumbnail' | 'smallThumbnail'>;

export interface Library {
   reading: string[] | undefined;
   want: string[] | undefined;
   finished: string[] | undefined;
}

// TODO: switch out the data here

export type BasicBookInfo = ReturnType<typeof getBasicBookInfo>;

export interface CurrentRealmBookData extends Omit<BasicBookInfo, 'thumbnail'> {
   type: 'CURRENTLY_READING' | 'PRIMARY' | 'DUMMY';
}

export interface CurrentRealmBook {
   data: {
      reading: RealmBook[];
   };
}

// export interface CurrentBook {
//    data: CurrentBookData[];
// }
// export interface CurrentBookData extends BasicBookInfo {
//    type: 'CURRENTLY_READING' | 'PRIMARY' | 'DUMMY';
//    date?: Date | undefined;
// }

export type QueryData = { data: Library };
