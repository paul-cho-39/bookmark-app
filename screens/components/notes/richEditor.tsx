import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { Platform, Linking, Keyboard, BackHandler } from 'react-native';
import { WebView, WebViewProps } from 'react-native-webview';
import { WebViewEvent, WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';

import html from './webView/quill';

import useConnectStore from '../../../library/zustand/connectStore';
import useBoundedStore from '../../../library/zustand/store';
import { NotepadProps } from './notepad';
import useSettingsStore from '../../../library/zustand/settingsStore';
import useModalManager from '../../../library/hooks/useModalManager';
import ModalManager from './webView/modalManager';

// CONSIDER: this is editable Text Editor. If first created this is used
// if later edited this will be used and it may be the case that zustand will be the main
// state manager even for data(?);

type Messengers = {
   sendMessage: <T>(type: string, value: T) => void | undefined;
   injectJS: (script: string) => void | undefined;
   toggleQuillInput: (type: 'blur' | 'focus') => void;
};

type RichTextEditorProps = {
   messengers: Messengers;
} & NotepadProps &
   WebViewProps;

type MessageKeyWithBody = 'modal' | 'link';
type MessageKeyWithoutBody = 'ready';

const RichTextEditor = forwardRef<WebView, RichTextEditorProps>((props, ref) => {
   const { params, keyboardHeight, messengers, ...rest } = props;
   const { sendMessage, injectJS, toggleQuillInput } = messengers;
   const isDarkMode = useSettingsStore(
      (state) => state.userPreference.userGeneralSettings.display.isDarkMode
   );
   const isAnyNoteModalVisible = useConnectStore((state) => state.modal.note.isModalVisible);
   const bgColor = useBoundedStore(
      (state) => state.notes[params.id][params.logIndex].meta?.bgColor
   );

   const isAndroid = Platform.OS === 'android';
   const [_isWebViewLoaded, setIsWebViewLoaded] = useState(false);

   const { modals, modalIncomingMessageHandlers } = useModalManager(isDarkMode);

   const messageHandlersWithBody: Record<
      MessageKeyWithBody,
      (message: Record<string, any>) => void
   > = {
      modal: (message) => {
         console.log('message:', message);
         console.log('DELTA: ', message.body.delta);

         const modalHandler = modalIncomingMessageHandlers[message.body?.name as string];
         if (modalHandler && message.body?.selected) {
            modalHandler(message.body?.selected);
         } else modalHandler();
      },
      link: (message) => {
         if (message.body && message?.body) Linking.openURL(message.body.url as string);
      },
   };

   const messageHandlersWithoutBody: Record<MessageKeyWithoutBody, () => void> = {
      ready: () => {
         const body = {
            isDarkMode: isDarkMode,
            bgColor: bgColor,
            displayEditor: true,
         };
         sendMessage('theme', body);
         toggleQuillInput('focus');
      },
   };

   // MAIN MESSAGE HERE
   const incomingMessage = (event: WebViewMessageEvent) => {
      const message = JSON.parse(event.nativeEvent.data);

      const handlerWithoutBody = messageHandlersWithoutBody[message.type as MessageKeyWithoutBody];
      if (handlerWithoutBody) {
         handlerWithoutBody();
         return;
      }

      const handlerWithBody = messageHandlersWithBody[message.type as MessageKeyWithBody];
      if (handlerWithBody && message.body) {
         handlerWithBody(message);
         return;
      }

      console.warn('Unhandled message type:', message.type);
   };

   // change this logic when all modal is added;
   // move this logic to modalManager;
   // useEffect(() => {
   //    if (!isLinkModalVisible) setFocus();
   // }, [isLinkModalVisible]);

   useEffect(() => {
      if (
         isAnyNoteModalVisible.visible &&
         isAnyNoteModalVisible.dismissKeyboard &&
         Keyboard.isVisible()
      ) {
         toggleQuillInput('blur');
      }

      sendMessage('displayToolbar', isAnyNoteModalVisible);
      sendMessage('theme', { isDarkMode, bgColor });
   }, [isAnyNoteModalVisible, bgColor]);

   useEffect(() => {
      sendMessage('keyboardHeight', keyboardHeight);
   }, [keyboardHeight]);

   // ---------------------TESTING-------------------------

   // ---------------------TESTING-------------------------

   // if there is no network connection then... and also see the difference b/w
   // android and iOS for implementing changes
   if (isAndroid) {
      return (
         <>
            <WebView
               ref={ref}
               scalesPageToFit
               scrollEnabled={false}
               allowFileAccess={true}
               originWhitelist={['*']}
               javaScriptEnabled={true}
               domStorageEnabled={true}
               source={{ html }}
               allowUniversalAccessFromFileURLs={true}
               onMessage={incomingMessage}
               onLoad={() => {
                  setIsWebViewLoaded(true);
               }}
               onShouldStartLoadWithRequest={(request) => {
                  const url = JSON.parse(request.url);
                  if (request.url !== html) {
                     Linking.openURL(request.url);
                     return false;
                  }
                  return true;
               }}
               {...rest}
            />
            <ModalManager
               modals={modals}
               sendMessage={sendMessage}
               keyboardHeight={keyboardHeight}
               isDarkMode={isDarkMode}
            />
         </>
      );
   }
   return (
      <>
         <WebView
            originWhitelist={['*']}
            scalesPageToFit
            scrollEnabled={false}
            testID='enhanced-editor'
            ref={ref}
            source={{ html }}
            javaScriptEnabled={true}
            onMessage={incomingMessage}
            onLoad={() => setIsWebViewLoaded(true)}
            onError={(syntheticEvent) => {
               console.log(syntheticEvent.nativeEvent.url);
               const { nativeEvent } = syntheticEvent;
               console.log('WebView error: ', nativeEvent);
            }}
         />
      </>
   );
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
