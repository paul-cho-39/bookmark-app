import { View, StyleSheet, Keyboard, TextInput as InputRef } from 'react-native';
import CustomModal, { ModalProps } from '../../../../components/modal';
import { Button, Text, TextInput } from 'react-native-paper';

import { useEffect, useRef, useState } from 'react';
import { width as WIDTH, height as HEIGHT } from '../../../../library/helper';

type OmittedTypes = 'title' | 'cocontainerStyle' | 'visible' | 'setVisible';

export interface ModalEditorType extends Omit<ModalProps, OmittedTypes> {
   sendMessage: (type: string, value: unknown) => void | undefined;
   visible: boolean;
   setVisible: (visible: boolean) => void;
}

const LinkModal = ({ visible, setVisible, sendMessage, ...props }: ModalEditorType) => {
   // provide logic for sending the input from here
   const [domain, setDomain] = useState('');
   const inputRef = useRef<InputRef | null>(null);

   const addUrl = () => {
      if (!domain) return;
      if (domain) {
         sendMessage('link', domain);
         // set visible to refocus on webView
         setVisible(false);
      }
   };

   useEffect(() => {
      if (visible && inputRef.current) {
         inputRef.current.focus();
      } else {
         setTimeout(() => inputRef.current?.focus(), 300);
      }
   }, [visible]);

   return (
      <CustomModal
         visible={visible}
         setVisible={setVisible}
         title='Add a link'
         displayDivider={false}
         containerStyle={styles.modalContainer}
         titleStyle={styles.modalTitle}
         {...props}
      >
         <TextInput
            ref={inputRef}
            value={domain}
            onChangeText={(text) => setDomain(text)}
            style={styles.input}
            outlineStyle={styles.inputOutline}
            placeholder='https:// '
            accessibilityRole='link'
            inputMode='email'
            keyboardType='email-address'
            returnKeyType='done'
         />
         <View style={styles.buttonWrapper}>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button onPress={addUrl}>Add</Button>
         </View>
      </CustomModal>
   );
};

const MODAL_WIDTH = 0.85;
const MODAL_MARGIN = (1 - MODAL_WIDTH) / 2;

const styles = StyleSheet.create({
   modalContainer: {
      width: WIDTH * MODAL_WIDTH,
      marginHorizontal: WIDTH * MODAL_MARGIN,
      bottom: HEIGHT * 0.2, // .25 is the midpoint of keyboard and statusbar since 0 is middle
   },
   buttonWrapper: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      padding: 10,
   },
   modalTitle: {
      textAlign: 'left',
      padding: 5,
      paddingLeft: 15,
      paddingTop: 15,
      fontSize: 21,
   },
   input: {
      backgroundColor: 'transparent',
      paddingHorizontal: 20,
   },
   inputOutline: {},
});

export default LinkModal;
