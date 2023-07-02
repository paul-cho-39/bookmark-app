import { ColorValue, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { NotesNavigationProp } from '../../../../library/@types/navigation';
import useBoundedStore from '../../../../library/zustand/store';
import NoteIconContents from './noteIconContents';
import StatusBarHeight from '../../../../library/helper/getStatusbarHeight';
import AnimatedContent from './animatedContent';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

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
         StatusBar.setBackgroundColor(meta?.headerColor as string);

         return () => {
            StatusBar.setBackgroundColor(colors.background);
         };
      }, [meta?.headerColor])
   );

   return (
      <SafeAreaView>
         <View style={[styles.container, background]}>
            <AnimatedContent
               params={params}
               colors={colors}
               style={[styles.headerContainer, background]}
               goBack={() => navigation.goBack()}
            />
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
   },
   headerContainer: {
      top: StatusBarHeight,
      justifyContent: 'center',
      overflow: 'hidden',
   },
   noteIconContent: {
      width: '100%',
      top: StatusBarHeight,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
   },
});

export default NoteAppbar;
