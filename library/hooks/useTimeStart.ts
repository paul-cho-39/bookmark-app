// possibly change name
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, AppState, AppStateStatus, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { UseMutateFunction } from '@tanstack/react-query';
import { initiateStartTime, setTimer, startTimer } from '../zustand/logic/bounded-logic';
import { BodyTimer } from '../zustand/types/@types';

function useTimeStart(
   startTime: Date | null,
   endTime: Date | null,
   mutate: UseMutateFunction<any, unknown, BodyTimer, unknown>
) {
   const appState = useRef(AppState.currentState);
   const [_appStateVisible, setAppStateVisible] = useState(appState.current);

   useFocusEffect(
      useCallback(() => {
         const timeoutId = setTimeout(() => {
            if (startTime === null && endTime === null) {
               startTimer();
               initiateStartTime(mutate);
            }
         }, 750);

         return () => clearTimeout(timeoutId);
      }, [startTime])
   );

   useEffect(() => {
      const handleAppStateChange = (nextAppState: AppStateStatus) => {
         if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
            // whenever the app state is changed in the background
            // recomputes the timer and sets with new timer values
            setTimer();
         }
         appState.current = nextAppState;
         setAppStateVisible(appState.current);
      };

      const subscribe = AppState.addEventListener('change', handleAppStateChange);

      return () => subscribe.remove();
   }, []);
}

export default useTimeStart;
