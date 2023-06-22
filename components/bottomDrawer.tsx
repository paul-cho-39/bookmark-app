import React, { useEffect } from 'react';
import { AccessibilityInfo, Keyboard, Modal, ModalProps, StyleSheet, View } from 'react-native';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';

interface BottomDrawerProps
   extends Omit<ModalProps, 'animationType' | 'transparent' | 'visible' | 'onRequestClose'> {
   isVisible: boolean;
   onClose: () => void;
   colors: MD3Colors;
   children: React.ReactNode;
   bottom?: number | string;
   height?: number | string;
}

const BottomDrawer = ({
   isVisible,
   onClose,
   colors,
   children,
   bottom = 0,
   height = '30%',
   ...props
}: BottomDrawerProps) => {
   useEffect(() => {
      const message = isVisible ? 'Modal is open' : 'Modal is closed';
      AccessibilityInfo.announceForAccessibility(message);
   }, [isVisible]);

   return (
      <Modal
         animationType='slide'
         transparent={true}
         visible={isVisible}
         onRequestClose={onClose}
         {...props}
      >
         <View
            style={{
               ...styles.modalView,
               height: height,
               bottom: bottom,
               backgroundColor: colors.surface,
            }}
         >
            {children}
         </View>
      </Modal>
   );
};

const WIDTH = 96;
const MARGIN_HORIZONTAL = (100 - WIDTH) / 2;

const styles = StyleSheet.create({
   modalView: {
      position: 'absolute',
      width: `${WIDTH}%`,
      marginHorizontal: `${MARGIN_HORIZONTAL}%`,
      bottom: 0,
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
   },
});

export default BottomDrawer;
