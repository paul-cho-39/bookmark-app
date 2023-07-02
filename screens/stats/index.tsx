import { Animated, PanResponder, SafeAreaView, Text, View } from 'react-native';

const StatsScreen = () => {
   const position = new Animated.ValueXY();

   const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: position.x, dy: position.y }], {
         useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gesture) => {
         // Check for back swipe gesture
         if (gesture.dx > 50) {
            // Adjust this threshold as needed
            // Handle back swipe gesture
            console.log('Back swipe gesture detected');
            // Prevent further propagation
            return false;
         }
         // Allow the event to continue propagation
         return true;
      },
   });
   return (
      <Animated.View
         {...panResponder.panHandlers}
         style={[position.getLayout(), { backgroundColor: 'black', flex: 1 }]}
      >
         <View>
            <Text>Hello</Text>
         </View>
      </Animated.View>
   );
};

export default StatsScreen;
