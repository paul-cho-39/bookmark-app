import Animated, {
   Easing,
   useSharedValue,
   useAnimatedStyle,
   withTiming,
   withDelay,
   SharedValue,
} from 'react-native-reanimated';
import { DURATION } from '../../constants/notes';

function useAnimatedHeight<T extends SharedValue<number>>(dep: T) {
   const DELAY = 10;

   const translateY = useSharedValue(100);
   const translateX = useSharedValue(-50);
   const height = useSharedValue(150);
   const fontSize = useSharedValue(24);
   const opacity = useSharedValue(0);

   const animateProperties = () => {
      // translateX.value = createAnimation(0);
      // translateY.value = createAnimation(0, DELAY + 70, 150, Easing.in(Easing.linear));
      height.value = createAnimation(50, DELAY, 220, Easing.out(Easing.linear));
      fontSize.value = createAnimation(24);
      // opacity.value = createAnimation(0);

      if (dep.value === 0) {
         // translateY.value = createAnimation(100, DELAY, 150);
         // translateX.value = createAnimation(-50, DELAY + 70, 100);
         height.value = createAnimation(150);
         fontSize.value = createAnimation(34);
         // opacity.value = createAnimation(1, 190);
      }
   };

   const createAnimation = (
      toValue: number,
      delay = DELAY,
      duration = DURATION,
      easing = Easing.linear
   ) => {
      return withDelay(delay, withTiming(toValue, { duration, easing }));
   };

   const animateStyle = (animatedValue: Animated.SharedValue<number>, property: string) =>
      useAnimatedStyle(() => ({
         [property]: animatedValue.value,
      }));

   const sharedValues = {
      translateY,
      translateX,
      height,
      fontSize,
      opacity,
   };

   return { animateStyle, sharedValues, animateProperties };
}

export default useAnimatedHeight;
