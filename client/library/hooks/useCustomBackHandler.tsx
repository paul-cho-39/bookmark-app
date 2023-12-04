import { EventListenerCallback, useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';

// should there be a third option if the customHandler returns true then it will
// return a callback?
function useCustomBackHandler<T extends Array<unknown>>(customHandler: () => boolean, deps: T) {
   const navigation = useNavigation();

   if (Platform.OS === 'android') {
      useEffect(() => {
         const backAction = () => {
            return customHandler(); // important to return true here and false if condition is not met
         };

         const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

         // Clean up the listener on unmount
         return () => backHandler.remove();
      }, deps);
   } else if (Platform.OS === 'ios') {
      useFocusEffect(
         useCallback(() => {
            const onBackPress = (e: { preventDefault: () => void }) => {
               if (customHandler()) {
                  e.preventDefault(); // Prevent default action (navigation)
               }
            };

            // Subscribe to the beforeRemove event
            return navigation.addListener('beforeRemove', onBackPress);
         }, deps)
      );
   }
}

export default useCustomBackHandler;
