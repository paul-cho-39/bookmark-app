import { View, Text, StyleSheet } from 'react-native';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { NoteAppbarParams } from '../../../constants';

export interface NotepadProps extends Omit<NoteAppbarParams, 'colors'> {
   keyboardHeight: number;
}

const RichTextEditor = React.lazy(() => import('./richEditor'));

const Notepad = ({ keyboardHeight, params }: NotepadProps) => {
   return (
      <>
         <Suspense fallback={<Text>Loading Editor...</Text>}>
            <RichTextEditor params={params} keyboardHeight={keyboardHeight} />
         </Suspense>
      </>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

export default Notepad;
