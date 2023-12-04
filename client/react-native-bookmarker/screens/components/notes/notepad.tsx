import { View, Text, StyleSheet, GestureResponderEvent, TextInput } from 'react-native';
import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { NoteAppbarParams } from '../../../constants';
import useAdjustHiddenStyle from '../../../library/hooks/useAdjustHiddenStyle';
import WebView from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native';

export interface NotepadProps extends Omit<NoteAppbarParams, 'colors'> {
   keyboardHeight: number;
}

const RichTextEditor = React.lazy(() => import('./richEditor'));

const Notepad = ({ keyboardHeight, params }: NotepadProps) => {
   const webViewRef = useRef<WebView>(null);
   const textInputRef = useRef<TextInput>(null);
   const viewRef = useRef<View>(null);

   const messengers = {
      sendMessage: (type: string, value: unknown) =>
         webViewRef.current?.postMessage(JSON.stringify({ type, value })),
      injectJS: (script: string) => webViewRef.current?.injectJavaScript(script),
      // MOVE THIS LOGIC INSIDE RICH EDITOR
      toggleQuillInput: (type: 'blur' | 'focus') => {
         type === 'focus'
            ? messengers.injectJS('document.querySelector("#editor .ql-editor").focus();')
            : messengers.injectJS('document.querySelector("#editor .ql-editor").blur();');
      },
   };

   // PASS THIS TO RICH TEXT EDITOR
   const initiateQuill = () => {
      setTimeout(() => {
         webViewRef.current?.requestFocus();
         messengers.toggleQuillInput('focus');
      }, 100);
   };

   // MOVE THIS LOGIC INSIDE RICHTEXTEDITOR
   useFocusEffect(
      useCallback(() => {
         console.log('#1): FOCUSING');
         initiateQuill();
      }, [])
   );

   return (
      <View style={[styles.container]}>
         <Suspense fallback={<Text>Loading Editor...</Text>}>
            {/* TODO: what would be good for notes for loading? */}
            <RichTextEditor
               ref={webViewRef}
               params={params}
               keyboardHeight={keyboardHeight}
               messengers={messengers}
               style={styles.webview}
            />
         </Suspense>
         <View ref={viewRef} style={[styles.hiddenView, styles.left]} />
         <View ref={viewRef} style={[styles.hiddenView, styles.right]} />
         <TextInput autoFocus ref={textInputRef} style={styles.hiddenInput} />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   webview: {
      flex: 0,
      position: 'absolute',
      height: '100%',
      width: '100%',
      zIndex: 1,
   },
   hiddenView: {
      height: '100%',
      width: '4%',
      position: 'absolute',
      zIndex: 0,
   },
   hiddenInput: {
      height: 0,
      position: 'absolute',
      top: -100,
      left: 0,
      opacity: 0,
   },
   left: {
      left: 0,
      backgroundColor: 'transparent',
   },
   right: {
      right: 0,
      backgroundColor: 'transparent',
   },
});

export default Notepad;

// might not even need this:
// // may have to pass this as a prop;
// const handleTouchStart = (event: GestureResponderEvent) => {
//    if (event.nativeEvent.pageX < 20) {
//       console.log('handled');
//       setActive({
//          ...active,
//          status: true,
//       });
//       dispatchStyling.activated();
//    }

//    if (keyboardHeight <= 0) {
//       webViewRef.current?.requestFocus();
//       messengers.toggleQuillInput('focus');
//    }
// };

// const hanldeTouchEnd = (event: GestureResponderEvent) => {
//    if (!active.status) return;
//    if (active.status && !active.cancelled) {
//       dispatchStyling.cancelled();

//       console.log('CANCELLED');
//       setActive({
//          ...active,
//          status: false,
//       });
//    }
// };

// const handleCancelled = () => {
//    if (active.status) {
//       dispatchStyling.activated();
//    }
// };
