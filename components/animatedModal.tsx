import React, { useState } from 'react';
import { StyleProp, ViewStyle, Animated, Modal, View, StyleSheet } from 'react-native';
import { ModalProps } from './modal';
import { Divider, useTheme, Text } from 'react-native-paper';
import { height } from '../library/helper';

interface AnimatedModalProps extends ModalProps {
   titleStyle?: StyleProp<ViewStyle>;
   animationType?: 'slide' | 'fade' | 'none';
}

const AnimatedModal = ({
   title,
   visible,
   setVisible,
   children,
   titleStyle,
   containerStyle,
   animationType,
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
         <Modal
            style={{}}
            animationType={animationType}
            visible={visible}
            onRequestClose={() => animateModal(false)}
            transparent
         >
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
               <Divider />
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
