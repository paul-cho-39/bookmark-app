import React, { useCallback, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { NotesNavigationProp } from '../../../../library/@types/navigation';
import useBoundedStore from '../../../../library/zustand/store';
import NoteIconContents from './noteIconContents';
import StatusBarHeight from '../../../../library/helper/getStatusbarHeight';
import { useFocusEffect } from '@react-navigation/native';
import BackButton from '../../../../components/buttons/backButton';

interface NoteAppbarProps extends NotesNavigationProp {
   colors: MD3Colors;
}

const NoteAppbar = ({ navigation, route, colors }: NoteAppbarProps) => {
   const { logIndex, id } = route.params.params;
   const params = { logIndex, id };

   const meta = useBoundedStore((state) => state.notes[id][logIndex].meta);
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

   return (
      <SafeAreaView>
         <View collapsable style={[styles.container, background]}>
            <BackButton
               name='arrow-back'
               onPress={() => navigation.goBack()}
               style={styles.backButton}
               color={colors.onSurface}
            />
            {/* if search then the back button and search component */}

            <NoteIconContents
               params={params}
               colors={colors}
               style={[styles.noteIconContent, background]}
            />
         </View>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      marginBottom: -2,
      top: StatusBarHeight,
      height: 68,
   },
   noteIconContent: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
   },
   backButton: {
      alignSelf: 'center',
   },
});

export default NoteAppbar;
