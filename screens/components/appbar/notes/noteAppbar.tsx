import Animated from 'react-native-reanimated';
import useAnimatedHeight from '../../../../library/hooks/useAnimatedHeight';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useState } from 'react';
import { NotesNavigationProp } from '../../../../library/@types/navigation';
import useBoundedStore from '../../../../library/zustand/store';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import EditableAppbar from './editableAppbar';
import AnimatedBackButton from './animatedBackButton';
import useCustomBackHandler from '../../../../library/hooks/useCustomBackHandler';
import NoteIconContents from './noteIconContents';
import { CONTENT, ICONS, Mode } from '../../../../constants';
import EdiableContentsWrapper from './editableContentsWrapper';

interface NoteAppbarProps extends NotesNavigationProp {
   colors: MD3Colors;
}

const NoteAppbar = ({ navigation, route, colors }: NoteAppbarProps) => {
   const { logIndex, id } = route.params.params;
   const [mode, setMode] = useState<Mode>(Mode.SMALL);

   // const { editableHeaderParams, noteTags } = retrieveNotesHeader(notes, id, logIndex);

   const handleTitlePress = () => {
      setMode(mode === Mode.SMALL ? Mode.LARGE : Mode.SMALL);
   };

   const { headerStyle, titleStyle } = useAnimatedHeight(mode);

   useCustomBackHandler(() => {
      if (mode === Mode.LARGE) {
         setMode(Mode.SMALL);
         return true;
      }
      return false;
   }, [mode]);

   const onPressBack = () => {
      mode === Mode.LARGE ? setMode(Mode.SMALL) : navigation.goBack();
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
                  <EdiableContentsWrapper
                     params={route.params.params}
                     mode={mode}
                     handleTitlePress={handleTitlePress}
                     colors={colors}
                  />
               </Animated.View>
               <NoteIconContents params={route.params.params} colors={colors} />
            </View>
         </Animated.View>
      </SafeAreaView>
   );
};

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
