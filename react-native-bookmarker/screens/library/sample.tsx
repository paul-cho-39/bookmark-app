// const webviewRef = useRef<WebView>(null);
// const hiddenRef = useRef<TextInput>(null);
// const activeObj = {
//    status: false,
//    cancelled: false,
//    count: 0,
// };

// const _sendMessage = (type: string, value: unknown) => {
//    const body = {
//       type: type,
//       value: value,
//    };
//    webviewRef.current?.postMessage(JSON.stringify(body));
// };
// const [active, setActive] = useState<ActiveProps>(activeObj);

// // the back button is no good and this has to be changed
// useFocusEffect(
//    useCallback(() => {
//       const onBackPress = () => {
//          if (active.status && active.cancelled) {
//             setActive({
//                ...active,
//                count: active.count + 1,
//             });
//             return false;
//          }
//          // create a limit where if it passes, it will allow it to go back
//          // and then reset it back dwon
//          // and figure out a better way to do this
//          return false;
//       };

//       BackHandler.addEventListener('hardwareBackPress', onBackPress);

//       return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//    }, [active])
// );

// const injectJS = (script: string) => webviewRef.current?.injectJavaScript(script);
// const toggleQuillInput = (type: 'blur' | 'focus') => {
//    type === 'focus'
//       ? injectJS('document.querySelector("#editor .ql-editor").focus();')
//       : injectJS('document.querySelector("#editor .ql-editor").blur();');
// };

// const toggleDummyInput = (type: 'blur' | 'focus') => {
//    type === 'focus'
//       ? injectJS('document.querySelector("#editor .ql-editor").focus();')
//       : injectJS('document.querySelector("#editor .ql-editor").blur();');
// };

// const enableTextSelectionScript = `
// document.getElementById("editor").style.zIndex = "4999";
// document.getElementById("dummy__editor").style.zIndex = "0";
//    `;

// const disableTextSelectionScript = `
//    document.getElementById("dummy__editor").style.zIndex = "4999";
//    document.getElementById("editor").style.zIndex = "0";
//       `;

// // CREATE A HISTORY and the object should be: { cancelled: boolean; ended: boolean: count: number }
// const handleTouchStart = (event: GestureResponderEvent) => {
//    // console.log(event.nativeEvent);
//    if (event.nativeEvent.pageX < 20) {
//       console.log('handled');
//       setActive({
//          ...active,
//          status: true,
//       });

//       // should it send and recieve back a response? BUT HOW?
//       toggleDummyInput('focus');
//       // injectJS(sameSelectionScript);
//       if (hiddenRef && hiddenRef.current) hiddenRef.current.focus();
//    }
//    if (active.count > 0) {
//       setActive(activeObj);
//       injectJS(enableTextSelectionScript);

//       toggleQuillInput('focus');
//    }
// };

// const hanldeTouchEnd = (event: GestureResponderEvent) => {
//    console.log('ENDED');

//    if (!active.status) return;
//    if (active.status && !active.cancelled) {
//       console.log('CANCELLED');
//       setActive({
//          ...active,
//          status: false,
//       });
//    }
//    // if (active.status && active.cancelled) {
//    //    setTimeout(() => {
//    //       // setActive(activeObj);
//    //       injectJS(enableTextSelectionScript);
//    //    }, 500);
//    // }
//    if (active.cancelled && active.count > 1) {
//       setActive(activeObj);
//       console.log('PRESSED AND THEN ENDED!');
//    }
// };

// const handleCancelled = (count: number) => {
//    // if (hiddenRef && hiddenRef.current) hiddenRef.current.focus();
//    if (active.status && !active.cancelled) {
//       _sendMessage('help', true);
//       console.log('STATUS BUT NOT CANCELLED:');
//       toggleDummyInput('focus');
//       setActive({
//          ...active,
//          cancelled: true,
//          status: true,
//       });
//       // createTimeout(() => injectJS(disableTextSelectionScript), 200);
//       injectJS(disableTextSelectionScript);
//    }
//    if (active.status && active.cancelled) {
//       _sendMessage('help', true);
//       // toggleDummyInput('focus');
//       setActive({
//          ...active,
//          count: count + 1,
//       });
//       console.log('COUNTING', active.count);
//       injectJS(disableTextSelectionScript);
//       console.log('BOTH CANCELLED AND STATUS:');
//    }
//    if (active.count > count) {
//       console.log('counting: ', active.count);
//    }
// };

// const keyboardHeight = useGetKeyboardHeight();

// // useEffect(() => {
// //    if (keyboardHeight <= 0) {
// //       console.log('keyboard down');

// //       toggleDummyInput('blur');
// //       toggleQuillInput('blur');

// //       setTimeout(() => {
// //          // if (active.cancelled)
// //          setActive({
// //             ...active,
// //             count: active.count + 1,
// //          });
// //       }, 50);
// //    }
// // }, [keyboardHeight]);

// QUILL DUMMY SAMPLE:
// #dummy__editor {
//     background-color: transparent;
//     height: 100%;
//     // background-color: red;
//     // height: auto;
//     // min-height: 200px;
//     margin: 0 10 0 10;
//     width: 100%;
//     position: absolute;
//     z-index: 0;
//     top: 0
//   }
