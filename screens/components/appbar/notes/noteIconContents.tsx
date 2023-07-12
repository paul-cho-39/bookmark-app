import React, { useRef, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';

import IconButton from '../../../../components/buttons/icons/iconButton';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import RealmContext from '../../../../library/realm';
import { ICONS, NoteAppbarParams } from '../../../../constants';
import NoteTheme from './noteTheme';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-paper';
import { setNoteModalVisible } from '../../../../library/zustand/logic/connector-logic';
import NoteMenuItems from './noteMenu';

const NoteIconContents = ({ params, colors, style }: NoteAppbarParams) => {
   // so this would be called at SEPARATE BACKBUTTON COMPONENT and WHEREEVER IT IS NEEDED
   const { useRealm, useObject, useQuery } = RealmContext;

   const themeModalRef = useRef<Modalize>(null);
   const menuModalRef = useRef<Modalize>(null);

   const openModal = (ref: React.RefObject<Modalize>) => {
      Keyboard.dismiss();

      if (ref && ref.current) ref.current.open();

      setNoteModalVisible('opened');
   };

   const closeModal = () => {
      setTimeout(() => {
         setNoteModalVisible('closed');
      }, 100);
   };

   return (
      <>
         <View style={[styles.iconContainer, style]}>
            {/* add more icons here */}
            <IconButton
               accessibilityLabel='Theme Button'
               onPress={() => openModal(themeModalRef)}
               style={[]}
               renderIcon={() => (
                  <AntDesign name='appstore-o' color={colors.onSurface} size={ICONS.MEDIUM} />
               )}
            />
            <NoteMenuItems colors={colors} size={ICONS.MEDIUM} />
         </View>

         <Portal>
            <NoteTheme
               ref={themeModalRef}
               params={params}
               onCloseModal={closeModal}
               colors={colors}
            />
         </Portal>
      </>
   );
};

const styles = StyleSheet.create({
   iconContainer: {
      // width: '50%', // width should be subtracted from the title
      // flexDirection: 'row',
      // justifyContent: 'space-evenly',
   },
});

export default NoteIconContents;
