import React, { Suspense, useState } from 'react';

import CustomModal from '../../../../components/modal';
import { Text, useTheme } from 'react-native-paper';
import { ModalEditorType } from './linkModal';
import { StyleSheet, View } from 'react-native';
import ExtraEditorAlignment from './extraEditorAlignment';
import {
   EDITOR_HEIGHT,
   MODAL_STYLES,
   ExtraEditorButtonParams,
   ExtraEditorInlineToolsIcon,
   ExtraEditorAlignmentsIcon,
   ExtraEditorIndentsIcon,
} from '../../../../constants/notes';

interface ExtraEditorModalProps extends ModalEditorType {
   keyboardHeight: number;
   formatType?: Record<string, string>;
}

// to add extra editor:
// 1) add inside quill 2) add to one of alignment/indent/tools at ./constants/notes
// 3) add ExtraEditorModal, if the name is different from 'format- ' it may have to add extra function
// 4) if selected is not needed, extend it from makeIndentButton otherwise select toolsButtons
const ExtraEditorModal = (props: ExtraEditorModalProps) => {
   const { colors } = useTheme();
   const { visible, setVisible, sendMessage, keyboardHeight, ...rest } = props;

   const formatName = (name: string) => name.replace('format-', '');

   const makeSelectableButton = (
      name: ExtraEditorInlineToolsIcon | ExtraEditorAlignmentsIcon,
      selected: boolean
   ) => ({
      name,
      onPress: () => sendMessage('extraFormat', { format: formatName(name) }),
      selected,
   });

   const makeIndentButton = (name: ExtraEditorIndentsIcon) => ({
      name,
      onPress: () => sendMessage('extraFormat', { format: formatName(name) }),
   });

   const alignmentButtons: ExtraEditorButtonParams[] = [
      makeSelectableButton('format-align-left', true),
      makeSelectableButton('format-align-center', false),
      makeSelectableButton('format-align-right', false),
   ];

   const toolsButtons: ExtraEditorButtonParams[] = [
      makeSelectableButton('format-bold', false),
      makeSelectableButton('format-italic', false),
      makeSelectableButton('format-underline', false),
      makeSelectableButton('format-strikethrough', false),
   ];

   const indentButtons: ExtraEditorButtonParams[] = [
      makeIndentButton('format-indent-decrease'),
      makeIndentButton('format-indent-increase'),
   ];

   return (
      <CustomModal
         displayGoBack
         displayDivider={false}
         backButtonPosition='right'
         backButtonName='md-close'
         hitSlot={{ top: 5, left: 5, right: 5 }}
         color={colors.primaryContainer}
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
               <ExtraEditorAlignment
                  colors={colors}
                  iconParams={alignmentButtons}
                  style={styles.alignmentContainer}
               />
               <ExtraEditorAlignment colors={colors} iconParams={indentButtons} />
            </View>
            <ExtraEditorAlignment
               colors={colors}
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
      paddingLeft: 5,
      textAlign: 'left',
   },
   iconsContainer: {
      rowGap: 10,
   },
   iconsTopWrapper: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignContent: 'flex-start',
      marginHorizontal: '5%',
   },
   alignmentContainer: {
      flexGrow: 1,
      alignSelf: 'flex-start',
      justifyContent: 'center',
      paddingVertical: 1,
      rowGap: 2,
   },
   toolsContainer: {
      justifyContent: 'center',
   },
});

export default ExtraEditorModal;

// So adding another layer, it will receive a "formatType" data that consists of type: "Record<string, string>;"
// This will contain something like
