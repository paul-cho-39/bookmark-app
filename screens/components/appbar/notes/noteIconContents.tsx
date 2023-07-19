import React, { useRef, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';

import { AntDesign, FontAwesome } from '@expo/vector-icons';
import RealmContext from '../../../../library/realm';
import { ICONS, NoteAppbarParams } from '../../../../constants';
import NoteTheme from './noteTheme';
import { Modalize } from 'react-native-modalize';
import NoteMenuItems from './noteMenu';
import useModalizeRef from '../../../../library/hooks/useModalizeRef';
import HighlightableIconButton from '../../../../components/buttons/icons/highlightableIconButton';
// import NoteMenuManager from '../../notes/noteMenuManager';

const NoteIconContents = ({ params, colors, style }: NoteAppbarParams) => {
   // so this would be called at SEPARATE BACKBUTTON COMPONENT and WHEREEVER IT IS NEEDED
   const { useRealm, useObject, useQuery } = RealmContext;

   const themeModalRef = useRef<Modalize>(null);
   const tagModalRef = useRef<Modalize>(null);
   const infoModalRef = useRef<Modalize>(null);

   const refManager = {
      tagModal: tagModalRef,
      infoModal: infoModalRef,
   };

   const { closeModal, openModal } = useModalizeRef();

   const NoteMenuManager = React.lazy(() => import('./../../notes/menu/noteMenuManager'));

   return (
      <>
         <View style={[style]}>
            {/* add more icons here */}
            <HighlightableIconButton
               isHighlighted
               accessibilityLabel='Theme Button'
               onPress={() => openModal(themeModalRef)}
               size={ICONS.LARGE + 10}
               highlighterColor={colors.outline}
               renderIcon={() => (
                  <AntDesign name='appstore-o' color={colors.onSurface} size={ICONS.MEDIUM} />
               )}
            />
            <NoteMenuItems
               params={params}
               refManager={refManager}
               openModal={openModal}
               colors={colors}
               size={ICONS.MEDIUM}
               style={styles.menuItems}
            />
         </View>

         <>
            <NoteTheme
               ref={themeModalRef}
               params={params}
               onCloseModal={closeModal}
               colors={colors}
            />
            <NoteMenuManager
               params={params}
               colors={colors}
               refManager={refManager}
               closeModal={closeModal}
            />
         </>
      </>
   );
};

const styles = StyleSheet.create({
   menuItems: {},
});

export default NoteIconContents;
