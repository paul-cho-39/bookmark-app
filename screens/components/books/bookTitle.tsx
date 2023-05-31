import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

interface TitleProps {
   title: string;
   subtitle?: string;
   cutoff?: number;
   style?: StyleProp<ViewStyle>;
}

const BookTitle = ({ title, subtitle, cutoff = 40, style }: TitleProps) => {
   const slicedSubtitle =
      subtitle && subtitle?.length > cutoff ? subtitle.slice(0, cutoff) + '...' : subtitle;

   return (
      <View>
         <Text variant={'titleLarge'} style={[styles.title, style]} accessibilityLabel={title}>
            {title}
         </Text>
         <Text
            numberOfLines={cutoff === 0 ? 0 : 1}
            style={{ display: cutoff === 0 ? 'none' : 'flex' }}
            accessibilityLabel={subtitle}
         >
            {slicedSubtitle}
         </Text>
      </View>
   );
};

const styles = StyleSheet.create({
   titleWrapper: {},
   title: {
      // fontSize: 18,
   },
   subtitle: {},
});

export default BookTitle;
