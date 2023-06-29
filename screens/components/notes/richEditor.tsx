import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TextInput, StyleSheet, View, Platform, Linking, Keyboard } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewEvent, WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';
import { useFocusEffect } from '@react-navigation/native';

import html from './webView/quill';

import LinkModal from './webView/linkModal';
import useConnectStore from '../../../library/zustand/connectStore';
import useBoundedStore from '../../../library/zustand/store';
import { NotepadProps } from './notepad';
import useSettingsStore from '../../../library/zustand/settingsStore';

// CONSIDER: this is editable Text Editor. If first created this is used
// if later edited this will be used and it may be the case that zustand will be the main
// state manager even for data(?);

const RichTextEditor = ({ params, keyboardHeight }: NotepadProps) => {
   const isDarkMode = useSettingsStore(
      (state) => state.userPreference.userGeneralSettings.display.isDarkMode
   );
   const isAnyNoteModalVisible = useConnectStore((state) => state.modal.note.isModalVisible);
   const bgColor = useBoundedStore(
      (state) => state.notes[params.id][params.logIndex].meta?.bgColor
   );

   const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);
   const [isLinkModalVisible, setLinkModalVisible] = useState(false);

   const webviewRef = useRef<WebView>(null);
   const hiddenInputRef = useRef<TextInput | null>(null);

   const isAndroid = Platform.OS === 'android';

   // ----- helper function -----
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

   function createMessage<T>(type: string, value: T) {
      return {
         type: type,
         value: value,
      };
   }

   // MAIN MESSAGE HERE
   const incomingMessage = (event: WebViewMessageEvent) => {
      console.log(event.nativeEvent.data);
      const message = JSON.parse(event.nativeEvent.data);
      switch (message.type) {
         case 'link':
            Linking.openURL(message.option);
            break;
         case 'ready':
            const body = { isDarkMode: isDarkMode, bgColor: bgColor };
            sendMessage(createMessage('theme', body));
            focusInput();
            break;
         case 'modal':
            setLinkModalVisible(true);
            break;
         default:
            break;
      }
   };

   useFocusEffect(
      useCallback(() => {
         if (!isLinkModalVisible) {
            // have to call it again then shift the focus to quill editor
            focusInput();
            initiateQuill();
         }
      }, [isLinkModalVisible])
   );

   // lazy load? and if it not loaded then use loading indicator(?);
   // should this be refactored or packaged into a hook(?)
   // TODO: find a way to speed up the time for this;
   useEffect(() => {
      if (isAnyNoteModalVisible && Keyboard.isVisible()) {
         Keyboard.dismiss();
         injectJS('document.querySelector("#editor .ql-editor").blur();');
      }
      sendMessage(createMessage('keyboardHeight', keyboardHeight));
      sendMessage(createMessage('displayToolbar', isAnyNoteModalVisible));
      sendMessage(createMessage('theme', { isDarkMode, bgColor }));
   }, [keyboardHeight, isAnyNoteModalVisible, bgColor]);

   // if there is no network connection then... and also see the difference b/w
   // android and iOS for implementing changes
   if (isAndroid) {
      return (
         <>
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
               style={[styles.webview]}
            />
            {/* TODO: set this in another component(?) */}
            <LinkModal
               visible={isLinkModalVisible}
               setVisible={setLinkModalVisible}
               sendMessage={sendMessage}
               injectJS={injectJS}
            />
         </>
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
            style={[styles.webview, { backgroundColor: bgColor }]}
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

// send the note data when the user presses back or presses save
// the save button should be global and called from here
// when the note is first written then send the data that it has been modified

// *SNIP
// this will be used and initiated ONLY when the network is unavailable
// using @react-native-community/netinfo
// if it is NOT available this asset should be downloaded
// if not the original quill should be used

// so this should be a hook logic and used for whether to display
// offline.
// TODO: create anotehr component for this
// const [offlineHtml, setOfflineHtml] = useState('');
// const [index, indexLoadingError] = useAssets(
//    require('../../../assets/quill-js/offlineQuill.html')
// );

// if (index) {
//    readAsStringAsync(index[0].localUri as string).then((data) => {
//       setOfflineHtml(data);
//    });
// }
// // *SNIP
