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
} from 'react-native';

import useTouchResize from '../library/hooks/useTouchResize';
import BackButton from './buttons/backButton';

export interface ModalProps {
   title: React.ReactNode | string;
   visible: boolean;
   setVisible: (visible: boolean) => void;
   color?: string;
   headerLeft?: React.ReactNode;
   headerRight?: React.ReactNode;
   displayDivider?: boolean;
   displayGoBack?: boolean;
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
   headerLeft,
   headerRight,
   displayDivider = true,
   displayGoBack = false,
   onGoBack,
   titleStyle,
   children,
   containerStyle,
}: ModalProps) => {
   const theme = useTheme();
   const { colors } = theme;
   const backgroundColor = !color ? colors.surface : color;
   const [_modalLayout, setModalLayout] = useState({ height: 0, width: 0 });
   const { style: scaleStyle, eventHandlers, isPressedIn } = useTouchResize(0.8);
   const hideModal = () => setVisible(false);

   const handleLayout = (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;

      setModalLayout({ height, width });
   };

   const handleGoBack = () => {
      if (onGoBack) {
         onGoBack();
      } else {
         hideModal();
      }
   };

   const titleElement = (title: React.ReactNode | string) => {
      return React.isValidElement(title) ? (
         title
      ) : (
         <Text style={[styles.title, titleStyle]} variant='titleMedium'>
            {title}
         </Text>
      );
   };

   useEffect(() => {
      const message = visible ? 'Modal is open' : 'Modal is closed';
      AccessibilityInfo.announceForAccessibility(message);
   }, [visible]);

   return (
      <>
         <Portal>
            <Modal
               visible={visible}
               onDismiss={hideModal}
               contentContainerStyle={[containerStyle, { backgroundColor: backgroundColor }]}
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
                  {headerLeft}
                  {displayGoBack && (
                     <BackButton
                        name='chevron-back'
                        color={colors.onSurface}
                        size={24}
                        style={[styles.backButton, isPressedIn ? scaleStyle : {}]}
                        activeOpacity={0.8}
                        onPress={handleGoBack}
                        onPressIn={eventHandlers.onPressIn}
                        onPressOut={eventHandlers.onPressEnd}
                     />
                  )}
                  {titleElement(title)}
                  {headerRight}
               </View>
               {displayDivider && <Divider />}
               <View onLayout={handleLayout}>{children}</View>
            </Modal>
         </Portal>
      </>
   );
};

const styles = StyleSheet.create({
   titleContainer: {
      flexDirection: 'row',
   },
   backButton: {
      padding: 5,
   },
   title: {
      flex: 1,
      textAlign: 'center',
   },
});

export default CustomModal;
