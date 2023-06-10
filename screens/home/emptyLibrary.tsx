import { View } from 'react-native';
import { Text } from 'react-native-paper';

const EmptyLibrary = () => {
   return (
      <View>
         <Text>We do not see any books here</Text>
         <Text>Click here to start adding books</Text>
         {/* an image that shows theres no book */}
         {/* a button to searchScreen */}
         {/* if no connection then add manual */}
      </View>
   );
};

export default EmptyLibrary;
