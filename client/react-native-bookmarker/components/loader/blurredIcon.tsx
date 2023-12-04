import { MaterialIcons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

const BlurredIcon = ({ size, color }: { size: number; color: string }) => {
   return (
      <View style={[styles.container, { width: size, height: size }]}>
         <MaterialIcons name='circle' size={size * 0.5} color={color} />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f1f1f1',
      borderRadius: 10,
   },
});

export default BlurredIcon;
