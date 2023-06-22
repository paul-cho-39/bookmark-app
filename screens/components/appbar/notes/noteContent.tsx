import { useEffect, useLayoutEffect, useState } from 'react';
import IconButton from '../../../../components/buttons/icons/iconButton';
import { AntDesign } from '@expo/vector-icons';
import BottomDrawer from '../../../../components/bottomDrawer';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { height as windowHeight } from '../../../../library/helper';
import useGetKeyboardHeight from '../../../../library/hooks/useGetKeyboardHeight';
import { StyleSheet, View } from 'react-native';
import Tags from './noteTags';
import { ICONS } from '../../../../assets/constants';
import NoteTagHeader from './noteTagHeader';

interface NoteTagIconProps {
   colors: MD3Colors;
   noteTags: { tags: string[] | undefined; logIndex: number };
}

const DEFAULT_HEIGHT = 30; // in percentage

const NoteTagIcon = ({ noteTags, colors }: NoteTagIconProps) => {
   const [isDrawerVisible, setDrawerVisible] = useState(false);
   const [shouldAddTags, setShouldAddTags] = useState(false);
   // creating heights for views
   const [tagViewHeight, setTagViewHeight] = useState(0);
   const [height, setHeight] = useState(`${DEFAULT_HEIGHT}%`);
   const keyboardHeight = useGetKeyboardHeight();

   useLayoutEffect(() => {
      const addBy = 15;
      const viewHeight = Math.round((tagViewHeight / windowHeight) * 100);
      const defaultHeight = viewHeight + addBy;
      if (keyboardHeight === 0) {
         setShouldAddTags(false);
         setHeight(`${defaultHeight}%`);
      } else {
         const availableScreenHeight = windowHeight - keyboardHeight + tagViewHeight;
         const newHeight = Math.round((availableScreenHeight / windowHeight) * 100);
         setHeight(`${newHeight}%`);
      }
   }, [keyboardHeight]);

   const closeDrawer = () => {
      setShouldAddTags(false);
      setDrawerVisible(false);
   };

   //    const screenHeight = viewHeight - keyboardHeight;

   return (
      <>
         <IconButton
            onPress={() => setDrawerVisible(true)}
            style={{}}
            renderIcon={() => (
               <AntDesign name='tagso' color={colors.onSurface} size={ICONS.LARGE} />
            )}
         />
         <BottomDrawer
            height={height}
            isVisible={isDrawerVisible}
            onClose={closeDrawer}
            colors={colors}
         >
            <View
               onLayout={(e) => {
                  console.log(
                     'the main height of the modal is: ',
                     (windowHeight - e.nativeEvent.layout.height) / windowHeight
                  );
               }}
               accessibilityViewIsModal
               style={{ ...styles.container }}
            >
               <NoteTagHeader />
               <Tags
                  colors={colors}
                  tagsData={noteTags.tags}
                  logIndex={noteTags.logIndex}
                  shouldAddTags={shouldAddTags}
                  viewHeight={tagViewHeight}
                  setViewHeight={setTagViewHeight}
                  setShouldAddTags={setShouldAddTags}
               />
            </View>
         </BottomDrawer>
      </>
   );
};

const styles = StyleSheet.create({
   container: {
      width: '100%',
   },
});

export default NoteTagIcon;
