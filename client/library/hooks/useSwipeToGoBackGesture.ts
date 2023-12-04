import { useEffect, useRef } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue } from 'react-native-reanimated';
import { width as WIDTH } from '../helper';

export default function useSwipeToGoBackGesture(
   //    callback: () => void | undefined,
   //    clear: () => void | undefined,
   duration: number = 750
) {
   //    const active = useSharedValue(false);
   //    const active = useRef(false);
   const active = useSharedValue(false);
   const timerRef = useRef<NodeJS.Timeout | null>(null);
   console.log('hello');
   const handleEnd = () => {
      timerRef.current = setTimeout(() => {
         //  active.current = false;
         active.value = false;
         //  clear();
      }, duration);
   };

   useEffect(() => {
      return () => {
         // Clear the timer when the component unmounts
         if (timerRef.current) {
            clearTimeout(timerRef.current);
         }
      };
   }, [timerRef.current]);

   const gesture = Gesture.Pan()
      .minDistance(0)
      .onStart((event) => {
         if (event.absoluteX <= 40 || event.absoluteX >= WIDTH - 40) {
            // runOnJS(callback)();
            // active.current = true;
            active.value = true;
         }
      })
      .onEnd((event) => {
         //  runOnJS(clear)();
         //  active.current = false;
         active.value = true;
      })
      .onTouchesCancelled(() => {
         runOnJS(handleEnd)();
      });

   return { gesture, active };
}
