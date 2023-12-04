import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface MinMaxValueProps {
   minNumber: number;
   maxNumber: number;
   style?: StyleProp<ViewStyle>;
}

const MinMaxValue = ({ style, minNumber, maxNumber }: MinMaxValueProps) => {
   return (
      <View style={style}>
         <Text variant='labelMedium' style={styles.numbers}>
            {minNumber}
         </Text>
         <Text variant='labelMedium' style={styles.numbers}>
            {maxNumber}
         </Text>
      </View>
   );
};

const styles = StyleSheet.create({
   numbers: {},
});

export default MinMaxValue;
