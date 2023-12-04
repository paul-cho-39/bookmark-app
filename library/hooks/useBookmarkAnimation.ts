import { useState, useEffect, useLayoutEffect } from 'react';
import { Animated, Easing } from 'react-native';

export default function useBookmarkAnimation(isBookmarked: boolean, duration: number = 500) {
   const [displayIcon, setDisplayIcon] = useState(false);
   const iconAnimation = new Animated.Value(2);
   const [animation] = useState(new Animated.Value(0));

   const shakeAnimation = () => {
      setDisplayIcon(true);
      Animated.timing(animation, {
         toValue: 0,
         duration: duration,
         easing: Easing.ease,
         useNativeDriver: true,
      }).start(() => {
         animation.setValue(0);
      });
   };

   const slideAnimation = (direction: 'up' | 'down') => {
      const value = direction === 'up' ? 2 : 0;
      const toValue = direction === 'up' ? 6 : 0;
      iconAnimation.setValue(value);
      Animated.timing(iconAnimation, {
         toValue: toValue,
         duration: duration,
         easing: Easing.ease,
         useNativeDriver: true,
      }).start(() => {
         iconAnimation.setValue(0);
      });
   };

   useEffect(() => {
      if (isBookmarked) {
         slideAnimation('down');
      } else {
         slideAnimation('up');
      }
   }, [displayIcon]);

   // icon should disappear after animation
   useLayoutEffect(() => {
      const timeId = setTimeout(() => {
         setDisplayIcon(false);
      }, duration - 100);
      return () => clearTimeout(timeId);
   }, [displayIcon]);

   const markIconTranslateY = iconAnimation.interpolate({
      inputRange: [0, 0.5, 0.75, 1],
      outputRange: [-10, -5, -4, 0],
   });

   const unmarkIconTranslateY = iconAnimation.interpolate({
      inputRange: [0, 0.5, 0.75, 1],
      outputRange: [0, 3, 3.5, 5],
   });

   const translateX = animation.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [0, 8, 2, 8, 0],
   });

   const translateY = animation.interpolate({
      inputRange: [0, 0.5, 0.75, 1],
      outputRange: [0, -6, -4, 0],
   });

   const startAnimations = () => {
      shakeAnimation();
      Animated.sequence([
         Animated.timing(iconAnimation, {
            toValue: 1,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true,
         }),
         Animated.timing(animation, {
            toValue: 1,
            duration: duration - 200,
            easing: Easing.bounce,
            useNativeDriver: true,
         }),
      ]).start(() => {
         animation.setValue(0); // Reset the animation to the starting position
      });
   };

   return {
      displayIcon,
      startAnimations,
      markIconTranslateY,
      unmarkIconTranslateY,
      translateX,
      translateY,
   };
}
