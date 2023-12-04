import { Animated, Easing, StyleProp, View, ViewStyle, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';

interface SliderToolTipProps {
   displayHint: boolean;
   style?: StyleProp<ViewStyle>;
}

const SliderToolTip = ({ displayHint, style }: SliderToolTipProps) => {
   const opacityValue = useRef(new Animated.Value(0)).current;

   useEffect(() => {
      Animated.timing(opacityValue, {
         toValue: displayHint ? 1 : 0,
         duration: 300,
         useNativeDriver: true,
         easing: displayHint ? Easing.inOut(Easing.ease) : Easing.out(Easing.ease),
      }).start();
   }, [displayHint]);

   return (
      <Animated.View style={[styles.container, { opacity: opacityValue }]}>
         <View style={[style, { display: !displayHint ? 'none' : 'flex' }]}>
            <Text variant='labelSmall' style={styles.text}>
               {displayHint && 'slide to raise max'}
            </Text>
            <FontAwesome5 name='long-arrow-alt-right' size={14} color='#a9a9a9' />
         </View>
      </Animated.View>
   );
};

const styles = StyleSheet.create({
   container: {
      position: 'absolute',
      bottom: 38,
      right: 0,
   },
   text: {
      letterSpacing: -0.2,
      flexWrap: 'wrap',
      alignSelf: 'flex-end',
      marginRight: 6,
   },
});

export default SliderToolTip;
