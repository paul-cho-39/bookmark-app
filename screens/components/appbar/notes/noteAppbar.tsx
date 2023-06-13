import { Appbar, Menu, IconButton, Divider, TextInput, Text } from 'react-native-paper';
import { BackHandler, Platform, SafeAreaView, StyleSheet, View } from 'react-native';

import { useEffect, useState } from 'react';
import { width as WIDTH } from '../../../../library/helper';
import { NotesNavigationProp } from '../../../../library/@types/navigation';
import useBoundedStore from '../../../../library/zustand/store';
import NoteHeaderTitle from './editableAppbar';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import EditableAppbar from './editableAppbar';
import AnimatedBackButton from './animatedBackButton';

// SAVED (CHECKMARK), PUBLIC/PRIVATE, X-CLOSE BUTTON, WORDS (ICON), TAGS (TAG)

// make WORDS, TAGS, AND SAVED AS A DICT OR OBJECT

type Mode = 'small' | 'large';
const PRIMARY_ICON_SIZE = 28;
const SECONDARY_ICON_SIZE = 20;

interface NoteAppbarProps extends NotesNavigationProp {
   colors: MD3Colors;
}

const NoteAppbar = ({ navigation, route, colors }: NoteAppbarProps) => {
   const { logIndex } = route.params.params;
   const notes = useBoundedStore((state) => state.notes);

   const [visible, setVisible] = useState(false);

   const openMenu = () => setVisible(true);
   const closeMenu = () => setVisible(false);

   // const setTitle = (title: string) => {

   //    closeMenu();
   // };

   const [title, setTitle] = useState('Title');
   const [mode, setMode] = useState<Mode>('small');

   const handleTitlePress = () => {
      setMode(mode === 'small' ? 'large' : 'small');
   };

   useEffect(() => {
      if (Platform.OS === 'android') {
         const backAction = () => {
            if (mode === 'large') {
               setMode('small');
               return true;
            }
            return false;
         };

         const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

         return () => backHandler.remove();
      }
   }, [mode]);

   return (
      <SafeAreaView style={styles.container}>
         {mode === 'small' ? (
            // <Appbar.Header testID='note-appbar' mode='small'>
            //    <AnimatedBackButton
            //       mode={mode}
            //       color={colors.onSurface}
            //       size={PRIMARY_ICON_SIZE}
            //       onPress={() => navigation.goBack()}
            //       style={styles.backButton}
            //    />
            //    <View style={styles.wrapper}>
            //       <Appbar.Content title={title} onPress={handleTitlePress} />
            //    </View>
            // </Appbar.Header>
            <View
               testID='note-appbar'
               style={{ ...styles.headerContainer, backgroundColor: colors.elevation.level5 }}
            >
               <AnimatedBackButton
                  mode={mode}
                  color={colors.onSurface}
                  size={PRIMARY_ICON_SIZE}
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
               />
               <View style={styles.wrapper}>
                  <Text variant='titleLarge' style={styles.title} onPress={handleTitlePress}>
                     Title
                  </Text>
               </View>
            </View>
         ) : (
            <EditableAppbar
               title={title}
               setTitle={setTitle}
               mode={mode}
               setMode={setMode}
               onBlur={handleTitlePress}
               colors={colors}
               iconStyle={styles.backButton}
               style={styles.wrapper}
            />
         )}
         {/* <NoteHeaderTitle colors={colors} /> */}
         {/* <Appbar.Content title={titles} onPress={() => setVisible(!visible)} /> */}
         {/* <Menu
                  testID='note-appbar-menu'
                  visible={visible}
                  anchorPosition='bottom'
                  anchor={
                     <IconButton
                        icon='chevron-down'
                        size={SECONDARY_ICON_SIZE}
                        onPress={openMenu}
                        style={styles.icon}
                     />
                  }
                  onDismiss={closeMenu}
                  keyboardShouldPersistTaps='always'
                  contentStyle={styles.content}
                  style={styles.menuContent}
               >
                  <Menu.Item onPress={() => setTitle('Title 1')} title='Title 1' />
               </Menu>
               <Divider />  */}
      </SafeAreaView>
   );
};

// put this in a separate stylesheet
const HEADER_HEIGHT = 80;
const CONTENT_WIDTH = '32%';
const BACK_HORIZONTAL = 0.03;
const MARGIN_HORIZONTAL = 3;
const LEFT_ALIGNMENT = WIDTH * BACK_HORIZONTAL + MARGIN_HORIZONTAL * 2;

const styles = StyleSheet.create({
   container: {
      width: WIDTH,
   },
   headerContainer: {
      height: HEADER_HEIGHT,
      flexDirection: 'row',
   },
   wrapper: {
      marginHorizontal: `${MARGIN_HORIZONTAL}%`,
      paddingHorizontal: '2.5%',
      width: CONTENT_WIDTH,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 3,
   },
   backButton: {
      top: HEADER_HEIGHT / 2,
      left: 0,
      marginHorizontal: WIDTH * BACK_HORIZONTAL,
   },
   title: {
      position: 'absolute',
      top: HEADER_HEIGHT / 2,
   },
   // backButton: {
   //    marginHorizontal: WIDTH * BACK_HORIZONTAL,
   // },
   menuContent: {
      width: CONTENT_WIDTH,
      left: `${LEFT_ALIGNMENT}%`,
      textAlign: 'center',
   },
   content: {
      justifyContent: 'center',
      alignContent: 'center',
   },
   icon: {
      right: '80%',
      top: 2,
   },
});

export default NoteAppbar;
