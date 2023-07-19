import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import useBoundedStore from '../../library/zustand/store';
import { MainTimerNavigationProp, TimerScreenRouteProps } from '../../library/@types/navigation';
import { useEffect, useState } from 'react';

// this is all timer and update from @time/index.ts
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
import useTimeStart from '../../library/hooks/useTimeStart';

import styles from './styles';
import { TimerParamType } from '../../library/@types/timerData';
import { pauseTimer, resumeTimer } from '../../library/zustand/logic/bounded-logic/timerLogic';
import { setIsDataAvailable } from '../../library/zustand/logic/connector-logic';
import { setInitiateNote } from '../../library/zustand/logic/bounded-logic/noteLogic';
import RealmContext from '../../library/realm';
import { RealmBook, RealmLibrary, RealmLogs } from '../../library/realm/schema';
import { getLogIndex } from '../../library/realm/transaction/controller';
import useRenderCount from '../../library/hooks/useRenderCount';
import { shallow } from 'zustand/shallow';

const TimerScreen = ({ navigation, route }: MainTimerNavigationProp) => {
   const { colors } = useTheme();
   const { useRealm, useQuery: useRealmQuery } = RealmContext;
   const { uid, primaryBookInfo } = route.params;
   // TODO: A BOOK WITH PRIMARY SHOULD BE THE 'ID' HERE
   const { id, ...info } = primaryBookInfo;

   const [timer, timerWithDate, isPaused, noteObj] = useBoundedStore(
      (state) => [state.timer, state.timerWithDate, state.isPaused, state.notes],
      shallow
   );
   const { startTime, endTime } = timerWithDate;
   const [rating, setRating] = useState(0);
   const realm = useRealm();
   const realmParams = {
      realm,
      id: id,
   };

   const logs = useRealmQuery(RealmLogs);
   const getLogResult = () => {
      return getLogIndex(id, logs);
   };

   const getParam = (type: 'start' | 'end'): TimerParamType => {
      const logIndex = getLogResult();
      const params = { uid, id, logIndex };
      return type === 'start' ? { ...params, startTime: startTime } : { ...params };
   };

   // upon initial mount it encodes startTimer and send the date time
   const { data, mutateStartReading } = useFetchLogMutation(getParam('start'));
   const { mutateEndReading } = useSaveTimeMutation(getParam('end'));

   // initiate timer and save data into realm objects
   useTimeStart(startTime, endTime, mutateStartReading, realmParams);

   useEffect(() => {
      const logIndex = getLogResult();
      const params = getParam('end');

      if (!noteObj[id] || !noteObj[id][logIndex]) {
         // NOTE: data will be unavailable at the start the header will listen to
         // this when the data is ready
         // this will be connected to ./components/time/headerIcons
         setIsDataAvailable(true);
         setInitiateNote(id, logIndex); // initiate id & logIndex
      }

      navigation.setParams({
         ...route.params,
         params: params,
      });
   }, [navigation]);

   // const handleStopButton = () => {
   //    // open the modal here(?);
   // perform a batch update
   // const body = { notes, logs, etc... }
   // TODO: clean this part up at the server side too

   // from timer
   // const syncLogger = SyncRealmLogData(logs);
   // const body = logs.addEventListener(syncLogger.onLogEnd)
   // syncDataToServer<LoggerEndBodyType>(isConnected, body, mutateEndReading)
   //    }
   // };

   return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
         <TimeLayout colors={colors}>
            <TimerStatus isPaused={isPaused} />
            <DisplayTime
               colors={colors}
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
               thumbTintColor={colors.onSecondaryContainer}
               maximumTrackTintColor={colors.onBackground}
               minimumTrackTintColor={colors.secondary}
               style={styles.slider}
               viewStyle={styles.displayPageWrapper}
               valueStyle={styles.minMaxValue}
               buttonStyle={styles.iconButtonsWrapper}
               toolTipStyle={styles.toolTip}
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

// useEffect(() => {
//    if (data) {   //       setIsDataAvailable(true);
//       if (!noteObj[data?.log.index.low]) {
//          console.log('has not been initiated');
//          setInitiateNote(id, data?.log.index.low); // initiate id & logIndex
//       }
//    }
//    const params = getParam('end');
//    navigation.setParams({
//       ...route.params,
//       params: params,
//    });
// }, [navigation, data]);
