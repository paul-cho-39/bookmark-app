import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LibraryParamsList } from '../../library/@types/navigation';
import { useTheme } from 'react-native-paper';
import MainLibraryScreen from '../../screens/library';

const LibraryStack = createNativeStackNavigator<LibraryParamsList>();

const LibraryNavigation = () => {
   const { colors } = useTheme();
   return (
      <LibraryStack.Navigator
         initialRouteName='MainLibrary'
         screenOptions={{
            animation: 'simple_push',
            headerStyle: { backgroundColor: colors.surface },
            headerTitleStyle: { color: colors.onSurface },
            gestureEnabled: false,
         }}
      >
         <LibraryStack.Screen
            name='MainLibrary'
            component={MainLibraryScreen}
            options={({ navigation, route }) => ({
               animation: 'simple_push',
               animationTypeForReplace: 'pop',
               headerShown: false,
               // header: (props) => (

               // )
            })}
         />
      </LibraryStack.Navigator>
   );
};

export default LibraryNavigation;
