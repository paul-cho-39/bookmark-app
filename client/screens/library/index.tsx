import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
   BackHandler,
   GestureResponderEvent,
   Keyboard,
   StatusBar,
   StyleSheet,
   TextInput,
   View,
} from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import quillHtml from './quill';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import useGetKeyboardHeight from '../../library/hooks/useGetKeyboardHeight';

// things that want to be accomplished using gesture-handler
// 1) identify - backHandler gesture
// 2)
interface ActiveProps {
   status: boolean;
   cancelled: boolean;
}

export const MainLibraryScreen = () => {
   const navigation = useNavigation();
   const webviewRef = useRef<WebView>(null);
   const viewRef = useRef<View>(null);
   const activeObj = {
      status: false,
      cancelled: false,
   };

   const _sendMessage = (type: string, value: unknown) => {
      const body = {
         type: type,
         value: value,
      };
      webviewRef.current?.postMessage(JSON.stringify(body));
   };
   const [active, setActive] = useState<ActiveProps>(activeObj);

   const injectJS = (script: string) => webviewRef.current?.injectJavaScript(script);
   const toggleQuillInput = (type: 'blur' | 'focus') => {
      type === 'focus'
         ? injectJS('document.querySelector("#editor .ql-editor").focus();')
         : injectJS('document.querySelector("#editor .ql-editor").blur();');
   };

   const HEIGHT = 150;
   const barHeight = StatusBar?.currentHeight;

   // it is setting the right WIDTH hooks
   const dispatchStyling = {
      _setStyle: (style: Record<string, string | number>) => {
         if (viewRef && viewRef.current) {
            viewRef.current.setNativeProps({ style: style });
         }
      },
      activated: () => {
         dispatchStyling._setStyle({ width: '7.5%' });
      },
      cancelled: () => {
         dispatchStyling._setStyle({ width: '4%' });
      },
   };

   // CREATE A HISTORY and the object should be: { cancelled: boolean; ended: boolean: count: number }
   const handleTouchStart = (event: GestureResponderEvent) => {
      if (event.nativeEvent.pageX < 20) {
         console.log('handled');
         setActive({
            ...active,
            status: true,
         });
         dispatchStyling.activated();
      }
      if (
         keyboardHeight <= 0 &&
         event.nativeEvent.pageY > HEIGHT
         // && should send the message
      ) {
         webviewRef.current?.requestFocus();
         toggleQuillInput('focus');
      }
   };

   const hanldeTouchEnd = (event: GestureResponderEvent) => {
      if (!active.status) return;
      if (active.status && !active.cancelled) {
         dispatchStyling.cancelled();

         console.log('CANCELLED');
         setActive({
            ...active,
            status: false,
         });
      }
   };

   const handleCancelled = () => {
      if (active.status) {
         dispatchStyling.activated();
      }
   };

   const keyboardHeight = useGetKeyboardHeight();

   useEffect(() => {
      // if (keyboardHeight <= 0) {
      //    toggleQuillInput('focus');
      // }
      // if (keyboardHeight > 0) {
      //    dispatchStyling.activated();
      // }
      const value = { keyboardHeight, height: 150 };
      _sendMessage('keyboardHeight', value);
   }, [keyboardHeight]);

   return (
      <View style={{ flex: 1 }}>
         <WebView
            ref={webviewRef}
            originWhitelist={['*']}
            bounces={false}
            javaScriptEnabled={true}
            source={{ html: quillHtml }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchStart}
            onTouchEnd={hanldeTouchEnd}
            onTouchCancel={handleCancelled}
            onLoadStart={(event) => console.log('load started')}
            onMessage={(event) => {
               // Handle the message here
               const messageData = JSON.parse(event.nativeEvent.data);
               console.log(messageData);
            }}
            style={styles.webview}
         />
         <View ref={viewRef} style={[styles.dummyView]} />
      </View>
   );
};

const styles = StyleSheet.create({
   pointer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      position: 'absolute',
      marginStart: -30,
      marginTop: -30,
   },
   webview: {
      flex: 0,
      position: 'absolute',
      height: '100%',
      width: '100%',
      zIndex: 1000,
      top: 0,
   },
   // dummView: { backgroundColor: 'transparent' }
   // dummyView:
   //    height: 0,
   //    position: 'relative',
   //    backgroundColor: 'yellow',
   //    // backgroundColor: 'transparent',
   // },
   dummyView: {
      // height: 0,
      height: '100%',
      width: '4%',
      position: 'absolute',
      top: 0,
      zIndex: 0,
      // backgroundColor: 'transparent',
      backgroundColor: 'blue',
   },
});

export default MainLibraryScreen;

const variousStyles = {
   // if it is cancelled:
   cancelledStyle: {
      position: 'absolute',
      height: '100%',
      width: '100%',
   },
   originalPosition: {
      position: 'absolute',
      height: 0,
      width: 0,
   },
};

// HAVE TO SET A HEIGHT FOR THIS NUMBER
