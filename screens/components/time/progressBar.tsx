import Slider, { SliderProps } from '@react-native-community/slider';
import { useEffect, useRef, useState } from 'react';
import { StyleProp, ViewStyle, TextStyle, Text } from 'react-native';

// TODO: set hook libraries in a different file
import { TimerType } from '../../../library/zustand/types/@types';
import useSettingsStore from '../../../library/zustand/settingsStore';
import useBoundedStore from '../../../library/zustand/store';

// TODO: set hook libraries in a different file
import usePageEstimator from '../../../library/hooks/usePageEstimator';
import useResettableTimer from '../../../library/hooks/useResettableTimer';
import useLongPressSliderHint from '../../../library/hooks/useLongPressSliderHint ';

// create an index and bundle this together
import DisplayPage from './displayPage';
import MinMaxValue from './displayMinMaxValue';
import AdjustPageButton from './adjustPageButton';
import SliderToolTip from './sliderToolTip';
import { setCurrentPage, setTempPage } from '../../../library/zustand/logic/bounded-logic';

interface PageProgressProps extends SliderProps {
   timer: TimerType;
   isPaused: boolean;
   bookPage?: number;
   viewStyle?: StyleProp<ViewStyle>;
   valueStyle?: StyleProp<TextStyle>;
   buttonStyle?: StyleProp<TextStyle>;
   toolTipStyle?: StyleProp<ViewStyle>;
   style?: StyleProp<ViewStyle>;
}

const PageProgressDisplay = ({
   timer,
   isPaused,
   bookPage,
   viewStyle,
   valueStyle,
   buttonStyle,
   toolTipStyle,
   style,
   ...rest
}: PageProgressProps) => {
   const defaultPageObj = useSettingsStore(
      (state) => state.userPreference.userTimerSettings.defaultPageFlipper
   );

   const tempPage = useBoundedStore((state) => state.tempPage);

   const { averageReadingPacePerMin, maxPageValue } = defaultPageObj;
   const maxValue = useRef(maxPageValue); // so it wont update globally

   // if page value is not changed/touched
   const estimateTempPage = usePageEstimator(averageReadingPacePerMin, timer);

   // if page value is touched new timer is initiated and estimates new page
   const resettableTimer = useResettableTimer(tempPage);
   const estimateNewPage = usePageEstimator(averageReadingPacePerMin, resettableTimer);

   useEffect(() => {
      const timeoutId = setTimeout(() => {
         const threshold = 5; // keeping it static for now
         const increaseBy = 25;
         if (
            estimateTempPage + threshold > maxValue.current ||
            (tempPage && tempPage > 0 && tempPage + threshold > maxValue.current)
         ) {
            maxValue.current += increaseBy;
         }
      }, 300);

      if (!!bookPage && maxValue.current >= bookPage) {
         maxValue.current = bookPage;
      }

      const displayValue = tempPage === null ? estimateTempPage : tempPage;
      setCurrentPage(Math.round(displayValue));

      return () => clearTimeout(timeoutId);
   }, [estimateTempPage, tempPage]);

   useEffect(() => {
      if (tempPage && tempPage > 0 && !isPaused) {
         setTempPage((tempPage) => (tempPage as number) + estimateNewPage);
      }
   }, [estimateNewPage, isPaused]);

   // whether to display hint for user sliding the page;
   const { displayHint, onSlidingFinished, onSlidingStart } = useLongPressSliderHint(
      tempPage,
      maxValue.current,
      500
   );

   // for avoid null
   const displayValue = tempPage === null ? estimateTempPage : tempPage;

   return (
      <>
         <DisplayPage page={displayValue} viewStyle={viewStyle}>
            <AdjustPageButton
               page={tempPage}
               setPage={setTempPage}
               bookPage={bookPage}
               style={[buttonStyle]}
            />
         </DisplayPage>
         <SliderToolTip displayHint={displayHint} style={toolTipStyle} />
         <Slider
            onSlidingStart={onSlidingStart}
            onSlidingComplete={onSlidingFinished}
            value={displayValue}
            onValueChange={setTempPage}
            maximumValue={maxValue.current}
            aria-valuemax={maxValue.current}
            aria-valuenow={displayValue}
            testID='page-slider'
            accessibilityLabel='page-slider'
            style={style}
            {...rest}
         />
         <MinMaxValue style={valueStyle} minNumber={0} maxNumber={maxValue.current} />
      </>
   );
};

export default PageProgressDisplay;
