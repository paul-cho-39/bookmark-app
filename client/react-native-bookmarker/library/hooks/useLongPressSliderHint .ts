import { useState, useRef, useEffect } from 'react';
import getLinearInterpolation from '../helper/timer/getLinearInterpolation ';

const useLongPressSliderHint = (
   page: number | null,
   maxPageValue: number,
   delay = 300,
   delayTouchEnd = 100
) => {
   const [displayHint, setDisplayHint] = useState(false);
   const [isLongPressed, setIsLongPressed] = useState(false);
   const prevPageRef = useRef<number>();
   // sets the threshold dynamically by using linear interpolation algorithm
   const threshold = getLinearInterpolation(page as number, maxPageValue, 0.3, 0.1);

   const onSlidingStart = () => {
      setTimeout(() => {
         setIsLongPressed(true);
      }, delay);
   };

   const onSlidingFinished = () => {
      if (page !== null) {
         prevPageRef.current = page;
      }
      setTimeout(() => {
         if (isLongPressed) {
            setIsLongPressed(false);
            setDisplayHint(false);
         }
      }, delayTouchEnd);
   };
   //    || maxPageValue - page > 10
   useEffect(() => {
      if (
         page !== null &&
         isLongPressed &&
         prevPageRef.current &&
         page - prevPageRef.current > threshold
      ) {
         console.log('threshold is at ', threshold);
         setDisplayHint(true);
      }
   }, [isLongPressed, prevPageRef.current]);

   return {
      onSlidingStart,
      onSlidingFinished,
      displayHint,
   };
};

export default useLongPressSliderHint;
