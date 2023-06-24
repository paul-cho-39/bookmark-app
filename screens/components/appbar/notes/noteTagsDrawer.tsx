import React, { useLayoutEffect, useState } from 'react';
import useGetKeyboardHeight from '../../../../library/hooks/useGetKeyboardHeight';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

import BottomDrawer from '../../../../components/bottomDrawer';
import NoteTagHeader from './noteTagHeader';
import Tags from './noteTags';
import { NoteIconContentsProps } from './noteIconContents';
import useBoundedStore from '../../../../library/zustand/store';

interface NoteTagsDrawerProps extends Pick<NoteIconContentsProps, 'params' | 'colors'> {
   isDrawerVisible: boolean;
   setDrawerVisible: (value: NoteTagsDrawerProps['isDrawerVisible']) => void;
}

const NoteTagsDrawer = (props: NoteTagsDrawerProps) => {
   const { isDrawerVisible, setDrawerVisible, params, colors } = props;
   const { id, logIndex } = params;

   const tags = useBoundedStore((state) => state.notes[id][logIndex].tags);
   const noteTags = { tags, id, logIndex };

   const [shouldAddTags, setShouldAddTags] = useState(false);
   const keyboardHeight = useGetKeyboardHeight();

   useLayoutEffect(() => {
      if (keyboardHeight === 0) {
         setTimeout(() => {
            shouldAddTags && setShouldAddTags(false);
         }, 300);
      }
   }, [keyboardHeight]);

   const closeDrawer = () => {
      setShouldAddTags(false);
      setDrawerVisible(false);
   };

   return (
      <BottomDrawer
         height={keyboardHeight === 0 ? '30%' : '65%'}
         isVisible={isDrawerVisible}
         onClose={closeDrawer}
         colors={colors}
         style={styles.bottomDrawer}
      >
         {/* create another component here */}
         <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            accessibilityViewIsModal
            style={{ ...styles.container }}
         >
            <NoteTagHeader
               isInputFocused={isDrawerVisible}
               setIsDrawer={setDrawerVisible}
               colors={colors}
            />
            <Tags
               noteTags={noteTags}
               colors={colors}
               keyboardHeight={keyboardHeight}
               shouldAddTags={shouldAddTags}
               setShouldAddTags={setShouldAddTags}
            />
         </KeyboardAvoidingView>
      </BottomDrawer>
   );
};

const styles = StyleSheet.create({
   bottomDrawer: {
      borderWidth: 0,
      borderRadius: 10,
   },
   container: {
      flex: 1,
      width: '100%',
   },
});

export default React.memo(NoteTagsDrawer);
