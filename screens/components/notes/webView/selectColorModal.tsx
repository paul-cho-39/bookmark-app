import { Text, useTheme } from 'react-native-paper';
import CustomModal from '../../../../components/modal';
import { ModalEditorType } from './linkModal';
import { StyleSheet, View } from 'react-native';

import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { TextColors } from '../../../../library/helper/setDefaultColor';
import { EDITOR_HEIGHT, MODAL_STYLES } from '../../../../constants/notes';

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
   const noteTextColors = Object.values(textColors);

   const checkEqual = (first: string, second: string) =>
      first.toLocaleLowerCase() === second.toLocaleLowerCase();

   const renderCheckText = () => <Text style={styles.checkmark}>✓</Text>;

   const renderItem = ({ item }: { item: string }) => (
      <>
         <TouchableOpacity
            activeOpacity={1}
            accessibilityRole='button'
            accessibilityHint={`Change ${colorType}`}
            style={[
               styles.circle,
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
         color={props.colors.primaryContainer}
         displayGoBack
         backButtonPosition='right'
         backButtonName='md-close'
         hitSlot={{ top: 5, left: 5, right: 5 }}
         containerStyle={[
            styles.modalContainer,
            {
               bottom: keyboardHeight + EDITOR_HEIGHT,
            },
         ]}
         titleStyle={styles.modalTitle}
         displayDivider={false}
         {...props}
      >
         <View collapsable style={styles.innerContainer}>
            <FlatList
               bounces
               horizontal
               automaticallyAdjustContentInsets
               accessibilityRole='list'
               data={noteTextColors}
               keyExtractor={(item) => item}
               renderItem={renderItem}
               style={styles.itemContainer}
            />
         </View>
      </CustomModal>
   );
};

const MODAL_WIDTH = 75;
const MODAL_MARGIN = (100 - MODAL_WIDTH) / 2;
const COLOR_HEIGHT = 35;
const COLOR_WIDTH = 35;

const styles = StyleSheet.create({
   modalContainer: {
      width: `${MODAL_WIDTH}%`,
      marginHorizontal: `${MODAL_MARGIN}%`,
      height: MODAL_STYLES.MODAL_HEIGHT,
      borderRadius: MODAL_STYLES.BORDER_RADIUS,
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
   circle: {
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
// 6) an optional name for 'link'
// 7) checkbutton should have better animation
