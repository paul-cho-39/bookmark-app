// this section of the hook is just an archive

import { useState, useRef, useMemo } from 'react';
import {
   PanResponder,
   PanResponderInstance,
   GestureResponderEvent,
   PanResponderGestureState,
} from 'react-native';

const useLongPressSlide = (onSlide: () => void) => {
   const [longPressActive, setLongPressActive] = useState<boolean>(false);

   const panResponder: PanResponderInstance = useMemo(
      () =>
         PanResponder.create({
            onStartShouldSetPanResponder: (
               _: GestureResponderEvent,
               __: PanResponderGestureState
            ) => true,
            onPanResponderGrant: () => {
               setLongPressActive(false);
               console.log('granting pan response');
               setTimeout(() => {
                  setLongPressActive(true);
               }, 1000);
            },
            onPanResponderMove: (
               _: GestureResponderEvent,
               gestureState: PanResponderGestureState
            ) => {
               //    console.log('the gesture "DX" is at position:', gestureState.dx);
               //    console.log('the gesture "DY" is  at position:', gestureState.dy);
               console.log('the gesture "X0" at position:', gestureState.dx);

               if (longPressActive && gestureState.dx > 100) {
                  console.log('moved a little bit');
                  onSlide();
                  setLongPressActive(false);
               }
            },
            onPanResponderRelease: () => {
               setLongPressActive(false);
            },
         }),
      [longPressActive, onSlide]
   );

   return panResponder.panHandlers;
};

export default useLongPressSlide;
