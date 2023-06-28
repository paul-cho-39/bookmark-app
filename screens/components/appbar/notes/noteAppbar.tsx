import Animated from 'react-native-reanimated';
import useAnimatedHeight from '../../../../library/hooks/useAnimatedHeight';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

import { useState } from 'react';
import { NotesNavigationProp } from '../../../../library/@types/navigation';
import useBoundedStore from '../../../../library/zustand/store';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import AnimatedBackButton from './animatedBackButton';
import useCustomBackHandler from '../../../../library/hooks/useCustomBackHandler';
import NoteIconContents from './noteIconContents';
import { ICONS, Mode } from '../../../../constants';
import EdiableContentsWrapper from './editableContentsWrapper';
import darkenColor from '../../../../library/helper/darkenColor';
import { setNoteModalVisible } from '../../../../library/zustand/logic/connector-logic';

interface NoteAppbarProps extends NotesNavigationProp {
   colors: MD3Colors;
}

const NoteAppbar = ({ navigation, route, colors }: NoteAppbarProps) => {
   // write a preview; have to save the old data; stays immutable or create a
   // snapshot

   const { logIndex, id } = route.params.params;
   const params = { logIndex, id };

   const bgColor = useBoundedStore((state) => state.notes[id][logIndex].meta?.bgColor);

   const [mode, setMode] = useState<Mode>(Mode.SMALL);

   const { headerStyle, titleStyle } = useAnimatedHeight(mode);

   const toggleOrGoBack = () => {
      if (mode === Mode.LARGE) {
         setNoteModalVisible('closed');
         setMode(Mode.SMALL);
         return true;
      }
      return false;
   };

   const handleTitlePress = () => {
      const isOpened = toggleOrGoBack();
      if (!isOpened) {
         setNoteModalVisible('opened');
         setMode(Mode.LARGE);
      }
   };

   useCustomBackHandler(toggleOrGoBack, [mode]);

   const onPressBack = () => {
      if (!toggleOrGoBack()) {
         navigation.goBack();
      }
   };

   const color = darkenColor('#D2691E', -5);

   return (
      <SafeAreaView>
         <Animated.View
            style={[
               styles.headerContainer,
               headerStyle,
               { backgroundColor: color },
               // { backgroundColor: '#2E8B57' },
               // { backgroundColor: colors.elevation.level4 },
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
                     params={params}
                     mode={mode}
                     handleTitlePress={handleTitlePress}
                     colors={colors}
                  />
               </Animated.View>
               <NoteIconContents params={params} colors={colors} />
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
