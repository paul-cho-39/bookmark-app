import { View, Text, StyleSheet } from 'react-native';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { NoteAppbarParams } from '../../../constants';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import useSwipeToGoBackGesture from '../../../library/hooks/useSwipeToGoBackGesture';
import { runOnJS, useAnimatedReaction, useSharedValue } from 'react-native-reanimated';
import { width } from '../../../library/helper';

export interface NotepadProps extends Omit<NoteAppbarParams, 'colors'> {
   keyboardHeight: number;
}

const RichTextEditor = React.lazy(() => import('./richEditor'));

const Notepad = ({ keyboardHeight, params }: NotepadProps) => {
   const [enabler, setEnabler] = useState(false);
   const active = useSharedValue(false);

   const timerRef = useRef<NodeJS.Timeout | null>(null);

   const handleEnd = (duration: number) => {
      timerRef.current = setTimeout(() => {
         active.value = false;
      }, duration);
   };

   useEffect(() => {
      return () => {
         // Clear the timer when the component unmounts
         if (timerRef.current) {
            clearTimeout(timerRef.current);
         }
      };
   }, [timerRef.current]);

   const gesture = Gesture.Pan()
      .activeOffsetX(5)
      .onStart((event) => {
         if (event.absoluteX <= 40 || event.absoluteX >= width - 40) {
            active.value = true;
         }
      })
      .onEnd((event) => {
         if (event.state === 5) {
            // active.value = false;
            runOnJS(handleEnd)(300);
         }
         console.log('ENDED / CANCELLED?');
      })
      .onTouchesCancelled(() => {
         console.log('CANCELLED');
         runOnJS(handleEnd)(1500);
      });

   // const touch = Gesture.Tap()
   //    .enabled(enabler)
   //    .numberOfTaps(2)
   //    .onStart(() => {
   //       console.log('turned on');
   //       active.value = true;
   //    })
   //    .onEnd(() => {
   //       console.log('ENDED**********');
   //       active.value = false;
   //    });

   // useAnimatedReaction(
   //    () => active.value,
   //    (isActive) => {
   //       if (isActive) {
   //          console.log('-----TURNING OFF---------');
   //          runOnJS(_sendMessage)('editorToggler', true);
   //       } else {
   //          console.log('TURNON!');
   //          runOnJS(_sendMessage)('editorToggler', false);

   //          // Send message to WebView to enable Quill
   //       }
   //    },
   //    [active.value]
   // );

   return (
      <View style={styles.container}>
         <Suspense fallback={<Text>Loading Editor...</Text>}>
            <RichTextEditor
               params={params}
               keyboardHeight={keyboardHeight}
               onTouchStart={}
               onTouchEnd={}
               onTouchCancel={}
            />
         </Suspense>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

export default Notepad;
