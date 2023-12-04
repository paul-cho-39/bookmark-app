import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import SkeletonLoader from './skeletonLoader';

interface SkeletonTextProps {
   numberOfLines?: number;
   width: number | string;
   style?: StyleProp<ViewStyle>;
}

const SkeletonText: React.FC<SkeletonTextProps> = ({ numberOfLines = 1, width, style }) => {
   const lines = new Array(numberOfLines).fill(0);

   return (
      <View style={{ flexDirection: 'column' }}>
         {lines.map((_, index) => {
            return (
               <View key={index} style={[styles.row, style]}>
                  <SkeletonLoader width={width} height={20} />
               </View>
            );
         })}
      </View>
   );
};

const styles = StyleSheet.create({
   row: {
      flexDirection: 'row',
   },
});

export default SkeletonText;
