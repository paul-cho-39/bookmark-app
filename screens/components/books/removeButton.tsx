import { Button, Text } from 'react-native-paper';
import { useState } from 'react';
import { Realm } from '@realm/react';

import CustomModal from '../../../components/modal';
import { isBookInLibrary, isBookInLibraryList } from '../../../library/helper/checkBookLibrary';
import { Library } from '../../../library/@types/googleBooks';
import { AddBookNavigationProp } from '../../../library/@types/navigation';
import RemoveButtonInsideModal from '../menus/removeButtonModal';
import { RealmLibraryResult } from '../../../library/realm/transaction/@realmTypes';
import RealmBookEditor from '../../../library/realm/transaction/class/write/editBook';

interface RemoveBookProps {
   library: Library;
   id: string;
   mutate: () => void;
   navigation?: AddBookNavigationProp['navigation'];
   realmParams: {
      realm: Realm;
      realmLibrary: RealmLibraryResult;
   };
}

const RemoveBookButton = ({ library, id, navigation, mutate, realmParams }: RemoveBookProps) => {
   const isBookInFinished = isBookInLibraryList(library, 'finished', id);
   const isBookInReading = isBookInLibraryList(library, 'reading', id);
   const { realm, realmLibrary } = realmParams;

   const [visible, setVisible] = useState(false);
   const onInitialPress = () => {
      if (isBookInFinished || isBookInReading) {
         // opens the modal
         setVisible(true);
         return;
      }
      removeBook();
   };

   const removeBook = () => {
      mutate();
      _removeRealmObj(RealmBookEditor, id);

      navigation &&
         setTimeout(() => {
            navigation.navigate('Search');
         }, 1000);
   };

   // THIS IS NOT RECOMMENDED. SOFT DELETE FOR BOOKS CONTAINING MORE DATA
   // TODO: if the book has been read and the book has logs then soft delete
   // OR have it hard delete here and soft delete at the server
   const _removeRealmObj = (editor: typeof RealmBookEditor, id: string) => {
      try {
         realm.write(() => {
            const init = new editor(realm, realmLibrary);
            init.deleteBook(id);
         });
      } catch (err) {
         console.error('Failed to delete the books in library', err);
      }
   };

   return (
      <>
         {!isBookInLibrary(library, id) ? null : (
            <>
               <Button onPress={onInitialPress}>Remove book</Button>
               <CustomModal
                  title='Are you sure you want to delete this book?'
                  visible={visible}
                  setVisible={setVisible}
               >
                  <RemoveButtonInsideModal removeBook={removeBook} setVisible={setVisible} />
               </CustomModal>
            </>
         )}
      </>
   );
};

export default RemoveBookButton;
