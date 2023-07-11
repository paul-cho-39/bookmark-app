import React from 'react';
import Animated from 'react-native-reanimated';
import { View, StyleSheet } from 'react-native';
import { Suspense, useState } from 'react';

import AnimatedBackButton from './animatedBackButton';

import { ICONS, Mode, NoteAppbarParams } from '../../../../constants';
import { setNoteModalVisible } from '../../../../library/zustand/logic/connector-logic';

import useAnimatedHeight from '../../../../library/hooks/useAnimatedHeight';
import useCustomBackHandler from '../../../../library/hooks/useCustomBackHandler';

interface AnimatedContentProps extends NoteAppbarParams {
   goBack: () => void;
}

const AnimatedContent = ({ colors, goBack, params, style }: AnimatedContentProps) => {
   const [mode, setMode] = useState<Mode>('small');

   const toggleOrGoBack = () => {
      if (mode === 'large') {
         setNoteModalVisible('closed', false);
         setMode('small');
         return true;
      }
      return false;
   };

   const handleTitlePress = () => {
      setNoteModalVisible('opened', false);
      setMode((prev) => (prev === 'large' ? 'small' : 'large'));
   };

   useCustomBackHandler(toggleOrGoBack, [mode]);
   const { headerStyle, titleStyle } = useAnimatedHeight(mode);

   const onPressBack = () => {
      if (!toggleOrGoBack()) {
         goBack(); // props
      }
   };

   const EdiableContentsWrapper = React.lazy(() => import('./editableContentsWrapper'));

   return (
      <Animated.View style={[style, headerStyle]}>
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
         </View>
      </Animated.View>
   );
};

const styles = StyleSheet.create({
   contentContainer: {
      flexDirection: 'row',
      paddingHorizontal: '2%',
      width: '100%',
   },
   backButton: {
      paddingHorizontal: 10,
   },
});

export default AnimatedContent;
