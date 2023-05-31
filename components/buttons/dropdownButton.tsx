import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { MD3Theme } from 'react-native-paper';
import { IconButton } from './icons/iconButton';

interface ChevronButtonProps {
   title: string;
   status: 'loading' | 'error' | 'idle' | 'success';
   onPress: () => void;
   handleIconPress: () => void;
   loadingComponent: React.ReactElement;
   iconColor?: string;
   color?: string;
}

const ChevronButton = ({
   title,
   status,
   onPress,
   handleIconPress,
   loadingComponent,
   iconColor,
   color,
}: ChevronButtonProps) => {
   const [loadChevronIcon] = useFonts({
      FontAwesome: require('./../../assets/fonts/FontAwesome.ttf'),
   });

   if (!loadChevronIcon) {
      return loadingComponent;
   }

   return (
      <View style={styles.container}>
         <TouchableOpacity
            activeOpacity={0.7}
            accessibilityLabel={title}
            disabled={status === 'loading'}
            style={[styles.buttonContainer, styles.borderRadiusRight, { backgroundColor: color }]}
            onPress={onPress}
         >
            <Text style={styles.buttonText}>{title}</Text>
         </TouchableOpacity>
         <IconButton
            renderIcon={() => <FontAwesome name='chevron-down' size={16} color={iconColor} />}
            activeOpacity={0.7}
            accessibilityLabel={title}
            disabled={status === 'loading'}
            style={[styles.iconContainer, styles.borderRadiusLeft, { backgroundColor: color }]}
            onPress={handleIconPress}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      overflow: 'hidden',
   },
   buttonContainer: {
      flex: 1,
      padding: 8,
      // backgroundColor: 'grey',
   },
   buttonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '200',
      textAlign: 'center',
   },
   iconContainer: {
      width: 50,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'grey',
   },
   borderRadiusRight: {
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderRightWidth: 1,
      borderRightColor: 'white',
      borderColor: 'black',
   },
   borderRadiusLeft: {
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
   },
});

export default ChevronButton;
