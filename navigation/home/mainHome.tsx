import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeParamsList } from '../../library/@types/navigation';
import HomeScreen from '../../screens/home';
import SearchBar from '../../screens/components/appbar/search/searchbar';

import AddBookScreen from '../../screens/addbook/addBook';
import SearchScreen from '../../screens/search';
import BackButton from '../../components/buttons/backButton';
import { useTheme } from 'react-native-paper';

const HomeStack = createNativeStackNavigator<HomeParamsList>();

const HomeNavigation = () => {
   const { colors } = useTheme();
   return (
      <HomeStack.Navigator
         initialRouteName='Main'
         screenOptions={{
            animation: 'none',
            headerStyle: { backgroundColor: colors.surface },
            headerTitleStyle: { color: colors.onSurface },
         }}
      >
         <HomeStack.Screen
            name='Main'
            component={HomeScreen}
            options={({ navigation, route }) => ({
               header: (props) => <SearchBar {...props} title={'Home'} />,
            })}
         />
         <HomeStack.Screen
            name='Search'
            component={SearchScreen}
            options={({ navigation, route }) => ({
               header: (props) => <SearchBar {...props} searchShown={false} />,
            })}
         />
         <HomeStack.Screen
            name='AddBook'
            component={AddBookScreen}
            options={({ navigation, route }) => ({
               headerLeft: (props) => (
                  <BackButton
                     name='md-close'
                     color={colors.onBackground}
                     style={{ padding: 5 }}
                     onPress={() => navigation.goBack()}
                  />
               ),
               title: 'Add book',
               presentation: 'modal',
               animation: 'slide_from_bottom',
               statusBarAnimation: 'slide',
               animationDuration: 200, // ios only
               headerBackVisible: false,
               headerShown: true,
               headerTitleAlign: 'center',
            })}
         />
      </HomeStack.Navigator>
   );
};

export default HomeNavigation;
