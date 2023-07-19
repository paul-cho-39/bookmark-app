import { Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

import { getProgressPercentage } from '../../../library/helper/timer/getTimerValue';
import { TimerType } from '../../../library/zustand/types/@types';

import { width as WIDTH, height as HEIGHT, width } from '../../../library/helper';
import CircularProgressBar from './circularProgressBar';
import SaveTimeButton, { SaveTimeButtonProps } from './timerButtonIcon';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import useBoundedStore from '../../../library/zustand/store';

interface DisplayTimeProps extends SaveTimeButtonProps {
   colors: MD3Colors;
}

const CIRCLE_HEIGHT = WIDTH * 0.9;

const DisplayTime = ({ colors, isPaused, ...rest }: DisplayTimeProps) => {
   const timer = useBoundedStore((state) => state.timer);
   const formatTimeUnit = (value: number, symbol: string) => {
      const formattedValue = value.toString().padStart(2, '0');
      return (
         <>
            <Text variant='displayLarge' style={[styles.timeUnit, styles.time]}>
               {formattedValue}
            </Text>
            <Text variant='bodyMedium' style={[styles.timeSymbol, styles.time]}>
               {symbol}
            </Text>
         </>
      );
   };

   const progressPercentage = getProgressPercentage(60, timer);

   return (
      <View style={styles.container}>
         <CircularProgressBar
            fillColor={colors.backdrop}
            strokeColor={isPaused ? colors.onSurface : colors.tertiary}
            progress={progressPercentage}
            size={CIRCLE_HEIGHT}
            width={1.5}
         />
         <View style={styles.insideCircle}>
            <View style={styles.timeWrapper}>
               {formatTimeUnit(timer.hours, 'h')}
               {formatTimeUnit(timer.minutes, 'm')}
               {formatTimeUnit(timer.seconds, 's')}
            </View>
            <SaveTimeButton isPaused={isPaused} {...rest} />
         </View>
      </View>
   );
};

const BOTTOM_HEIGHT = CIRCLE_HEIGHT / 1.45;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 10,
   },
   insideCircle: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      bottom: BOTTOM_HEIGHT,
   },
   timeWrapper: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      alignItems: 'baseline',
      justifyContent: 'center',
      paddingVertical: 10,
   },
   time: {
      //   fontFamily: 'raleway-extraLight',
   },
   timeUnit: {},
   timeSymbol: {
      letterSpacing: 1,
   },
});

export default DisplayTime;
