import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { MD3Theme } from 'react-native-paper';
import { IconButton } from './icons/iconButton';
import { Entypo } from '@expo/vector-icons';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';

interface ChevronButtonProps {
   title: string;
   status: 'loading' | 'error' | 'idle' | 'success';
   onPress: () => void;
   handleIconPress: () => void;
   loadingComponent: React.ReactElement;
   colors: MD3Colors;
}

const ChevronButton = ({
   title,
   status,
   onPress,
   handleIconPress,
   colors,
   loadingComponent,
}: ChevronButtonProps) => {
   const [loadChevronIcon] = useFonts({
      FontAwesome: require('./../../assets/fonts/FontAwesome.ttf'),
   });

   if (!loadChevronIcon) {
      return loadingComponent;
   }

   const shouldDisplayCheckmark = title === 'finished' || title === 'reading' || title === 'want';

   return (
      <View style={styles.container}>
         <TouchableOpacity
            activeOpacity={0.7}
            accessibilityLabel={title}
            disabled={status === 'loading'}
            style={[
               styles.buttonContainer,
               styles.borderRadiusRight,
               { backgroundColor: colors.secondaryContainer },
            ]}
            onPress={onPress}
         >
            <View style={styles.textContainer}>
               <Text style={styles.buttonText}>{title}</Text>
               {shouldDisplayCheckmark && (
                  <Entypo
                     style={{ paddingHorizontal: '5%' }}
                     name='check'
                     size={20}
                     color={colors.onSecondaryContainer}
                  />
               )}
            </View>
         </TouchableOpacity>
         <IconButton
            renderIcon={() => (
               <FontAwesome name='chevron-down' size={16} color={colors.onSecondaryContainer} />
            )}
            activeOpacity={0.7}
            accessibilityLabel={title}
            disabled={status === 'loading'}
            style={[
               styles.iconContainer,
               styles.borderRadiusLeft,
               { backgroundColor: colors.secondaryContainer },
            ]}
            onPress={handleIconPress}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      // backgroundColor: 'red',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 15,
      overflow: 'hidden',
      width: '75%',
      paddingVertical: 5,
   },
   buttonContainer: {
      width: '70%',
      padding: '3.1%',
      // backgroundColor: 'grey',
   },
   textContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
   checkmark: {
      paddingLeft: 10,
      paddingVertical: 10,
   },
   buttonText: {
      textTransform: 'capitalize',
      color: 'white',
      fontWeight: '200',
      textAlign: 'center',
      alignContent: 'space-around',
      justifyContent: 'space-between',
      paddingHorizontal: '5%',
      // marginLeft: 10,
      // marginRight: 10,
   },
   iconContainer: {
      // width: 50,
      width: '20%',
      right: '65%',
      position: 'relative',
      padding: 10,
      alignItems: 'center',
   },
   borderRadiusRight: {
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderRightWidth: 2,
      borderRightColor: 'white',
      borderColor: 'black',
   },
   borderRadiusLeft: {
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 2,
      borderLeftColor: 'white',
      borderBottomLeftRadius: 0,
   },
});

export default ChevronButton;
