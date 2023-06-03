// adding a certain book to the library
// a book should be added later

// type is objectType and properties the property of the objectType

import { Realm } from '@realm/react';
import { BasicBookInfo, Library } from '../../@types/googleBooks';
import { RealmBook, RealmLibrary } from '../schema';

export default function createLibrary(realm: any, type: keyof Library, data: BasicBookInfo) {
   const { id, thumbnail: _, ...bookInfo } = data;

   // next, have to account for switching libraries; just creating a book(?);
   //    console.log('selected type:', type);
   try {
      realm.write(() => {
         let library = realm.objects<RealmLibrary>('Library').filtered(`name = "${type}" `)[0];
         const newBook = realm.create<RealmBook>('Book', {
            id: id,
            // bookInfo: bookInfo,
         });
         if (!library) {
            const getLibraryType = type === 'reading' ? 'PRIMARY' : type;
            let newLibrary = realm.create<RealmLibrary>('Library', {
               name: getLibraryType,
               books: [],
            });
            newLibrary.books.push(newBook);
         }

         library.books.push(newBook);
      });
   } catch (err) {
      console.error(`Failed to write transaction in library for ${type}: `, err);
   }
}

// have to create remove(?);
