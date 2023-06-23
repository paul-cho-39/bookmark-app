import Animated from 'react-native-reanimated';
import useAnimatedHeight from '../../../../library/hooks/useAnimatedHeight';
import { BackHandler, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useEffect, useRef, useState } from 'react';
import { NotesNavigationProp } from '../../../../library/@types/navigation';
import useBoundedStore from '../../../../library/zustand/store';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import EditableAppbar from './editableAppbar';
import AnimatedBackButton from './animatedBackButton';
import useCustomBackHandler from '../../../../library/hooks/useCustomBackHandler';
import { retrieveNotesHeader } from '../../../../library/zustand/utils/notes/retriever';
import NoteIconContents from './noteIconContents';
import { ICONS } from '../../../../assets/constants';

// SAVED (CHECKMARK), PUBLIC/PRIVATE, X-CLOSE BUTTON, WORDS (ICON), TAGS (TAG)

// make WORDS, TAGS, AND SAVED AS A DICT OR OBJECT

export type Mode = 'small' | 'large';

interface NoteAppbarProps extends NotesNavigationProp {
   colors: MD3Colors;
}

const NoteAppbar = ({ navigation, route, colors }: NoteAppbarProps) => {
   const { logIndex, id } = route.params.params;
   const notes = useBoundedStore((state) => state.notes[id][logIndex]);
   const [mode, setMode] = useState<Mode>('small');

   const { editableHeaderParams, noteTags } = retrieveNotesHeader(notes, id, logIndex);

   const handleTitlePress = () => {
      setMode(mode === 'small' ? 'large' : 'small');
   };

   const { headerStyle, titleStyle } = useAnimatedHeight(mode);

   useCustomBackHandler(() => {
      if (mode === 'large') {
         setMode('small');
         return true;
      }
      return false;
   }, [mode]);

   const onPressBack = () => {
      mode === 'large' ? setMode('small') : navigation.goBack();
   };

   return (
      <SafeAreaView>
         <Animated.View
            style={[
               styles.headerContainer,
               headerStyle,
               { backgroundColor: colors.elevation.level4 },
            ]}
         >
            <AnimatedBackButton
               mode={mode}
               color={colors.onSurface}
               size={ICONS.LARGE}
               onPress={onPressBack}
               style={styles.backButton}
            />
            <View style={[styles.contentContainer]}>
               <Animated.View style={[titleStyle]}>
                  {mode === 'small' ? (
                     <>
                        <Text variant='titleLarge' style={styles.title} onPress={handleTitlePress}>
                           {!editableHeaderParams.title
                              ? DEFAULT_TITLE
                              : editableHeaderParams.title}
                        </Text>
                     </>
                  ) : (
                     <EditableAppbar
                        params={editableHeaderParams}
                        onBlur={handleTitlePress}
                        colors={colors}
                     />
                  )}
               </Animated.View>
               <NoteIconContents noteTags={noteTags} colors={colors} />
            </View>
         </Animated.View>
      </SafeAreaView>
   );
};

const DEFAULT_TITLE = 'title';
const BACK_BUTTON_PADDING = 10;

const styles = StyleSheet.create({
   headerContainer: {
      top: StatusBar.currentHeight,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
   },
   contentContainer: {
      flexDirection: 'row',
      paddingHorizontal: '2%',
      width: '100%',
   },
   backButton: {
      paddingHorizontal: BACK_BUTTON_PADDING,
   },
   title: {
      paddingHorizontal: BACK_BUTTON_PADDING + 35,
   },
});

export default NoteAppbar;
