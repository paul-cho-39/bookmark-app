import { useEffect, useRef } from 'react';
import { useSharedValue, withTiming, interpolate, Easing } from 'react-native-reanimated';

interface AnimateOpacityOptions {
   inputRange: number[];
   outputRange: number[];
   duration?: number;
}

function useAnimateOpacity<T extends number>(value: T, options: AnimateOpacityOptions) {
   const animatedFocused = useSharedValue(value);
   useEffect(() => {
      animatedFocused.value = withTiming(value, {
         duration: options.duration ? options.duration : 250,
         easing: Easing.in(Easing.exp),
      });
   }, [value]);

   const underlineOpacity = interpolate(
      animatedFocused.value,
      options.inputRange,
      options.outputRange
   );

   return underlineOpacity;
}

export default useAnimateOpacity;
