import { Button, Text } from 'react-native-paper';
import { AddBookNavigationProp } from '../../../library/@types/navigation';
import { BasicBookInfo, Library } from '../../../library/@types/googleBooks';
import createLibrary from '../../../library/realm/transaction/create';
import { Realm } from '@realm/react';
import { RealmBook, RealmLibrary } from '../../../library/realm/schema';

interface ButtonProps {
   store: Store[];
   select: string;
   navigation: AddBookNavigationProp['navigation'];
   bookInfo: BasicBookInfo;
   realm: Realm;
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
   navigation,
   bookInfo,
   realm,
   addToLibrary,
}: ButtonProps) => {
   const selectedName = store.find((data) => data.type === select);

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

   // if the book is already in realm library with a different name then
   // set the library.libraryType =
   const _createRealmObj = (type: Store['type'], data: BasicBookInfo) => {
      const { id, ..._ } = data;

      try {
         realm.write(() => {
            let library = realm.objects<RealmLibrary>('Library').filtered(`name = "${type}" `)[0];

            if (!library) {
               const getLibraryType = type === 'reading' ? 'PRIMARY' : type;
               library = realm.create<RealmLibrary>('Library', {
                  name: getLibraryType,
                  books: [],
               });
            }

            const existingBook = library.books.find((book) => book.id === id);
            if (existingBook) return;

            // TODO: create a library for finished and rereading
            const oldLibrary = realm
               .objects<RealmLibrary>('Library')
               .filtered(`books.id = "${id}" AND name != "${type}"`)[0];

            if (oldLibrary) {
               if (oldLibrary.name.includes('finished') && type === 'reading') {
               }
               const oldBook = oldLibrary.books.find((book) => book.id === id);
               realm.delete(oldBook);
            }

            const newBook = _createBook(realm, id, data);
            library.books.push(newBook);
         });
      } catch (err) {
         console.error(`Failed to write transaction in library for ${type}: `, err);
      }
   };

   return <Button onPress={onPress}>Save book</Button>;
};

export default UpdateBookButton;

const _createBook = (realm: Realm, id: string, data: BasicBookInfo) => {
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
   });
   return newBook;
};
