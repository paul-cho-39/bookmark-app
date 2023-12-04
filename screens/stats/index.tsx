import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Animated, {
   Easing,
   useAnimatedStyle,
   useSharedValue,
   withDelay,
   withTiming,
} from 'react-native-reanimated';
import useRenderCount from '../../library/hooks/useRenderCount';

const StatsScreen = () => {
   const translateY = useSharedValue(0);
   const translateX = useSharedValue(0);
   const isMoved = useSharedValue(0);
   const height = useSharedValue(100);
   const fontSize = useSharedValue(24);
   const opacity = useSharedValue(0);

   const DELAY = 10;

   const startAnimation = () => {
      isMoved.value = isMoved.value === 0 ? 1 : 0;

      if (isMoved.value === 1) {
         translateX.value = withDelay(DELAY, withTiming(0, { duration: 100 }));
         translateY.value = withDelay(
            DELAY + 70,
            withTiming(0, { duration: 150, easing: Easing.in(Easing.linear) })
         );
         height.value = withTiming(50, { duration: 220, easing: Easing.out(Easing.linear) });
         fontSize.value = withTiming(24, { duration: 200 }); // Increase fontSize
         opacity.value = withTiming(0, { duration: 200 }); // Make input invisible
      } else {
         translateY.value = withDelay(DELAY, withTiming(100, { duration: 150 }));
         translateX.value = withDelay(DELAY + 70, withTiming(-50, { duration: 100 }));
         height.value = withTiming(150, {
            duration: 200,
            easing: Easing.out(Easing.linear),
         });
         fontSize.value = withTiming(34, { duration: 200 }); // decrease font size
         opacity.value = withDelay(190, withTiming(1, { duration: 200 })); // Make input visible
      }
   };

   const animatedStyleY = useAnimatedStyle(() => {
      return {
         transform: [{ translateY: translateY.value }],
      };
   });

   const animatedStyleX = useAnimatedStyle(() => {
      return {
         transform: [{ translateX: translateX.value }],
      };
   });

   const animatedHeight = useAnimatedStyle(() => {
      return {
         height: height.value,
      };
   });

   const animatedFontSize = useAnimatedStyle(() => {
      return {
         fontSize: fontSize.value,
      };
   });

   const animatedOpacity = useAnimatedStyle(() => {
      return {
         opacity: opacity.value,
      };
   });

   return (
      <Animated.View style={[animatedHeight, { backgroundColor: 'gray' }]}>
         <TouchableWithoutFeedback onPress={startAnimation}>
            <Animated.View style={animatedStyleY}>
               <Animated.View style={animatedStyleX}>
                  <View
                     style={{
                        width: '20%',
                        height: 100,
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        left: '20%',
                     }}
                  >
                     <Animated.Text style={[animatedFontSize]}>Title</Animated.Text>
                     <Animated.View style={[animatedOpacity]}>
                        <TextInput style={{ color: 'black', backgroundColor: 'white' }} />
                        <TextInput style={{ color: 'black', backgroundColor: 'white' }} />
                        <TextInput style={{ color: 'black', backgroundColor: 'white' }} />
                        <TextInput style={{ color: 'black', backgroundColor: 'white' }} />
                     </Animated.View>
                  </View>
               </Animated.View>
            </Animated.View>
         </TouchableWithoutFeedback>
      </Animated.View>
   );
};

const styles = StyleSheet.create({
   box: {
      height: 50,
      width: 50,
      // backgroundColor: 'red',
   },
   button: {
      width: '50%',
      left: '25%',
      position: 'absolute',
      bottom: 100,
   },
});

export default StatsScreen;
