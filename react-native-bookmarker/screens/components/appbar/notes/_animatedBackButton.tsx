import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleProp, ViewStyle, StyleSheet, StatusBar } from 'react-native';
import BackButton from '../../../../components/buttons/backButton';
import { Mode } from '../../../../constants';
import { SharedValue } from 'react-native-reanimated';

interface AnimatedBackButtonProps {
   dep: SharedValue<number>;
   onPress: () => void;
   color: string;
   size: number;
   style?: StyleProp<ViewStyle>;
}

const AnimatedBackButton = ({ color, onPress, dep, size, style }: AnimatedBackButtonProps) => {
   const rotation = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

   useEffect(() => {
      Animated.timing(rotation, {
         toValue: dep.value === 0 ? 0 : 1,
         duration: 200,
         useNativeDriver: true,
      }).start();
   }, [dep.value]);

   const rotationInterpolate = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '90deg'],
   });

   return (
      <View style={[styles.container, style]}>
         <Animated.View style={[{ transform: [{ rotate: rotationInterpolate }] }]}>
            <BackButton name='chevron-back' size={size} onPress={onPress} color={color} />
         </Animated.View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      // position: 'absolute',
      // top: StatusBar.currentHeight && StatusBar.currentHeight / 2,
      // left: 0,
      // zIndex: 50,
   },
});

export default AnimatedBackButton;
