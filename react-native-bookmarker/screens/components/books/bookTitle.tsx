import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { TextVariant } from '../../../library/@types/variant';

interface TitleProps {
   title: string;
   subtitle?: string;
   style?: StyleProp<ViewStyle>;
   titleCutoff?: number;
   subtitleCutoff?: number;
   variant?: TextVariant;
}

const BookTitle = ({
   title,
   subtitle,
   style,
   titleCutoff = 40,
   subtitleCutoff = 40,
   variant = 'titleSmall',
}: TitleProps) => {
   const cutoffTitle = (cutoff: number, title?: string) => {
      return title && title.length > cutoff ? title.slice(0, cutoff) + '...' : title;
   };
   return (
      <View style={styles.container}>
         <Text variant={variant} style={[styles.title, style]} accessibilityLabel={title}>
            {cutoffTitle(titleCutoff, title)}
         </Text>
         <Text
            numberOfLines={subtitleCutoff === 0 ? 0 : 1}
            style={[styles.subtitle, { display: subtitleCutoff === 0 ? 'none' : 'flex' }]}
            accessibilityLabel={subtitle}
         >
            {cutoffTitle(subtitleCutoff, subtitle)}
         </Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      width: '100%',
      alignContent: 'center',
      textAlign: 'center',
   },
   title: {
      // fontSize: 18,
   },
   subtitle: {},
});

export default BookTitle;
