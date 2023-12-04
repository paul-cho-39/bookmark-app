import { useState, useEffect, useRef } from 'react';
import { TimerType } from '../zustand/types/@types';

function useResettableTimer(deps: number | boolean | null) {
   const initialTimer = {
      hours: 0,
      minutes: 0,
      seconds: 0,
   };
   const [timer, setTimer] = useState<TimerType>(initialTimer);
   const intervalRef = useRef<NodeJS.Timeout | null>(null);

   const resetTimer = () => {
      if (intervalRef.current) {
         clearInterval(intervalRef.current);
      }

      setTimer(initialTimer);
   };

   useEffect(() => {
      if (deps == null) return;

      intervalRef.current = setInterval(() => {
         setTimer(() => {
            const seconds = timer.seconds + 1;
            const minutes = seconds === 60 ? timer.minutes + 1 : timer.minutes;
            const hours = minutes === 60 ? timer.hours + 1 : timer.hours;

            return {
               hours: hours,
               minutes: minutes % 60,
               seconds: seconds % 60,
            };
         });
      }, 1000);

      return () => {
         if (intervalRef.current) {
            clearInterval(intervalRef.current);
         }
      };
   }, [timer, deps]);

   useEffect(() => {
      resetTimer();
   }, [deps]);

   return timer;
}

export default useResettableTimer;
