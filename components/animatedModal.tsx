import React, { useState } from 'react';
import { StyleProp, ViewStyle, Animated, Modal, View, StyleSheet, ModalProps } from 'react-native';
import { Divider, useTheme, Text } from 'react-native-paper';
import { height } from '../library/helper';

interface AnimatedModalProps extends ModalProps {
   setVisible: (value: boolean) => void;
   title?: string | React.ReactNode;
   titleStyle?: StyleProp<ViewStyle>;
   containerStyle?: StyleProp<ViewStyle>;
   displayDivider?: boolean;
}

const AnimatedModal = ({
   setVisible,
   title,
   visible,
   children,
   titleStyle,
   containerStyle,
   displayDivider = true,
}: AnimatedModalProps) => {
   const { colors } = useTheme();
   const value = height * 0.2;
   const valueY = useState(new Animated.Value(value))[0];
   const opacity = useState(new Animated.Value(0))[0];

   // Define the animation config
   const animationConfig = {
      toValue: 1,
      duration: 50,
      useNativeDriver: true,
   };

   // Define the animation
   const animateModal = (show: boolean) => {
      Animated.parallel([
         Animated.timing(valueY, {
            ...animationConfig,
            toValue: show ? 0 : value,
         }),
         Animated.timing(opacity, {
            ...animationConfig,
            toValue: show ? value : 0,
         }),
      ]).start(() => setVisible(show));
   };

   return (
      <>
         <Modal visible={visible} onRequestClose={() => animateModal(false)} transparent>
            <Animated.View
               style={[
                  containerStyle,
                  { transform: [{ translateY: valueY }] },
                  { backgroundColor: colors.background },
               ]}
            >
               <View style={[styles.title, titleStyle]}>
                  {React.isValidElement(title) ? title : <Text variant='titleMedium'>{title}</Text>}
               </View>
               {displayDivider && <Divider />}
               <View>{children}</View>
            </Animated.View>
         </Modal>
      </>
   );
};

export default AnimatedModal;

const styles = StyleSheet.create({
   title: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
   },
});
