import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import useBoundedStore, { setIsDataAvailable } from '../../library/zustand/store';
import { MainTimerNavigationProp, TimerScreenRouteProps } from '../../library/@types/navigation';

import DisplayTime from '../components/time/displayTime';
import Title from '../components/time/title';
import PageProgressDisplay from '../components/time/progressBar';
import TimerStatus from '../components/time/timerStatus';
import TimeLayout from '../components/time/timeLayout';
import SaveCurrentSession from '../components/time/saveSession';
import SaveModal from '../components/time/modal/saveModal';

import {
   useFetchLogMutation,
   useSaveTimeMutation,
} from '../../library/hooks/queryHooks/useMutateTime';

import styles from './styles';
import { TimerParamType } from '../../library/@types/timerData';
import { pauseTimer, resumeTimer } from '../../library/zustand/logic/bounded-logic/timerLogic';
import { useEffect, useState } from 'react';
import { setInitiateNote } from '../../library/zustand/logic/bounded-logic/noteLogic';
import useTimeStart from '../../library/hooks/useTimeStart';

const TimerScreen = ({ navigation, route }: MainTimerNavigationProp) => {
   const { colors } = useTheme();
   const { uid, primaryBookInfo } = route.params;
   const { id, ...info } = primaryBookInfo;
   const [timer, timerWithDate, isPaused, noteObj] = useBoundedStore((state) => [
      state.timer,
      state.timerWithDate,
      state.isPaused,
      state.notes.index,
   ]);
   const { startTime, endTime } = timerWithDate;
   const [rating, setRating] = useState(0);

   // helper function
   function getParam(type: 'start' | 'end'): TimerParamType {
      const logIndex = data?.log?.index.low;
      const params = { uid, id, logIndex };
      if (type === 'start') {
         return {
            ...params,
            startTime: startTime,
         };
      }
      return {
         ...params,
      };
   }

   // upon initial mount it encodes startTimer and send the date time
   const { data, mutateStartReading } = useFetchLogMutation(getParam('start'));
   const { mutateEndReading } = useSaveTimeMutation(getParam('end'));
   useTimeStart(startTime, endTime, mutateStartReading);

   useEffect(() => {
      if (data) {
         // NOTE: data will be unavailable at the start the header will listen to
         // this when the data is ready
         // this will be connected to ./components/time/headerIcons
         setIsDataAvailable(true);
         if (!noteObj[data.log.index.low]) {
            console.log('has not been initiated');
            setInitiateNote(id, data?.log.index.low); // initiate id & logIndex
         }
      }
      const params = getParam('end');
      navigation.setParams({
         ...route.params,
         params: params,
      });
   }, [navigation, data]);

   const handleStopButton = () => {
      // open the modal here(?);

      if (timer && timerWithDate.startTime) {
      }
   };

   return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
         <TimeLayout colors={colors}>
            <TimerStatus isPaused={isPaused} />
            <DisplayTime
               colors={colors}
               timer={timer}
               isPaused={isPaused}
               handlePause={pauseTimer}
               handleResume={resumeTimer}
            />
            <SaveModal
               colors={colors}
               rating={rating}
               setRating={setRating}
               containerStyle={styles.modalContainer}
            />
         </TimeLayout>
         <View style={styles.bottomContainer}>
            <Title viewStyle={styles.titleContainer} title={info.title} authors={info.authors} />
            <SaveCurrentSession
               params={getParam('start')}
               data={data?.log}
               style={styles.saveSession}
               animateIconStyle={[styles.saveSession, styles.animatedIcon]}
            />
            <PageProgressDisplay
               timer={timer}
               isPaused={isPaused}
               bookPage={info.page}
               style={styles.slider}
               viewStyle={styles.displayPageWrapper}
               valueStyle={styles.minMaxValue}
               buttonStyle={styles.iconButtonsWrapper}
               toolTipStyle={styles.toolTip}
               thumbTintColor={colors.onSecondaryContainer}
               maximumTrackTintColor={colors.onBackground}
               minimumTrackTintColor={colors.secondary}
            />
         </View>
      </View>
   );
};

export default TimerScreen;

// LATER TODO LISTS:
// 1) change fonts for bookTitle, etc.
// 2) feel like the styling has to be a little more compact(?)
// a) change the title font and author font as well
// 3) rename the style -- like "ViewStyle" wtf is that?
