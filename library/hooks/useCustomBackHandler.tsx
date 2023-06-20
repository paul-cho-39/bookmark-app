import { useEffect } from 'react';
import { BackHandler } from 'react-native';

function useCustomBackHandler<T>(customHandler: () => boolean, dep?: T) {
   const dependency = !dep ? customHandler : dep;
   useEffect(() => {
      const backAction = () => {
         return customHandler();
         // important to return true here and false if condition is not met
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      // Clean up the listener on unmount
      return () => backHandler.remove();
   }, [dependency]);
}

export default useCustomBackHandler;
