import React, { useEffect, useRef, useState } from 'react';
import { Portal, Text, Modal, useTheme, Divider } from 'react-native-paper';
import {
   StyleProp,
   View,
   ViewStyle,
   LayoutChangeEvent,
   StyleSheet,
   TextStyle,
   AccessibilityInfo,
   Insets,
} from 'react-native';

import useTouchResize from '../library/hooks/useTouchResize';
import BackButton from './buttons/backButton';
import { VariantProp } from 'react-native-paper/lib/typescript/src/components/Typography/types';

export interface ModalProps {
   title: React.ReactNode | string;
   visible: boolean;
   setVisible: (visible: boolean) => void;
   variant?: VariantProp<string>;
   color?: string;
   backButtonName?: 'chevron-back' | 'md-close' | 'arrow-back';
   backButtonSize?: number;
   headerElement?: React.ReactNode;
   displayDivider?: boolean;
   displayGoBack?: boolean;
   hitSlot?: number | Insets | null;
   backButtonPosition?: 'left' | 'right';
   onGoBack?: () => void;
   titleStyle?: StyleProp<TextStyle>;
   containerStyle?: StyleProp<ViewStyle>;
   children?: React.ReactNode;
}

const CustomModal = ({
   title,
   visible,
   setVisible,
   color,
   variant = 'titleMedium',
   headerElement,
   hitSlot,
   backButtonName = 'chevron-back',
   backButtonSize = 24,
   displayDivider = true,
   displayGoBack = false,
   backButtonPosition = 'left',
   onGoBack,
   titleStyle,
   children,
   containerStyle,
}: ModalProps) => {
   const theme = useTheme();
   const { colors } = theme;
   const backgroundColor = !color ? colors.surface : color;
   const [_modalLayout, setModalLayout] = useState({ height: 0, width: 0 });
   const hideModal = () => setVisible(false);

   const handleLayout = (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      setModalLayout({ height, width });
   };

   const handleGoBack = () => {
      onGoBack ? onGoBack() : hideModal();
   };

   const BackButtonComponent = (
      <BackButton
         name={backButtonName}
         color={colors.onSurface}
         size={backButtonSize}
         style={[styles.backButton]}
         activeOpacity={0.8}
         hitSlop={hitSlot}
         onPress={handleGoBack}
      />
   );

   useEffect(() => {
      const message = visible ? `${title} is open` : `${title} is closed`;
      AccessibilityInfo.announceForAccessibility(message);
   }, [visible]);

   return (
      <Portal>
         <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={[containerStyle, { backgroundColor }]}
            theme={{
               ...theme,
               colors: {
                  ...colors,
                  background: 'none',
                  surface: 'none',
               },
            }}
         >
            <View style={[styles.titleContainer]}>
               {backButtonPosition === 'left' && displayGoBack && BackButtonComponent}
               {headerElement || (
                  <Text style={[styles.title, titleStyle]} variant={variant}>
                     {title}
                  </Text>
               )}
               {backButtonPosition === 'right' && displayGoBack && BackButtonComponent}
            </View>
            {displayDivider && <Divider />}
            <View onLayout={handleLayout}>{children}</View>
         </Modal>
      </Portal>
   );
};

const styles = StyleSheet.create({
   titleContainer: {
      flexDirection: 'row',
   },
   backButton: {
      paddingHorizontal: 5,
      paddingRight: 10,
   },
   title: {
      flex: 1,
      textAlign: 'center',
   },
});

export default CustomModal;
