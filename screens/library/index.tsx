import React, { useState } from 'react';
import SkeletonSearchScreen from '../components/books/skeletonSearchScreen';
import { View, ViewProps } from 'react-native';
import Slider from '@react-native-community/slider';
import useLongPressSlide from '../../library/hooks/useLongPressGesture';
import { Tooltip } from 'react-native-paper';

const LibraryScreen = () => {
   const [testing, setTesting] = useState(false);

   const onSlide = () => {
      setTesting(true);
   };
   const [value, setValue] = useState<number>(0);
   const panHandlers = useLongPressSlide(onSlide);

   return (
      <View style={{ width: '100%', height: 60 }}>
         <Tooltip title='slider' enterTouchDelay={500} leaveTouchDelay={100}>
            <Slider
               style={{ width: '100%', height: '50%' }}
               minimumValue={0}
               maximumValue={100}
               value={value}
               onValueChange={setValue}
            />
         </Tooltip>
      </View>
   );
};

export default LibraryScreen;
