import { View, Text, StyleSheet } from 'react-native';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import React, { Suspense, useEffect, useRef, useState } from 'react';

interface NotepadProps {
   keyboardHeight: number;
   colors: MD3Colors;
   logIndex: number;
}

const RichTextEditor = React.lazy(() => import('./richEditor'));

const Notepad = ({ keyboardHeight, colors, logIndex }: NotepadProps) => {
   return (
      <View style={styles.container}>
         {/* TODO: loading screen */}
         <Suspense fallback={<Text>Loading Editor...</Text>}>
            <RichTextEditor colors={colors} keyboardHeight={keyboardHeight} />
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
