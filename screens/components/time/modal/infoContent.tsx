import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { View, Text, TextProps, StyleSheet } from 'react-native';
import BlurredIcon from '../../../../components/loader/blurredIcon';
import { Badge, useTheme } from 'react-native-paper';
import useLoadIcons, { IconParams } from '../../../../library/hooks/useLoadIcons';

export interface InfoContentProps extends TextProps {
   info: string;
   content: string | number;
   iconName: 'book-open-outline' | 'note-text-outline' | 'timelapse';
}

// 1) MaterialCommunityIcons

const InfoContent = ({ iconName, info, content, ...rest }: InfoContentProps) => {
   const { colors } = useTheme();
   const params = { color: colors.onSurface, size: 36 };

   const fontLoaders = [
      () =>
         Font.loadAsync({
            MaterialCommunityIcons: require('./../../../../assets/fonts/MaterialCommunityIcons.ttf'),
         }),
   ];

   const getIconComponent = (name: typeof iconName, params: IconParams) => {
      switch (iconName) {
         case 'book-open-outline':
            return <MaterialCommunityIcons name={name} {...params} />;
         case 'note-text-outline':
            return <MaterialCommunityIcons name={name} {...params} />;
         case 'timelapse':
            return <MaterialCommunityIcons name={name} {...params} />;
      }
   };
   const backupComponent = <BlurredIcon {...params} />;

   const iconComponent = useLoadIcons(fontLoaders, getIconComponent, backupComponent, params);

   return (
      <View style={styles.container} testID='modal-icon-descriptors'>
         {iconComponent(iconName)}
         <Text
            accessibilityLabel={content.toString()}
            style={[styles.content, { color: colors.onSurface }]}
            {...rest}
         >
            {content}
         </Text>
         <Text
            accessibilityLabel={info.toString()}
            style={[styles.info, { color: colors.onSurface }]}
            {...rest}
         >
            {info}
         </Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
   },
   content: {
      fontWeight: '800',
      textAlign: 'center',
      fontSize: 18,
      opacity: 0.95,
      paddingTop: 8,
      paddingBottom: 2,
      // paddingVertical: 5,
   },
   info: {
      fontWeight: '300',
      fontSize: 14,
      opacity: 0.45,
   },
});

export default InfoContent;
