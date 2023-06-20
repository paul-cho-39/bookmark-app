import { StyleProp, View, ViewStyle, Text } from 'react-native';
import { noteHeaderTimeParser } from '../../../../library/helper/timer/getTimerValue';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';

interface NoteDatesParams {
   dateTime: string | null;
   colors: MD3Colors;
   style?: StyleProp<ViewStyle>;
}

const NoteDates = ({ dateTime, colors, style }: NoteDatesParams) => {
   const getDates = (dateTime: string | null) => {
      if (dateTime === null) {
         return '';
      }
      return noteHeaderTimeParser(dateTime);
   };
   return (
      <View style={style}>
         <Text
            style={{
               opacity: 0.32,
               fontStyle: 'italic',
               fontWeight: '600',
               color: colors.onSurface,
            }}
         >
            Created: {getDates(dateTime)}
         </Text>
      </View>
   );
};

export default NoteDates;
