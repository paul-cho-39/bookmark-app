import React, { Suspense, useCallback, useEffect, useState } from 'react';

import CustomModal from '../../../../components/modal';
import { ModalEditorType } from './linkModal';
import { StyleSheet, View } from 'react-native';
import ExtraEditorMapper from './extraEditorMapper';
import {
   EDITOR_HEIGHT,
   MODAL_STYLES,
   ExtraEditorButtonParams,
   ExtraEditorInlineToolsIcon,
   ExtraEditorAlignmentsIcon,
   ExtraEditorIndentsIcon,
   FormatTypeKeys,
   ExtraEditorInlineToolsIconEnum,
   ExtraEditorAlignmentsIconEnum,
} from '../../../../constants/notes';

interface ExtraEditorModalProps extends ModalEditorType {
   keyboardHeight: number;
   formatType?: Record<FormatTypeKeys, string | string[]>;
}
// 1) change the typescript
// 2) when formatting there are some glitches when enter and backspace

// DOCUMENTINNG: to add extra editor:
// 1) add inside quill 2) add to one of alignment/indent/tools at ./constants/notes
// 3) add ExtraEditorModal, if the name is different from 'format- ' it may have to add extra function
// 4) if selected is not needed, extend it from makeIndentButton otherwise select toolsButtons
const ExtraEditorModal = (props: ExtraEditorModalProps) => {
   console.log('extra editor');
   const { visible, setVisible, sendMessage, keyboardHeight, ...rest } = props;

   const [alignmentButtons, setAlignmentButtons] = useState<ExtraEditorButtonParams[]>([]);
   const [toolsButtons, setToolsButtons] = useState<ExtraEditorButtonParams[]>([]);

   const formatName = (name: string) => {
      const index = name.lastIndexOf('-');
      return name.substring(index + 1);
   };

   const handleSingleSelectPress = useCallback(
      (name: ExtraEditorAlignmentsIcon) => {
         setAlignmentButtons((prevState) =>
            prevState.map((button) =>
               button.name === name ? { ...button, selected: true } : { ...button, selected: false }
            )
         );
         sendMessage('extraFormat', { format: 'align', type: formatName(name) });
      },
      [sendMessage]
   );

   const handleMultiSelectPress = useCallback(
      (name: ExtraEditorInlineToolsIcon) => {
         setToolsButtons((prevState) =>
            prevState.map((button) =>
               button.name === name ? { ...button, selected: !button.selected } : button
            )
         );
         sendMessage('extraFormat', { format: 'inline', type: formatName(name) });
      },
      [sendMessage]
   );

   const isSelected = useCallback(
      (typeKey: FormatTypeKeys, name: string) => {
         if (!props.formatType) return false;

         const formatData = props.formatType[typeKey];
         if (typeKey === 'inline' && Array.isArray(formatData)) {
            return formatData.includes(formatName(name));
         }
         return formatName(name) === formatData;
      },
      [props.formatType]
   );

   const createMultipleSelectableButton = (name: ExtraEditorInlineToolsIcon) => ({
      name,
      onPress: () => handleMultiSelectPress(name),
      selected: isSelected('inline', name),
   });

   const createSingleSelectableButton = useCallback(
      (name: ExtraEditorAlignmentsIcon, selected: boolean = false) => ({
         name,
         onPress: () => handleSingleSelectPress(name),
         selected,
      }),
      [handleSingleSelectPress]
   );
   const createStaticButton = (name: ExtraEditorIndentsIcon) => ({
      name,
      onPress: () => sendMessage('extraFormat', { format: 'indent', type: formatName(name) }),
   });

   // no need to store inside the state since this wont react to any changes
   const indentButtons: ExtraEditorButtonParams[] = [
      createStaticButton('format-indent-decrease'),
      createStaticButton('format-indent-increase'),
   ];

   useEffect(() => {
      if (visible) {
         setAlignmentButtons(
            ExtraEditorAlignmentsIconEnum.map((name) =>
               createSingleSelectableButton(
                  name,
                  !props.formatType?.alignment && name === 'format-align-left'
               )
            )
         );
         setToolsButtons(
            ExtraEditorInlineToolsIconEnum.map((name) => createMultipleSelectableButton(name))
         );
      }
   }, [props.visible, props.formatType]);

   return (
      <CustomModal
         displayGoBack
         displayDivider={false}
         backButtonPosition='right'
         backButtonName='md-close'
         hitSlot={{ top: 5, left: 5, right: 5 }}
         color={props.colors.primaryContainer}
         visible={visible}
         setVisible={setVisible}
         containerStyle={[
            styles.modalContainer,
            {
               bottom: keyboardHeight + EDITOR_HEIGHT,
            },
         ]}
         title='Format'
         titleStyle={styles.modalTitle}
         {...rest}
      >
         <View style={styles.iconsContainer}>
            <View style={styles.iconsTopWrapper}>
               <ExtraEditorMapper
                  colors={props.colors}
                  iconParams={alignmentButtons}
                  style={styles.alignmentContainer}
               />
               <ExtraEditorMapper
                  colors={props.colors}
                  iconParams={indentButtons}
                  style={styles.indentContainer}
               />
            </View>
            <ExtraEditorMapper
               colors={props.colors}
               iconParams={toolsButtons}
               style={styles.toolsContainer}
            />
         </View>
      </CustomModal>
   );
};

const MODAL_WIDTH = 60;
const MODAL_MARGIN = (100 - MODAL_WIDTH) / 2;

const styles = StyleSheet.create({
   modalContainer: {
      width: `${MODAL_WIDTH}%`,
      marginHorizontal: `${MODAL_MARGIN}%`,
      height: MODAL_STYLES.MODAL_HEIGHT,
      borderRadius: MODAL_STYLES.BORDER_RADIUS,
      position: 'absolute',
   },
   modalTitle: {
      marginBottom: 5,
      paddingBottom: 5,
      paddingLeft: '10%',
      textAlign: 'left',
   },
   iconsContainer: {
      rowGap: 10,
   },
   iconsTopWrapper: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignContent: 'flex-start',
      marginHorizontal: '6%',
   },
   alignmentContainer: {
      flexGrow: 1,
      marginHorizontal: '2%',
      alignSelf: 'flex-start',
      justifyContent: 'space-evenly',
   },
   indentContainer: {
      justifyContent: 'space-evenly',
   },
   toolsContainer: {
      justifyContent: 'space-around',
      marginHorizontal: '20%',
   },
});

export default ExtraEditorModal;
