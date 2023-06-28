import React, { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import useGetKeyboardHeight from '../../../../library/hooks/useGetKeyboardHeight';
import { StyleSheet, View, Text } from 'react-native';

import NoteTagHeader from './noteTagHeader';
import Tags from './noteTags';
import useBoundedStore from '../../../../library/zustand/store';
import { NoteAppbarParams } from '../../../../constants';
import { Modalize } from 'react-native-modalize';
import { height } from '../../../../library/helper';
import { setNoteModalVisible } from '../../../../library/zustand/logic/connector-logic';

interface NoteTagsDrawerProps extends NoteAppbarParams {}

const NoteTagsDrawer = forwardRef<Modalize, NoteTagsDrawerProps>((props, ref) => {
   const { params, colors } = props;
   const { id, logIndex } = params;
   const [init, setInit] = useState(false);
   const tags = useBoundedStore((state) => state.notes[id][logIndex].tags);

   // have to experiment for better experience with tags
   const keyboardHeight = useGetKeyboardHeight();

   const onHanldeOpened = () => {
      setNoteModalVisible('opened');
      setTimeout(() => {
         setInit(true);
      }, 200);
   };

   const onHandleClosed = () => {
      setNoteModalVisible('closed');
      setInit(false);
   };

   const tagsContainerBottom = keyboardHeight >= 1 ? keyboardHeight : 5;
   const modalHeight = init && keyboardHeight >= 1 ? undefined : height * 0.65;

   return (
      <Modalize
         closeOnOverlayTap
         threshold={50} // tags scroll should be priority
         dragToss={0.5}
         avoidKeyboardLikeIOS={true}
         onOpened={onHanldeOpened}
         modalHeight={init ? modalHeight : undefined}
         closeAnimationConfig={{ timing: { duration: 50 } }}
         onClose={onHandleClosed}
         ref={ref}
         HeaderComponent={<NoteTagHeader onPressTags={() => ref.current.close()} colors={colors} />}
         FooterComponent={
            <>
               <View
                  accessibilityViewIsModal
                  style={{
                     ...styles.container,
                     bottom: tagsContainerBottom,
                  }}
               >
                  <Tags
                     tagsData={tags}
                     params={params}
                     colors={colors}
                     inputHeight={keyboardHeight}
                  />
               </View>
            </>
         }
      >
         <></>
      </Modalize>
   );
});

const styles = StyleSheet.create({
   bottomDrawer: {
      borderWidth: 0,
      borderRadius: 10,
   },
   // container: {
   //    flex: 1,
   //    position: 'absolute',
   //    width: '100%',
   //    // zIndex: 5000,

   // },
   container: {
      flex: 1,
      position: 'absolute',
      width: '100%',
      // zIndex: 5000,
   },
   container__full: {
      flex: 1,
      width: '100%',
   },
});

export default NoteTagsDrawer;

// return (
//    <BottomDrawer
//       height={'65%'}
//       isVisible={isDrawerVisible}
//       onClose={closeDrawer}
//       colors={colors}
//       style={[styles.bottomDrawer]}
//    >
//       {/* create another component here */}
//       <View collapsable accessibilityViewIsModal style={{ ...styles.container }}>
//          <NoteTagHeader
//             isInputFocused={isDrawerVisible}
//             setIsDrawer={setDrawerVisible}
//             colors={colors}
//          />
//          <Tags
//             tagsData={tags}
//             params={params}
//             colors={colors}
//             keyboardHeight={keyboardHeight}
//             shouldAddTags={shouldAddTags}
//             setShouldAddTags={setShouldAddTags}
//          />
//       </View>
//    </BottomDrawer>
// );
