import React, { useCallback, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { NotesNavigationProp } from '../../../../library/@types/navigation';
import useBoundedStore from '../../../../library/zustand/store';
import NoteIconContents from './noteIconContents';
import StatusBarHeight from '../../../../library/helper/getStatusbarHeight';
import { useFocusEffect } from '@react-navigation/native';
import BackButton from '../../../../components/buttons/backButton';
import useConnectStore from '../../../../library/zustand/connectStore';
import NoteSearchBar from './noteSearchbar';
import { setNoteMenuModals } from '../../../../library/zustand/logic/connector-logic';
import { ICONS } from '../../../../constants';
import useCustomBackHandler from '../../../../library/hooks/useCustomBackHandler';

interface NoteAppbarProps extends NotesNavigationProp {
   colors: MD3Colors;
}

const NoteAppbar = ({ navigation, route, colors }: NoteAppbarProps) => {
   const { logIndex, id } = route.params.params;
   const params = { logIndex, id };

   const meta = useBoundedStore((state) => state.notes[id][logIndex].meta);
   const isSearchVisible = useConnectStore((state) => state.modal.note.isSearchVisible);
   const background = { backgroundColor: meta?.bgColor };

   useFocusEffect(
      useCallback(() => {
         // set up search back screen
         StatusBar.setBackgroundColor(meta?.headerColor as string);

         return () => {
            StatusBar.setBackgroundColor(colors.background);
         };
      }, [meta?.headerColor])
   );

   const handleBackPress = () => {
      isSearchVisible ? setNoteMenuModals('isSearchVisible', false) : navigation.goBack();
   };

   useCustomBackHandler(() => {
      if (isSearchVisible) {
         setNoteMenuModals('isSearchVisible', false);
         return true;
      }
      return false;
   }, [isSearchVisible]);

   console.log('rerenering');

   return (
      <SafeAreaView>
         <View collapsable style={[styles.container, background]}>
            <BackButton
               isHighlighted
               highlighterColor={colors.outline}
               name='chevron-back'
               onPress={handleBackPress}
               style={styles.backButton}
               color={colors.onSurface}
               size={ICONS.LARGE}
            />
            {/* if search then the back button and search component */}
            {isSearchVisible ? (
               <NoteSearchBar colors={colors} />
            ) : (
               <NoteIconContents
                  params={params}
                  colors={colors}
                  style={[styles.noteIconContent, background]}
               />
            )}
         </View>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      // backgroundColor: 'red',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: -2,
      top: StatusBarHeight,
      width: '100%',
      height: 68,
   },
   noteIconContent: {
      // backgroundColor: 'blue',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexGrow: 0.9,
   },
   backButton: {
      alignItems: 'center',
      alignSelf: 'center',
      marginStart: 10,
      // backgroundColor: 'blue',
   },
});

export default NoteAppbar;
