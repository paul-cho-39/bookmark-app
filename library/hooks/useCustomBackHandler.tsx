import { useEffect } from 'react';
import { BackHandler } from 'react-native';

function useCustomBackHandler<T extends Array<unknown>>(customHandler: () => boolean, deps?: T) {
   useEffect(() => {
      const backAction = () => {
         return customHandler();
         // important to return true here and false if condition is not met
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      // Clean up the listener on unmount
      return () => backHandler.remove();
   }, [deps]);
}

export default useCustomBackHandler;
