import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import BlurredIcon from '../../../components/loader/blurredIcon';

interface DisplayBookProp {
   bookInWhichLibrary: string[];
   size?: number;
}

const DisplayBookIdIcon = ({ bookInWhichLibrary, size = 24 }: DisplayBookProp) => {
   const { colors } = useTheme();
   const name = translateBookName(bookInWhichLibrary);

   let [loadBookIcon] = useFonts({
      AntDesign: require('./../../../assets/fonts/AntDesign.ttf'),
   });

   if (!loadBookIcon) {
      return <BlurredIcon size={size * 0.5} color={colors.onBackground} />;
   }

   return (
      <>
         {!name ? null : (
            <Text style={{ paddingBottom: 10 }} variant='titleMedium'>
               {name}
               <AntDesign name='book' size={size} color={colors.onBackground} />
            </Text>
         )}
      </>
   );
};

export default DisplayBookIdIcon;

// should icon stay constant or different?
export function translateBookName(dataStore: string[]) {
   if (dataStore?.includes('want')) {
      return 'Want to read';
   }
   if (dataStore?.includes('finished')) {
      return 'Finished';
   }
   if (dataStore?.includes('reading')) {
      return 'Currently reading';
   }
}
