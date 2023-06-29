import React, { useRef, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';

import IconButton from '../../../../components/buttons/icons/iconButton';
import { AntDesign } from '@expo/vector-icons';
import RealmContext from '../../../../library/realm';
import useRenderCount from '../../../../library/hooks/useRenderCount';
import NoteTagsDrawer from './noteTagsDrawer';
import { ICONS, NoteAppbarParams } from '../../../../constants';
import NoteTheme from './noteTheme';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-paper';
import { ref } from 'yup';
import { NoteHeaderIconTypes } from '../../../../constants/notes';
import { setNoteModalVisible } from '../../../../library/zustand/logic/connector-logic';

const NoteIconContents = ({ params, colors }: NoteAppbarParams) => {
   // so this would be called at SEPARATE BACKBUTTON COMPONENT and WHEREEVER IT IS NEEDED
   const { useRealm, useObject, useQuery } = RealmContext;

   const tagModalRef = useRef<Modalize>(null);
   const themeModalRef = useRef<Modalize>(null);

   useRenderCount('contents');

   const openModal = (ref: React.RefObject<Modalize>) => {
      Keyboard.dismiss();

      if (ref && ref.current) ref.current.open();

      setNoteModalVisible('opened');
   };

   const closeTagModal = () => {
      if (tagModalRef && tagModalRef.current) tagModalRef.current.close();

      setTimeout(() => {
         setNoteModalVisible('closed');
      }, 100);
   };

   return (
      <>
         <View style={styles.iconContainer}>
            {/* add more icons here */}
            <IconButton
               onPress={() => openModal(tagModalRef)}
               style={{}}
               renderIcon={() => (
                  <AntDesign name='tagso' color={colors.onSurface} size={ICONS.LARGE} />
               )}
            />
            <IconButton
               // onPress={() => setThemeModalVisible(true)}
               onPress={() => openModal(themeModalRef)}
               style={[]}
               renderIcon={() => (
                  <AntDesign name='appstore-o' color={colors.onSurface} size={ICONS.LARGE} />
               )}
            />
         </View>

         <Portal>
            <NoteTagsDrawer
               ref={tagModalRef}
               colors={colors}
               params={params}
               closeModal={closeTagModal}
            />
         </Portal>
         <Portal>
            <NoteTheme ref={themeModalRef} params={params} colors={colors} />
         </Portal>
      </>
   );
};

const styles = StyleSheet.create({
   iconContainer: {
      width: '50%', // width should be subtracted from the title
      flexDirection: 'row',
      justifyContent: 'space-evenly',
   },
});

export default NoteIconContents;
