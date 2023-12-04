import { useRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { Keyboard } from 'react-native';
import { setNoteModalVisible } from '../zustand/logic/connector-logic';

const useModalize = () => {
   const openModal = (ref: React.RefObject<Modalize>, accessKeyboard: boolean = true) => {
      Keyboard.dismiss();

      if (ref.current) ref.current.open();

      setNoteModalVisible('opened', accessKeyboard);
   };

   const closeModal = () => {
      setTimeout(() => {
         setNoteModalVisible('closed');
      }, 100);
   };

   return { openModal, closeModal };
};

export default useModalize;
