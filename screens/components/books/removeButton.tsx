import { Button, Text } from 'react-native-paper';
import { useState } from 'react';
import { Realm } from '@realm/react';

import CustomModal from '../../../components/modal';
import { isBookInLibrary, isBookInLibraryList } from '../../../library/helper/checkBookLibrary';
import { Library } from '../../../library/@types/googleBooks';
import { AddBookNavigationProp } from '../../../library/@types/navigation';
import RemoveButtonInsideModal from '../menu/removeButtonModal';

interface RemoveBookProps {
   library: Library;
   id: string;
   mutate: () => void;
   navigation?: AddBookNavigationProp['navigation'];
   realm: Realm;
}

const RemoveBookButton = ({ library, id, navigation, mutate, realm }: RemoveBookProps) => {
   const isBookInFinished = isBookInLibraryList(library, 'finished', id);
   const isBookInReading = isBookInLibraryList(library, 'reading', id);

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
      navigation &&
         setTimeout(() => {
            navigation.navigate('Search');
         }, 1000);
   };

   const _removeRealmObj = () => {
      realm.write(() => {});
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
