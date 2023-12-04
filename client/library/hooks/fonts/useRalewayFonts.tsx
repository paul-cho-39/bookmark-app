import { useEffect } from 'react';
import * as Font from 'expo-font';

export default function useRalewayFonts() {
   useEffect(() => {
      async function loadFonts() {
         await Font.loadAsync({
            'raleway-extraLight': require('./../../../assets/fonts/static/Raleway-ExtraLight.ttf'),
            'raleway-italic': require('./../../../assets/fonts/static/Raleway-Italic.ttf'),
         });
      }
      loadFonts();
   }, []);
}
