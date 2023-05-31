import { Appbar, Menu, IconButton, Divider } from 'react-native-paper';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { useRef, useState } from 'react';
import BackButton from '../../../../components/buttons/backButton';
import { width as WIDTH } from '../../../../library/helper';

// SAVED (CHECKMARK), PUBLIC/PRIVATE, X-CLOSE BUTTON, WORDS (ICON), TAGS (TAG)

// make WORDS, TAGS, AND SAVED AS A DICT OR OBJECT

const PRIMARY_ICON_SIZE = 28;
const SECONDARY_ICON_SIZE = 20;

const NoteAppbar = () => {
   const [visible, setVisible] = useState(false);

   const openMenu = () => setVisible(true);
   const closeMenu = () => setVisible(false);

   const setTitle = (title: string) => {
      // from zustand import lazily whenever setting the title
      console.log(title);
      closeMenu();
   };

   return (
      <SafeAreaView style={styles.container}>
         <Appbar.Header testID='note-appbar'>
            <BackButton
               size={PRIMARY_ICON_SIZE}
               name='md-close'
               color={'white'}
               style={styles.backButton}
            />
            <View style={styles.wrapper}>
               <Appbar.Content title='Public' onPress={() => setVisible(!visible)} />
               <Menu
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
                  contentStyle={styles.content}
                  style={styles.menuContent}
               >
                  <Menu.Item onPress={() => setTitle('Title 1')} title='Title 1' />
               </Menu>
               <Divider />
            </View>
         </Appbar.Header>
      </SafeAreaView>
   );
};

const CONTENT_WIDTH = '45%';
const BACK_HORIZONTAL = 0.03;
const MARGIN_HORIZONTAL = 3;
const LEFT_ALIGNMENT = WIDTH * BACK_HORIZONTAL + MARGIN_HORIZONTAL * 2;

const styles = StyleSheet.create({
   container: {
      width: WIDTH,
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
      marginHorizontal: WIDTH * BACK_HORIZONTAL,
   },
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
