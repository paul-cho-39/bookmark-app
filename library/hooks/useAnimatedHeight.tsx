import Animated, {
   Easing,
   useSharedValue,
   useAnimatedStyle,
   withTiming,
   interpolate,
   withSpring,
} from 'react-native-reanimated';
import { Mode } from '../../screens/components/appbar/notes/noteSampler';
import { useEffect } from 'react';
import { HEADERS } from '../../assets/constants';

// TODO: change NAME!
function useAnimatedHeight<T extends Mode>(value: T) {
   const modeAnim = useSharedValue(value === 'small' ? 0 : 1);
   useEffect(() => {
      modeAnim.value = withTiming(value === 'small' ? 0 : 1, {
         duration: 200,
         easing: Easing.out(Easing.ease),
      });
   }, [value]);

   const headerStyle = useAnimatedStyle(() => {
      return {
         height: interpolate(modeAnim.value, [0, 1], [HEADERS.DEFAULT, HEADERS.EDITABLE]),
      };
   });

   const titleStyle = useAnimatedStyle(() => {
      const fontSize = interpolate(modeAnim.value, [0, 1], [24, 30]);
      const lineHeight = interpolate(modeAnim.value, [0, 1], [24, 34]);
      const translateY = interpolate(modeAnim.value, [0, 1], [0, 22]);
      const translateX = interpolate(modeAnim.value, [0, 1], [0, -20]);

      return {
         fontSize,
         lineHeight,
         transform: [{ translateY }, { translateX }],
      };
   });

   return { headerStyle, titleStyle };
}

export default useAnimatedHeight;
