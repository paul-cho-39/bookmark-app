import { StyleProp, View, ViewStyle } from 'react-native';
import IconButton, { IconButtonProps } from './icons/iconButton';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';

export interface FivestarProps {
   rating: number;
   setRating: (value: React.SetStateAction<number>) => void;
   style?: StyleProp<ViewStyle>;
}

const FiveStars = ({ rating, setRating, style }: FivestarProps) => {
   const onStarPress = (index: number) => {
      const newRating = index + 1;
      //   callback here

      setRating(newRating);
      //   alert(`You've rated ${newRating} stars`);
   };
   return (
      <View style={[style, { flexDirection: 'row', justifyContent: 'center' }]}>
         {Array.from({ length: 5 }, (_, index) => (
            <IconButton
               onPressIn={() => onStarPress(index)}
               renderIcon={() => (
                  <AntDesign
                     name={index < rating ? 'star' : 'staro'}
                     size={32}
                     color={index < rating ? '#FFD700' : '#C0C0C0'}
                  />
               )}
            />
         ))}
      </View>
   );
};

export default FiveStars;
