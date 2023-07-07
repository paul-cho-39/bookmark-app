import { Text, useTheme } from 'react-native-paper';
import CustomModal from '../../../../components/modal';
import { ModalEditorType } from './linkModal';
import { StyleSheet, View } from 'react-native';

import { width as WIDTH, height as HEIGHT } from '../../../../library/helper';
import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { TextColors } from '../../../../library/helper/setDefaultColor';
import BackButton from '../../../../components/buttons/backButton';

interface SelectColorModalProps extends ModalEditorType {
   header: string;
   colorType: 'color' | 'background';
   keyboardHeight: number;
   textColors: TextColors;
   setColor: (color: string) => void;
   selectedColor: string;
}

const SelectColorModal = ({
   header,
   colorType,
   visible,
   setVisible,
   textColors,
   setColor,
   sendMessage,
   selectedColor,
   keyboardHeight,
   ...props
}: SelectColorModalProps) => {
   const [height, setHeight] = useState(0);
   const noteTextColors = Object.values(textColors);

   const checkEqual = (first: string, second: string) =>
      first.toLocaleLowerCase() === second.toLocaleLowerCase();

   const renderCheckText = () => <Text style={styles.checkmark}>✓</Text>;

   const renderItem = ({ item }: { item: string }) => (
      <>
         <TouchableOpacity
            activeOpacity={1}
            style={[
               styles.rectangle,
               { backgroundColor: item },
               checkEqual(item, selectedColor) && styles.selected,
            ]}
            onPress={() => {
               setColor(item);
               sendMessage('textColor', { color: item, colorType: colorType });
            }}
         >
            {checkEqual(item, selectedColor) && renderCheckText()}
         </TouchableOpacity>
      </>
   );

   return (
      <CustomModal
         visible={visible}
         setVisible={setVisible}
         title={header}
         containerStyle={[
            styles.modalContainer,
            {
               bottom: keyboardHeight + height,
            },
         ]}
         titleStyle={styles.modalTitle}
         displayDivider={false}
         headerRight={
            <BackButton
               name='md-close'
               color={'white'}
               onPress={() => setVisible(false)}
               style={styles.backButton}
               hitSlop={{ left: 5, right: 5, top: 5 }}
            />
         }
         {...props}
      >
         <View style={styles.innerContainer}>
            <FlatList
               bounces
               horizontal
               automaticallyAdjustContentInsets
               data={noteTextColors}
               keyExtractor={(item) => item}
               renderItem={renderItem}
               style={styles.itemContainer}
               onLayout={(event) => {
                  const viewHeight = event.nativeEvent.layout.height;
                  setHeight(viewHeight);
               }}
            />
         </View>
      </CustomModal>
   );
};

const MODAL_WIDTH = 0.75;
const MODAL_MARGIN = (1 - MODAL_WIDTH) / 2;
const COLOR_HEIGHT = 35;
const COLOR_WIDTH = 35;

const styles = StyleSheet.create({
   modalContainer: {
      width: WIDTH * MODAL_WIDTH,
      marginHorizontal: WIDTH * MODAL_MARGIN,
      height: 120,
      borderRadius: 25,
      position: 'absolute',
   },
   modalTitle: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 20,
   },
   innerContainer: {
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
   },
   backButton: {},
   itemContainer: {
      flexDirection: 'row',
   },
   selected: {
      height: COLOR_HEIGHT * 1.3,
      width: COLOR_WIDTH * 1.15,
   },
   checkmark: {},
   rectangle: {
      width: COLOR_WIDTH,
      height: COLOR_HEIGHT,
      borderRadius: 20,
      marginHorizontal: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
});

export default SelectColorModal;

// 1) change the layout (make it look more crisp)
// 2) closing-button
// 3) more responsive to different mobile
// 4) see how it can be used so it DOES NOT re-render again
// 5) when highlighter color is "white" then it should just cancel the format;
