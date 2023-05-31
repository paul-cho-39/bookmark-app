import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LibraryScreen from '../../screens/library/index';
import StatsScreen from '../../screens/stats/index';
import IonIcons from '@expo/vector-icons/Ionicons';
import { TabsParamList } from '../../library/@types/navigation';
import HomeNavigation from '../home/homeScreen';
import { useTheme } from 'react-native-paper';

const Tabs = createBottomTabNavigator<TabsParamList>();
const BottomTabs = () => {
   const { colors } = useTheme();
   return (
      <Tabs.Navigator
         initialRouteName='Home'
         screenOptions={({ route }) => ({
            tabBarLabelPosition: 'below-icon',
            tabBarHideOnKeyboard: true,
            tabBarActiveBackgroundColor: colors.elevation.level3,
            tabBarInactiveTintColor: colors.onBackground,
            tabBarLabelStyle: { color: colors.onBackground },
            tabBarStyle: { backgroundColor: colors.background },
            tabBarAccessibilityLabel: route.name,
         })}
      >
         <Tabs.Screen
            name='Home'
            component={HomeNavigation}
            options={({ route }) => ({
               headerShown: false,
               tabBarIcon: ({ focused, color, size }) => (
                  <IonIcons name='ios-home-outline' size={size} color={colors.onPrimaryContainer} />
               ),
            })}
         />
         <Tabs.Screen
            name='Library'
            component={LibraryScreen}
            options={{
               tabBarIcon: ({ focused, color, size }) => (
                  <IonIcons
                     name='bookmarks-outline'
                     size={size}
                     color={colors.onPrimaryContainer}
                  />
               ),
            }}
         />
         <Tabs.Screen
            name='Stats'
            component={StatsScreen}
            options={{
               tabBarIcon: ({ focused, color, size }) => (
                  <IonIcons
                     name='stats-chart-outline'
                     size={size}
                     color={colors.onPrimaryContainer}
                  />
               ),
            }}
         />
      </Tabs.Navigator>
   );
};

export default BottomTabs;
