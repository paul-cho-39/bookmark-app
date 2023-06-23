import { useEffect, useLayoutEffect, useState } from 'react';
import IconButton from '../../../../components/buttons/icons/iconButton';
import { AntDesign } from '@expo/vector-icons';
import BottomDrawer from '../../../../components/bottomDrawer';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import useGetKeyboardHeight from '../../../../library/hooks/useGetKeyboardHeight';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import Tags from './noteTags';
import { ICONS } from '../../../../assets/constants';
import NoteTagHeader from './noteTagHeader';
import { NoteTagsParams } from '../../../../library/zustand/utils/notes/retriever';

interface NoteTagIconProps {
   colors: MD3Colors;
   noteTags: NoteTagsParams;
}

const NoteTagIcon = ({ noteTags, colors }: NoteTagIconProps) => {
   const [isDrawerVisible, setDrawerVisible] = useState(false);
   const [shouldAddTags, setShouldAddTags] = useState(false);
   const keyboardHeight = useGetKeyboardHeight();

   useLayoutEffect(() => {
      if (keyboardHeight === 0) {
         setShouldAddTags(false);
      }
   }, [keyboardHeight]);

   const closeDrawer = () => {
      setShouldAddTags(false);
      setDrawerVisible(false);
   };

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
            height={keyboardHeight === 0 ? '30%' : '65%'}
            isVisible={isDrawerVisible}
            onClose={closeDrawer}
            colors={colors}
            style={styles.bottomDrawer}
         >
            <KeyboardAvoidingView
               behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
               accessibilityViewIsModal
               style={{ ...styles.container }}
            >
               <NoteTagHeader />
               <Tags
                  noteTags={noteTags}
                  colors={colors}
                  shouldAddTags={shouldAddTags}
                  setShouldAddTags={setShouldAddTags}
               />
            </KeyboardAvoidingView>
         </BottomDrawer>
      </>
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

export default NoteTagIcon;
