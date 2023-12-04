import { useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

const useTouchResize = (shrinkRatio: number = 0.9) => {
   const [isPressedIn, setIsPressedIn] = useState(false);
   const style: StyleProp<ViewStyle> = {
      transform: [{ scaleX: shrinkRatio }, { scaleY: shrinkRatio }],
   };

   const handleTouchStart = () => {
      setIsPressedIn(true);
   };

   const handleTouchEnd = () => {
      setIsPressedIn(false);
   };

   const eventHandlers = {
      onPressIn: handleTouchStart,
      onPressEnd: handleTouchEnd,
   };

   return { style, eventHandlers, isPressedIn };
};

export default useTouchResize;
