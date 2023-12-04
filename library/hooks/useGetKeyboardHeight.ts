import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

const useGetKeyboardHeight = () => {
   const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

   useEffect(() => {
      const showKeyboard = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
      const hideKeyboard = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

      const keyboardDidShowListener = Keyboard.addListener(showKeyboard, (e) => {
         setKeyboardHeight(e.endCoordinates.height);
      });

      const keyboardDidHideListener = Keyboard.addListener(hideKeyboard, () => {
         setKeyboardHeight(0);
      });

      return () => {
         keyboardDidShowListener.remove();
         keyboardDidHideListener.remove();
      };
   }, []);

   return keyboardHeight;
};

export default useGetKeyboardHeight;
