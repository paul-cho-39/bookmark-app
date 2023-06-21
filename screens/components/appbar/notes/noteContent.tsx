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

interface NoteTagIconProps {
   colors: MD3Colors;
   noteTags: { tags: string[] | undefined; logIndex: number };
}

const chipData = ['Chip 1', 'Chip 2', 'Chip 3', 'Chip 4', 'Chip 5', 'Chip 6'];

const NoteTagIcon = ({ noteTags, colors }: NoteTagIconProps) => {
   const [isDrawerVisible, setDrawerVisible] = useState(false);
   const [shouldAddTags, setShouldAddTags] = useState(false);
   const [height, setHeight] = useState('30%');
   const keyboardHeight = useGetKeyboardHeight();

   useLayoutEffect(() => {
      const DEFAULT_HEIGHT = 35; // in percentage

      if (keyboardHeight === 0) {
         setShouldAddTags(false);
         setHeight(`${DEFAULT_HEIGHT}%`);
      } else {
         const availableScreenHeight = windowHeight - keyboardHeight;
         const newHeight = Math.round((availableScreenHeight / windowHeight) * 100) + 10;
         setHeight(`${newHeight}%`);
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
            height={height}
            isVisible={isDrawerVisible}
            onClose={closeDrawer}
            role='listitem'
            colors={colors}
         >
            <View style={styles.container}>
               <Tags
                  colors={colors}
                  tagsData={noteTags.tags}
                  logIndex={noteTags.logIndex}
                  shouldAddTags={shouldAddTags}
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
