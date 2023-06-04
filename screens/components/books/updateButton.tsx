import { Button, Text } from 'react-native-paper';
import { AddBookNavigationProp } from '../../../library/@types/navigation';
import { BasicBookInfo, Library } from '../../../library/@types/googleBooks';
import createLibrary from '../../../library/realm/transaction/create';
import { Realm } from '@realm/react';
import { RealmBook, RealmLibrary } from '../../../library/realm/schema';

interface ButtonProps {
   store: Store[];
   select: string;
   isRereading: boolean;
   navigation: AddBookNavigationProp['navigation'];
   bookInfo: BasicBookInfo;
   realm: Realm;
   toDatePage?: number;
   addToLibrary?: (store: any) => void;
}

export interface Store {
   name: string;
   type: keyof Library;
   mutate: () => void | ((body: Record<string, string>) => void) | null;
}

const UpdateBookButton = ({
   store,
   select,
   toDatePage,
   isRereading,
   navigation,
   bookInfo,
   realm,
   addToLibrary,
}: ButtonProps) => {
   const selectedName = store.find((data) => data.type === select);
   console.log('pages:', toDatePage);
   const onPress = () => {
      if (selectedName && selectedName?.mutate) {
         // rereading and type here
         if (selectedName.type === 'reading') {
            // i dont unserstand this code(?) test this out;
            selectedName?.mutate();
         }

         selectedName.mutate();
         _createRealmObj(selectedName.type, bookInfo);
      }
      // if the mutate contains body, mutate is null
      addToLibrary;

      setTimeout(() => {
         navigation.navigate('Search');
      }, 1000);
   };

   const _createRealmObj = (type: Store['type'], data: BasicBookInfo) => {
      const { id, ..._ } = data;

      try {
         realm.write(() => {
            let library = realm.objects<RealmLibrary>('Library').filtered(`name = "${type}" `)[0];
            if (!library) {
               // initiating 'reading' if no reading library then the first is assigned as primary
               library = realm.create<RealmLibrary>('Library', {
                  name: type,
                  books: [],
               });
            }
            const isPrimary = _getIsPrimary(type, library);
            const existingBook = _checkExistingLib(library, id, toDatePage);

            // const existingBook = library.books.filtered(`id = "${id}"`)[0];
            // // TODO: pages for exisitng book for server side too
            // if (existingBook && !toDatePage) return;
            // if (existingBook && toDatePage) {
            //    existingBook.pageStart = toDatePage;
            // }

            const shouldProcessOldLib = _handleBookInDifferentLib(
               realm,
               id,
               type,
               isRereading,
               isPrimary
            );

            if (shouldProcessOldLib || existingBook) return;

            const newBook = _createBook(realm, id, data, isPrimary, isRereading, toDatePage);
            library.books.push(newBook);
         });
      } catch (err) {
         console.error(`Failed to write transaction in library for ${type}: `, err);
      }
   };

   return <Button onPress={onPress}>Save book</Button>;
};

export default UpdateBookButton;

const _createBook = (
   realm: Realm,
   id: string,
   data: BasicBookInfo,
   isPrimary: boolean,
   isRereading: boolean,
   toDatePage?: number
) => {
   const newBook = realm.create<RealmBook>('Book', {
      id: id,
      bookInfo: {
         title: data.title,
         subtitle: data?.subtitle,
         authors: data?.authors.toString(),
         page: data?.page,
         language: data?.language,
         publisher: data?.publisher,
         publishedDate: data?.publishedDate,
      },
      isPrimary: isPrimary,
      pageStart: !toDatePage ? 0 : toDatePage,
      numberOfRead: !isRereading ? 0 : 1,
   });
   return newBook;
};

const _checkExistingLib = (
   library: RealmLibrary & Realm.Object<unknown, never>,
   id: string,
   toDatePage?: number
) => {
   const existingBook = library.books.filtered(`id = "${id}"`)[0];
   // TODO: pages for exisitng book for server side too
   if (existingBook && !toDatePage) return true;
   if (existingBook && toDatePage) {
      existingBook.pageStart = toDatePage;
      return true;
   }
   return false;
};

const _getIsPrimary = (
   type: Store['type'],
   library: RealmLibrary & Realm.Object<unknown, never>
) => {
   let isPrimary = false;
   if (type === 'reading' && library && library.books.length < 1) {
      isPrimary = true;
   }

   return isPrimary;
};

const _handleBookInDifferentLib = (
   realm: Realm,
   id: string,
   type: Store['type'],
   isPrimary: boolean,
   isRereading: boolean
) => {
   const oldLibrary = realm
      .objects<RealmLibrary>('Library')
      .filtered(`books.id = "${id}" AND name != "${type}"`)[0];

   if (oldLibrary) {
      const oldBook = oldLibrary.books.find((book) => book.id === id);
      if (oldBook && oldLibrary.name.includes('finished') && type === 'reading' && isRereading) {
         oldBook.currentlyReading = true;
         oldBook.numberOfRead! += 1;
         oldBook.isPrimary = isPrimary;
         return true;
      }
      if (oldBook) {
         realm.delete(oldBook);
      }
   }
   return false;
};
