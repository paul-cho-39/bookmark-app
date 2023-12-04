import { useEffect, useRef, useState } from 'react';
import { TimerType } from '../zustand/types/@types';

function usePageEstimator(time: number, timer: TimerType) {
   const page = useRef(0);

   useEffect(() => {
      const newPageEstimator = estimatePage(time, timer);
      if (newPageEstimator !== page.current) {
         page.current = newPageEstimator;
      }
   }, [timer]);

   return page.current;
}

export default usePageEstimator;

// helper function for this
export function estimatePage(time: number, timer: TimerType) {
   const _PAGE = 10;
   const totalMins = timer.hours * 60 + timer.minutes + timer.seconds / 60;
   const readingPacePerMin = _PAGE / time;

   return Math.floor(totalMins * readingPacePerMin);
}
