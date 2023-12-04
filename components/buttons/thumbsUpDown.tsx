import { View, StyleSheet } from 'react-native';
import TouchableCustomButton from './touchableCustomButton';

export interface ThumbsUpDownProps {
   rating: null | 'up' | 'down';
   setRating: (value: React.SetStateAction<ThumbsUpDownProps['rating']>) => void;
}

const ThumbsUpDown = ({ rating, setRating }: ThumbsUpDownProps) => {
   const handleRating = (value: ThumbsUpDownProps['rating']) => {
      if (value === rating) {
         setRating(null);
      } else {
         setRating(value);
      }
   };

   return (
      <View style={styles.container}>
         <TouchableCustomButton
            style={[styles.button, rating === 'up' && styles.selected]}
            name='👍'
            onPress={() => handleRating('up')}
         />
         <TouchableCustomButton
            style={[styles.button, rating === 'up' && styles.selected]}
            name='👎'
            onPress={() => handleRating('down')}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
   button: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginHorizontal: 8,
      borderRadius: 8,
      borderWidth: 1,
   },
   selected: {
      backgroundColor: '#007AFF',
   },
});

export default ThumbsUpDown;
