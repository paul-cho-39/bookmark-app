import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface CalendarProps {
   visible?: boolean;
   setVisible?: (visible: boolean) => void;
}

export const Calendar = ({ visible, setVisible }: CalendarProps) => {
   const [date, setDate] = useState(new Date(1598051730000));
   const [mode, setMode] = useState('date');
   // const [show, setShow] = useState(false);

   const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
      const currentDate = selectedDate;
      // setShow(false);
      setVisible(false);
      currentDate && setDate(currentDate);
   };

   const showMode = (currentMode: React.SetStateAction<string>) => {
      if (Platform.OS === 'android') {
         // setShow(false);
         // for iOS, add a button that closes the picker
      }
      setMode(currentMode);
   };

   const showDatepicker = () => {
      showMode('date');
   };

   return (
      <View>
         <Button onPress={showDatepicker}>Open Calendar</Button>
         {visible && (
            <>
               <Text>selected: {date.toLocaleString()}</Text>
               <DateTimePicker
                  testID='dateTimePicker'
                  value={date}
                  mode='time'
                  is24Hour={true}
                  onChange={onChange}
               />
            </>
         )}
      </View>
   );
};

// 1) datepicker
// have to create a separate one for android?
// 2) removing from finished -- use UpdateButtons for this
// 3)
