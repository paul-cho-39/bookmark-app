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
import { setNoteModalVisible } from '../../../../library/zustand/logic/connector-logic';

const NoteIconContents = ({ params, colors, style }: NoteAppbarParams) => {
   // so this would be called at SEPARATE BACKBUTTON COMPONENT and WHEREEVER IT IS NEEDED
   const { useRealm, useObject, useQuery } = RealmContext;

   const tagModalRef = useRef<Modalize>(null);
   const themeModalRef = useRef<Modalize>(null);

   // useRenderCount('CONTENTS');

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
               onCloseModal={closeModal}
            />
         </Portal>
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
