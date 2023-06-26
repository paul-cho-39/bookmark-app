import React, { useLayoutEffect, useState } from 'react';
import useGetKeyboardHeight from '../../../../library/hooks/useGetKeyboardHeight';
import { StyleSheet, View } from 'react-native';

import BottomDrawer from '../../../../components/bottomDrawer';
import NoteTagHeader from './noteTagHeader';
import Tags from './noteTags';
import useBoundedStore from '../../../../library/zustand/store';
import { NoteAppbarParams } from '../../../../constants';

interface NoteTagsDrawerProps extends NoteAppbarParams {
   isDrawerVisible: boolean;
   setDrawerVisible: (value: NoteTagsDrawerProps['isDrawerVisible']) => void;
}

const NoteTagsDrawer = (props: NoteTagsDrawerProps) => {
   const { isDrawerVisible, setDrawerVisible, params, colors } = props;
   const { id, logIndex } = params;
   const tags = useBoundedStore((state) => state.notes[id][logIndex].tags);

   const [shouldAddTags, setShouldAddTags] = useState(false);

   // have to experiment for better experience with tags
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
         height={'65%'}
         isVisible={isDrawerVisible}
         onClose={closeDrawer}
         colors={colors}
         style={[styles.bottomDrawer]}
      >
         {/* create another component here */}
         <View collapsable accessibilityViewIsModal style={{ ...styles.container }}>
            <NoteTagHeader
               isInputFocused={isDrawerVisible}
               setIsDrawer={setDrawerVisible}
               colors={colors}
            />
            <Tags
               tagsData={tags}
               params={params}
               colors={colors}
               keyboardHeight={keyboardHeight}
               shouldAddTags={shouldAddTags}
               setShouldAddTags={setShouldAddTags}
            />
         </View>
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

export default NoteTagsDrawer;
