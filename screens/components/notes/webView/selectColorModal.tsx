import { StyleSheet, View, Text } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import CustomModal from '../../../../components/modal';
import { ModalEditorType } from './linkModal';

import { TextColors } from '../../../../library/helper/setDefaultColor';
import { EDITOR_HEIGHT, MODAL_STYLES } from '../../../../constants/notes';
import { useEffect, useMemo, useRef } from 'react';
import { getColorByContrast } from '../../../../library/helper';

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
   colors,
   keyboardHeight,
   ...props
}: SelectColorModalProps) => {
   const flatListRef = useRef<FlatList>(null);
   const noteTextColors = Object.values(textColors);

   const checkEqual = (first: string, second: string) =>
      first.toLocaleLowerCase() === second.toLocaleLowerCase();

   const getIndex = () =>
      noteTextColors.map((color) => color.toLowerCase()).indexOf(selectedColor.toLowerCase());

   const checkedColor = useMemo(() => getColorByContrast(selectedColor), [selectedColor]);

   const renderCheckText = () => <Text style={[styles.checkmark, { color: checkedColor }]}>✔</Text>;

   const renderItem = ({ item }: { item: string }) => (
      <>
         <TouchableOpacity
            activeOpacity={1}
            accessibilityRole='button'
            accessibilityHint={`Change ${colorType}`}
            accessibilityLabel={item}
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

   useEffect(() => {
      if (flatListRef && flatListRef.current) {
         flatListRef.current.scrollToIndex({
            animated: true,
            index: getIndex(),
            viewOffset: COLOR_HEIGHT / 2,
         });
      }
   }, [selectedColor]);

   return (
      <CustomModal
         visible={visible}
         setVisible={setVisible}
         title={header}
         color={colors.primaryContainer}
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
               scrollEnabled
               accessibilityRole='list'
               ref={flatListRef}
               data={noteTextColors}
               keyExtractor={(item) => item}
               renderItem={renderItem}
               // initialScrollIndex={getIndex()}
               style={styles.itemContainer}
               getItemLayout={(data, index) => ({
                  length: COLOR_HEIGHT + 1,
                  offset: (COLOR_HEIGHT + 1) * index,
                  index,
               })}
            />
         </View>
      </CustomModal>
   );
};

const MODAL_WIDTH = 65;
const MODAL_MARGIN = (100 - MODAL_WIDTH) / 2;
const COLOR_HEIGHT = 35;

const styles = StyleSheet.create({
   modalContainer: {
      width: `${MODAL_WIDTH}%`,
      marginHorizontal: `${MODAL_MARGIN}%`,
      height: MODAL_STYLES.MODAL_HEIGHT - 20,
      borderRadius: MODAL_STYLES.BORDER_RADIUS,
      position: 'absolute',
   },
   modalTitle: {
      textAlign: 'center',
      paddingBottom: 5,
      marginBottom: 10,
   },
   innerContainer: {
      paddingHorizontal: 12,
   },
   itemContainer: {
      flexDirection: 'row',
   },
   selected: {
      height: COLOR_HEIGHT * 1.3,
      width: COLOR_HEIGHT * 1.3,
      borderRadius: 50,
   },
   checkmark: {
      fontSize: 17,
   },
   circle: {
      width: COLOR_HEIGHT,
      height: COLOR_HEIGHT,
      borderRadius: 50,
      marginHorizontal: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
});

export default SelectColorModal;
