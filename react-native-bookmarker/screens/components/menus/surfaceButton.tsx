import * as Font from 'expo-font';

import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import BlurredIcon from '../../../components/loader/blurredIcon';
import { width as WIDTH } from '../../../library/helper';
import useLoadIcons, { IconParams } from '../../../library/hooks/useLoadIcons';
import useTouchResize from '../../../library/hooks/useTouchResize';

type SurfaceProps = {
   iconName: 'plus' | 'timer-outline' | 'bookshelf';
   size: number;
   title: string;
   onPress: () => void;
};

const CustomSurfaceButton = ({ iconName, size, title, onPress }: SurfaceProps) => {
   const { colors } = useTheme();
   const { style, eventHandlers, isPressedIn } = useTouchResize(0.97);
   const fontLoaders = [
      () =>
         Font.loadAsync({
            AntDesign: require('./../../../assets/fonts/AntDesign.ttf'),
            MaterialCommunityIcons: require('./../../../assets/fonts/MaterialCommunityIcons.ttf'),
         }),
   ];

   const params = {
      color: colors.onSecondaryContainer,
      size: size,
   };

   const getIconComponent = (name: typeof iconName, params: IconParams) => {
      switch (iconName) {
         case 'timer-outline':
            return <MaterialCommunityIcons name={name} {...params} />;
         case 'bookshelf':
            return <MaterialCommunityIcons name={name} {...params} />;
         case 'plus':
            // @ts-ignore
            return <AntDesign name={name} {...params} />;
      }
   };
   const backupComponent = <BlurredIcon {...params} />;

   const iconComponent = useLoadIcons(fontLoaders, getIconComponent, backupComponent, params);

   return (
      <TouchableOpacity
         activeOpacity={0.75}
         onPress={onPress}
         onPressIn={eventHandlers.onPressIn}
         onPressOut={eventHandlers.onPressEnd}
         testID={`surface-name-${iconName}`}
         accessibilityLabel={`surface-name-${iconName}`}
         style={[isPressedIn && style]}
      >
         <Surface style={[styles.surface, { backgroundColor: colors.secondaryContainer }]}>
            <View style={styles.iconContainer}>{iconComponent(iconName)}</View>
            <View style={styles.textContainer}>
               <Text style={[styles.text, { color: colors.onPrimaryContainer }]}>{title}</Text>
            </View>
         </Surface>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   surface: {
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4,
      borderRadius: 10,
      flexDirection: 'column',
      paddingHorizontal: 5,
      width: WIDTH * 0.3,
   },
   iconContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   textContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
   },
   text: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
   },
});

export default CustomSurfaceButton;
