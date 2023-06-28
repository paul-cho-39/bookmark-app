import React, { useEffect, useRef, useState } from 'react';
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

const NoteIconContents = ({ params, colors }: NoteAppbarParams) => {
   // so this would be called at SEPARATE BACKBUTTON COMPONENT and WHEREEVER IT IS NEEDED
   const { useRealm, useObject, useQuery } = RealmContext;
   const [isTagDrawerVisible, setTagDrawerVisible] = useState(false);
   const [isThemeModalVisible, setThemeModalVisible] = useState(false);

   const tagModalRef = useRef<Modalize>(null);

   useRenderCount('contents');

   const openTagModal = () => {
      if (tagModalRef && tagModalRef.current) tagModalRef.current.open();
   };

   return (
      <>
         <View style={styles.iconContainer}>
            {/* add more icons here */}
            <IconButton
               onPress={openTagModal}
               style={{}}
               renderIcon={() => (
                  <AntDesign name='tagso' color={colors.onSurface} size={ICONS.LARGE} />
               )}
            />
            <IconButton
               onPress={() => setThemeModalVisible(true)}
               style={[]}
               renderIcon={() => (
                  <AntDesign name='appstore-o' color={colors.onSurface} size={ICONS.LARGE} />
               )}
            />
         </View>

         <Portal>
            <NoteTagsDrawer ref={tagModalRef} colors={colors} params={params} />
         </Portal>
         <NoteTheme
            params={params}
            colors={colors}
            isVisible={isThemeModalVisible}
            setIsVisible={setThemeModalVisible}
         />
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

export default React.memo(NoteIconContents);
