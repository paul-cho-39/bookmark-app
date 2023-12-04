import React, { useEffect, useRef } from 'react';
import {
   View,
   Animated,
   StyleSheet,
   Text,
   Easing,
   StyleProp,
   ViewStyle,
   EasingStatic,
} from 'react-native';

interface SkeletonLoaderProps {
   height?: number | string;
   width?: number | string;
   duration?: number;
   style?: StyleProp<ViewStyle>;
   easingIn?: EasingStatic;
   easingOut?: EasingStatic;
   pulseInterpolator?: { inputRange: number[]; outputRange: number[] };
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
   width,
   height,
   duration = 4000,
   style,
   easingIn = Easing.inOut(Easing.ease),
   easingOut = Easing.inOut(Easing.ease),
   pulseInterpolator,
}) => {
   const pulseAnim = useRef(new Animated.Value(0)).current;

   useEffect(() => {
      const sharedAnimationConfig = {
         duration: duration,
         useNativeDriver: true,
      };
      Animated.loop(
         Animated.sequence([
            Animated.timing(pulseAnim, {
               ...sharedAnimationConfig,
               toValue: 1,
               easing: easingOut as (value: number) => number,
            }),
            Animated.timing(pulseAnim, {
               ...sharedAnimationConfig,
               toValue: 0,
               // easing: Easing.in(Easing.linear),
               easing: easingIn as (value: number) => number,
            }),
         ])
      ).start();

      return () => {
         pulseAnim.stopAnimation();
      };
   }, []);

   const opacityAnim = pulseAnim.interpolate({
      inputRange: [0, 0.65, 0.9],
      outputRange: [0.6, 1, 0.6], // starts at 50% opacity and fades in
   });

   return (
      <Animated.View
         style={[
            styles.container,
            { width: width, height: height },
            { opacity: opacityAnim },
            style,
         ]}
      />
   );
};

const styles = StyleSheet.create({
   container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'grey',
   },
});

export default SkeletonLoader;
