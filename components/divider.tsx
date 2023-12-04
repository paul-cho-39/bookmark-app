import { Text, View } from 'react-native';
import LightTheme from '../library/themes/lightTheme';

const CustomDivider = ({ name }: { name: string }) => {
   const primary = LightTheme.colors.primary;
   return (
      <>
         <View
            style={{
               marginHorizontal: 15,
               marginVertical: 15,
               flexDirection: 'row',
               alignItems: 'center',
            }}
         >
            <View style={{ flex: 1, height: 1, backgroundColor: `${primary}` }} />
            <View>
               <Text style={{ width: 50, textAlign: 'center' }}>{name}</Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: `${primary}` }} />
         </View>
      </>
   );
};

export default CustomDivider;
