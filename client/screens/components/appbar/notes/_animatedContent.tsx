import React, { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

import AnimatedBackButton from './animatedBackButton';

import { ICONS, NoteAppbarParams } from '../../../../constants';
import { setNoteModalVisible } from '../../../../library/zustand/logic/connector-logic';

import useAnimatedHeight from '../../../../library/hooks/useAnimatedHeight';
import useCustomBackHandler from '../../../../library/hooks/useCustomBackHandler';
import useBoundedStore from '../../../../library/zustand/store';
import StatusBarHeight from '../../../../library/helper/getStatusbarHeight';
import { DURATION } from '../../../../constants/notes';
import { width as WIDTH } from '../../../../library/helper';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface AnimatedContentProps extends NoteAppbarParams {
   goBack: () => void;
}

const AnimatedContent = ({ colors, goBack, params, style }: AnimatedContentProps) => {
   const modalOpener = useSharedValue(0);
   const heightValue = useSharedValue(50);
   const width = useSharedValue(WIDTH * 0.5);

   // const { animateStyle, sharedValues, animateProperties } = useAnimatedHeight(modalOpener);

   const toggleOrGoBack = () => {
      if (modalOpener.value === 0) {
         modalOpener.value = 1;
         setNoteModalVisible('closed', false);
         return true;
      }
      return false;
   };

   const handleTitlePress = () => {
      console.log('pressed', modalOpener.value);
      modalOpener.value = modalOpener.value === 0 ? 1 : 0;
      // setNoteModalVisible('opened', false);

      if (modalOpener.value === 1) {
         heightValue.value = withTiming(150, { duration: DURATION });
         console.log('when value is 1', heightValue.value);
         console.log('when value is 1 WIDTH IS', width.value);

         // width.value = withTiming(WIDTH, { duration: DURATION });
      } else {
         heightValue.value = withTiming(100, { duration: DURATION });
         console.log('when value is 0', heightValue.value);
         console.log('when value is 1 WIDTH IS', width.value);
         // width.value = withTiming(WIDTH * 0.5, { duration: DURATION });
      }
   };

   useCustomBackHandler(toggleOrGoBack, [modalOpener.value]);

   const onPressBack = () => {
      if (!toggleOrGoBack()) {
         goBack(); // props
      }
   };

   const animatedHeight = useAnimatedStyle(() => {
      return {
         height: heightValue.value,
         width: width.value,
      };
   });

   // const title = useBoundedStore((state) => state.notes[params.id][params.logIndex].attr.title);

   return (
      <Animated.View
         style={[
            animatedHeight,
            styles.contentContainer,
            // ]}
            // animateStyle(sharedValues.height, 'height'),
         ]}
      >
         {/* <AnimatedBackButton
            dep={modalOpener}
            color={colors.onSurface}
            size={ICONS.LARGE}
            onPress={onPressBack}
            style={styles.backButton}
         /> */}
         <TouchableWithoutFeedback onPress={handleTitlePress}>
            <Animated.Text
               style={[
                  { color: colors.onBackground, width: '100%', height: '100%' },

                  // [animateStyle(sharedValues.fontSize, 'fontSize')
               ]}
            >
               Title
               {/* {!title ? 'Title' : title} */}
            </Animated.Text>
         </TouchableWithoutFeedback>
         {/* <Animated.View style={[styles.contentContainer]}> */}
         {/* rest of the component here */}
         {/* </Animated.View> */}
      </Animated.View>
   );
};

const styles = StyleSheet.create({
   contentContainer: {
      backgroundColor: 'red',
      top: StatusBarHeight,
      position: 'absolute',
      height: 100,
      // left: 0,
      // flexDirection: 'row',
      // paddingHorizontal: '2%',
      // overflow: 'hidden',
      zIndex: 50,
   },
   backButton: {
      paddingHorizontal: 10,
   },
});

export default AnimatedContent;
