import { Keyboard, StyleSheet, View } from 'react-native';
import CustomModal from '../../../../../components/modal';
import { Button, Text } from 'react-native-paper';
import useConnectStore from '../../../../../library/zustand/connectStore';
import { setNoteMenuModals } from '../../../../../library/zustand/logic/connector-logic';
import { height, width } from '../../../../../library/helper';
import { FontAwesome } from '@expo/vector-icons';
import { ICONS, NoteAppbarParams } from '../../../../../constants';
import useBoundedStore from '../../../../../library/zustand/store';
import { resetNote } from '../../../../../library/zustand/logic/bounded-logic/noteLogic';
import { useNavigation } from '@react-navigation/native';

const AddNoteToFavorite = (props: NoteAppbarParams) => {
   const {
      colors,
      params: { logIndex, id },
   } = props;
   const navigation = useNavigation();
   const isKeyboardVisible = Keyboard.isVisible();
   useBoundedStore((state) => state.notes[id][logIndex].note);
   const isTrashVisible = useConnectStore((state) => state.modal.note.isTrashVisible);

   const setNoteVisible = (visible: boolean) => {
      setNoteMenuModals('isTrashVisible', visible);
   };

   // CONSIDER: if the note is successfully deleted should display Toast
   const deleteCurrentNote = () => {
      resetNote(id, logIndex, () => {
         navigation.goBack();
      });
   };

   const renderTitle = () => (
      <View style={styles.titleContainer}>
         <FontAwesome
            name='trash-o'
            size={ICONS.MEDIUM}
            color={colors.onSurface}
            style={styles.title}
         />
         <Text variant='headlineSmall' style={styles.title}>
            Delete
         </Text>
      </View>
   );

   const contentDescription = 'Do you want to delete this book journal entry?';

   return (
      <>
         {isTrashVisible && (
            <CustomModal
               title={''}
               headerElement={renderTitle()}
               visible={isTrashVisible}
               setVisible={setNoteVisible}
               containerStyle={[styles.modal, { bottom: isKeyboardVisible ? '20%' : '10%' }]}
               color={colors.elevation.level2}
               displayDivider={false}
            >
               <View style={styles.subContainer}>
                  <Text style={styles.description} variant='bodyMedium'>
                     {contentDescription}
                  </Text>
                  <View style={styles.buttonContainer}>
                     <View style={{ width: '35%', backgroundColor: 'transparent' }}></View>
                     <Button
                        style={styles.button}
                        mode='outlined'
                        onPress={() => setNoteVisible(false)}
                     >
                        Cancel
                     </Button>

                     <Button style={styles.button} mode='outlined' onPress={deleteCurrentNote}>
                        Delete
                     </Button>
                  </View>
               </View>
            </CustomModal>
         )}
      </>
   );
};

const MODAL_WIDTH_MULTIPLIER = 0.7;
const MODAL_LEFT_POSITION = ((1 - MODAL_WIDTH_MULTIPLIER) / 2) * 100;

const styles = StyleSheet.create({
   modal: {
      height: height * 0.3,
      width: width * MODAL_WIDTH_MULTIPLIER,
      left: `${MODAL_LEFT_POSITION}%`,
      borderRadius: 25,
   },
   titleContainer: {
      top: -15,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      alignContent: 'center',
   },
   subContainer: {
      paddingHorizontal: 0,
      marginBottom: -10,
   },
   buttonContainer: {
      paddingTop: 15,
      paddingHorizontal: 5,
      marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'baseline',
   },
   title: {
      marginBottom: 10,
      textAlign: 'center',
   },
   description: {
      flexWrap: 'wrap',
      textAlign: 'center',
      paddingHorizontal: 25,
   },
   button: {
      borderWidth: 0,
      alignSelf: 'flex-end',
   },
});

export default AddNoteToFavorite;
