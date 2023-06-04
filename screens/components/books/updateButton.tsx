import { Button, Text } from 'react-native-paper';
import { AddBookNavigationProp } from '../../../library/@types/navigation';
import { BasicBookInfo, Library } from '../../../library/@types/googleBooks';
import { Realm } from '@realm/react';
import { RealmBook, RealmLibrary } from '../../../library/realm/schema';

import RealmBookCreator from '../../../library/realm/transaction/create';

interface ButtonProps {
   store: Store[];
   select: string;
   isRereading: boolean;
   navigation: AddBookNavigationProp['navigation'];
   bookInfo: BasicBookInfo;
   realm: Realm;
   toDatePage?: number;
   addToLibrary: () => void;
}

type ReadingStore = {
   name: string;
   type: 'reading';
   value: string;
   mutate: (isRereading: boolean) => void;
};

type OtherStore = {
   name: string;
   type: 'want' | 'finished';
   value: null;
   mutate: () => void;
};

type SelectedType = Store | undefined;
export type Store = ReadingStore | OtherStore;

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
   const selected = store.find((data) => data.type === select);

   const onPress = () => {
      if (!selected) return;

      const action = storeMap[selected.type] || storeMap.default;
      action(selected);

      selected && _createRealmObj(selected.type, bookInfo);

      setTimeout(() => {
         navigation.navigate('Search');
      }, 1000);
   };

   const storeMap: Record<string, (selected: SelectedType) => void> = {
      reading: (selected: SelectedType) => {
         const page = parseInt(selected?.value || '0');
         page <= 0 ? selected?.mutate(isRereading) : addToLibrary();
      },
      default: (selected: SelectedType) => {
         if ((selected as OtherStore)?.mutate) {
            (selected as OtherStore).mutate();
         }
      },
   };
   // for local database; this will not send data to the server since it will require
   // google book api to get access. The local database is for later use case, in which calls for
   // data consistency between local database and server
   const _createRealmObj = (type: Store['type'], data: BasicBookInfo) => {
      const { id, ..._ } = data;

      try {
         realm.write(() => {
            const init = new RealmBookCreator(realm);
            const library = init.getOrCreateLibrary(type);
            const isPrimary = init.isBookPrimary(type, library);
            const existingBook = init.getExistingBook(library, id, toDatePage);
            const shouldProcessOldLib = init.handleBookInOtherLib(id, type, isRereading, isPrimary);

            if (shouldProcessOldLib || existingBook) return;
            const newBook = init.createNewBook(id, data, isPrimary, isRereading, toDatePage);
            library.books.push(newBook);
         });
      } catch (err) {
         console.error(`Failed to write transaction in library for ${type}: `, err);
      }
   };

   return <Button onPress={onPress}>Save book</Button>;
};

export default UpdateBookButton;
