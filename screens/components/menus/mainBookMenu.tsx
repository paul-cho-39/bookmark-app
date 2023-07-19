import { useRef, useState } from 'react';
import { Text } from 'react-native-paper';
import CustomModal from '../../../components/modal';
import AnimatedModal from '../../../components/animatedModal';

// use the component that I made(?)
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// bundle this together
import RemoveButtonInsideModal from './removeButtonModal';
import HomeMenuDisplay from './homeMenuDisplay';
import BookCarousel from './carousel';
import { Calendar } from './calendar';
import Config from '../../../library/config';
import React from 'react';
import { setBookVisibility } from '../../../library/zustand/logic/connector-logic';
import useConnectStore from '../../../library/zustand/connectStore';
import { RealmBook } from '../../../library/realm/schema';

interface MainMenuProps {
   removeBook: () => void;
   currentBooks: RealmBook[];
}

const MainMenu = ({ removeBook, currentBooks }: MainMenuProps) => {
   const [dateVisible, setDateVisible] = useState(false);
   const [deleteVisible, setDeletevisible] = useState(false);

   // this will be connected to <SurfaceButtons /> component
   const editvisible = useConnectStore((state) => state.modal.edit.isChangeBookVisible);

   return (
      // use map to apply this and create an object from this
      <>
         <HomeMenuDisplay
            showModalDate={setDateVisible}
            showModalEdit={setBookVisibility}
            showModalDelete={setDeletevisible}
         />

         {/* calendar */}
         <CustomModal title='Change time log' visible={dateVisible} setVisible={setDateVisible}>
            <Calendar visible={dateVisible} setVisible={setDateVisible} />
         </CustomModal>

         {/* edit primary */}
         <AnimatedModal
            title='Change Recording'
            animationType='slide'
            visible={editvisible}
            setVisible={setBookVisibility}
            titleStyle={{ paddingVertical: 3, marginBottom: 8 }}
            containerStyle={{
               marginHorizontal: Config.DEFAULT_MARGIN_HORIZONTAL,
            }}
         >
            <BookCarousel goBack={setBookVisibility} data={currentBooks} />
         </AnimatedModal>

         {/* TODO: create another component for deleting book */}
         <CustomModal
            title={
               <>
                  <Text style={{ marginRight: 10 }} variant='titleMedium'>
                     Delete book
                  </Text>
                  <FontAwesome5 name='exclamation-circle' size={24} color='black' />
               </>
            }
            visible={deleteVisible}
            setVisible={setDeletevisible}
            containerStyle={{ height: 250, paddingHorizontal: 20 }}
         >
            <RemoveButtonInsideModal removeBook={removeBook} setVisible={setDeletevisible} />
         </CustomModal>
      </>
   );
};

export default React.memo(MainMenu);
