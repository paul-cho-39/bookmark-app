import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useColorScheme, TextInput, StyleSheet, View, Platform, Linking } from 'react-native';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { WebView } from 'react-native-webview';
import { WebViewEvent, WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';
import { useFocusEffect } from '@react-navigation/native';
import { useAssets } from 'expo-asset';
import { readAsStringAsync } from 'expo-file-system';

import html from './webView/quill';
import LinkModal from './webView/linkModal';
import { SCREEN_HEIGHT, height as HEIGHT } from '../../../library/helper';

interface RichTextEditorProps {
   keyboardHeight: number;
   colors: MD3Colors;
}

// THE PROBELM W/ THE KEYBOARD IS THAT THE HEIGHT OF THE DOCUMENT
// IS NOT THE SAME AS REACT-NATIVE APP SCREEN
// AND THEREFORE THE SCREEN SIZE DIFFERS EVERY TIME

const RichTextEditor = ({ keyboardHeight, colors }: RichTextEditorProps) => {
   const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);
   const [visible, setVisible] = useState(false);

   const webviewRef = useRef<WebView>(null);
   const hiddenInputRef = useRef<TextInput | null>(null);

   const colorScheme = useColorScheme();
   const isAndroid = Platform.OS === 'android';

   // *SNIP
   // this will be used and initiated ONLY when the network is unavailable
   // using @react-native-community/netinfo
   // if it is NOT available this asset should be downloaded
   // if not the original quill should be used
   const [offlineHtml, setOfflineHtml] = useState('');
   const [index, indexLoadingError] = useAssets(
      require('../../../assets/quill-js/offlineQuill.html')
   );

   if (index) {
      readAsStringAsync(index[0].localUri as string).then((data) => {
         setOfflineHtml(data);
      });
   }

   // *SNIP

   const sendMessage = (message: Record<string, unknown>) =>
      webviewRef.current?.postMessage(JSON.stringify(message));

   const injectJS = (script: string) => webviewRef.current?.injectJavaScript(script);

   const focusInput = () => hiddenInputRef.current && hiddenInputRef.current?.focus();

   const initiateQuill = () => {
      // injectJS('document.body.style.height = `${HEIGHT}`;');
      setTimeout(() => {
         webviewRef.current?.requestFocus();
         injectJS('document.querySelector("#editor .ql-editor").focus();');
      }, 300);
   };

   const incomingMessage = (event: WebViewMessageEvent) => {
      console.log(event.nativeEvent.data);
      const message = JSON.parse(event.nativeEvent.data);
      switch (message.type) {
         case 'link':
            Linking.openURL(message.option);
            break;
         case 'ready':
            const bgColor = colorScheme === 'dark' ? colors.inverseOnSurface : colors.background;
            const body = { type: 'theme', theme: colorScheme, bg: bgColor };
            sendMessage(body);

            // once dom is loaded focus on the textInput first
            focusInput();
            break;
         case 'modal':
            setVisible(true);
         default:
            break;
      }
   };

   useFocusEffect(
      useCallback(() => {
         if (!visible) {
            // have to call it again then shift the focus to quill editor
            focusInput();
            initiateQuill();
         }
      }, [visible])
   );

   // lazy load? and if it not loaded then use loading indicator(?);
   useEffect(() => {
      const message = {
         type: 'keyboardHeight',
         keyboardHeight: keyboardHeight,
      };
      sendMessage(message);
   }, [keyboardHeight]);

   // if there is no network connection then... and also see the difference b/w
   // android and iOS for implementing changes
   if (isAndroid) {
      return (
         <View style={styles.container}>
            <TextInput ref={hiddenInputRef} style={styles.hiddenInput} />
            <WebView
               ref={webviewRef}
               originWhitelist={['*']}
               javaScriptEnabled={true}
               domStorageEnabled={true}
               source={{ html }}
               allowFileAccess={true}
               allowUniversalAccessFromFileURLs={true}
               onMessage={incomingMessage}
               onLoad={() => setIsWebViewLoaded(true)}
               onShouldStartLoadWithRequest={(request) => {
                  const url = JSON.parse(request.url);
                  if (request.url !== html) {
                     Linking.openURL(request.url);
                     return false;
                  }
                  return true;
               }}
               // onNavigationStateChange={(event) => {
               //    if (event.navigationType == 'click') {
               //       console.log(event.url);
               //       Linking.openURL('google.com');
               //    }
               // }}
            />
            {/* TODO: set this in another component(?) */}
            <LinkModal
               visible={visible}
               setVisible={setVisible}
               sendMessage={sendMessage}
               injectJS={injectJS}
            />
         </View>
      );
   }
   return (
      <View style={styles.container}>
         <WebView
            originWhitelist={['*']}
            scalesPageToFit
            scrollEnabled={false}
            testID='enhanced-editor'
            ref={webviewRef}
            source={{ html }}
            javaScriptEnabled={true}
            onMessage={incomingMessage}
            onLoad={() => setIsWebViewLoaded(true)}
            onError={(syntheticEvent) => {
               console.log(syntheticEvent.nativeEvent.url);
               const { nativeEvent } = syntheticEvent;
               console.log('WebView error: ', nativeEvent);
            }}
            style={[styles.webview, { backgroundColor: colors.onBackground }]}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      //   position: 'relative',
   },
   webview: {
      flex: 1,
   },
   hiddenInput: {
      height: 0,
      position: 'absolute',
      top: -100,
      left: 0,
      opacity: 0,
   },
});

export default RichTextEditor;
