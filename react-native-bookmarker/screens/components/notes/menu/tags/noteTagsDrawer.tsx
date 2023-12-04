import React, { forwardRef, useState } from 'react';
import { Portal } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { NoteModalParams, NotesHeightParams } from '../../../../../constants';
import useGetKeyboardHeight from '../../../../../library/hooks/useGetKeyboardHeight';
import useBoundedStore from '../../../../../library/zustand/store';
import { shallow } from 'zustand/shallow';
import Tags from './noteTags';
import NoteTagHeader from './noteTagHeader';

const NoteTagsDrawer = forwardRef<Modalize, NoteModalParams>((props, ref) => {
   const { params, colors } = props;
   const { id, logIndex } = params;
   const [tags, headerColor] = useBoundedStore(
      (state) => [state.notes[id][logIndex].tags, state.notes[id][logIndex].meta?.headerColor],
      shallow
   );

   const keyboardHeight = useGetKeyboardHeight();
   const tagsContainerBottom = keyboardHeight >= 1 ? keyboardHeight : 5;
   const modalHeight = keyboardHeight >= 1 ? undefined : NotesHeightParams.TagsModalHeight;

   return (
      <Portal>
         <Modalize
            closeOnOverlayTap
            threshold={100} // tags scroll should be priority
            dragToss={0.1}
            avoidKeyboardLikeIOS={true}
            closeAnimationConfig={{ timing: { duration: 0 } }}
            modalHeight={modalHeight}
            ref={ref}
            onClosed={props.onCloseModal}
            modalStyle={{ backgroundColor: headerColor }}
            HeaderComponent={<NoteTagHeader onPressTags={props.onCloseModal} colors={colors} />}
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
      </Portal>
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
