import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Text, Easing, StyleProp, ViewStyle } from 'react-native';

interface SkeletonLoaderProps {
   height?: number | string;
   width?: number | string;
   style?: StyleProp<ViewStyle>;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ width, height, style }) => {
   const pulseAnim = useRef(new Animated.Value(0)).current;

   useEffect(() => {
      const sharedAnimationConfig = {
         duration: 1300,
         useNativeDriver: true,
      };
      Animated.loop(
         Animated.sequence([
            Animated.timing(pulseAnim, {
               ...sharedAnimationConfig,
               toValue: 1,
               easing: Easing.out(Easing.ease),
            }),
            Animated.timing(pulseAnim, {
               ...sharedAnimationConfig,
               toValue: 0,
               easing: Easing.in(Easing.ease),
            }),
         ])
      ).start();

      return () => {
         pulseAnim.stopAnimation();
      };
   }, []);

   const opacityAnim = pulseAnim.interpolate({
      inputRange: [0, 0.4],
      outputRange: [0.35, 0.45],
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
