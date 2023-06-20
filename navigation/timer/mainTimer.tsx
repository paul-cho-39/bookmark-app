import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TimerParamsList } from '../../library/@types/navigation';
// screens
import TimerScreen from '../../screens/timer';
import TimerSettingScreen from '../../screens/timerSettings';
// headericons
import { useTheme } from 'react-native-paper';
import TimerHeaderIcons from '../../screens/components/time/headerIcons';
import BackButton from '../../components/buttons/backButton';
import Notes from '../../screens/notes';
import { BaseUserLogProps } from '../../library/@types/timerData';
import NoteAppBarSample from '../../screens/components/appbar/notes/noteSampler';

const Stack = createNativeStackNavigator<TimerParamsList>();

const TimerStack = () => {
   const { colors } = useTheme();
   return (
      <Stack.Navigator
         initialRouteName='MainTimer'
         screenOptions={({ navigation, route }) => ({
            headerStyle: { backgroundColor: colors.surface },
            headerTitleStyle: { color: colors.onSurface },
            headerLeft: () => (
               <BackButton
                  name='chevron-back'
                  style={{ padding: 5 }}
                  onPress={() => navigation.goBack()}
                  color={colors.onBackground}
               />
            ),
         })}
      >
         <Stack.Screen
            name='MainTimer'
            component={TimerScreen}
            options={({ navigation, route }) => ({
               title: 'Timer',
               headerShown: true,
               headerTitleAlign: 'center',
               headerRight: ({ ...rest }) => (
                  <TimerHeaderIcons
                     colors={colors}
                     navigation={navigation}
                     params={route.params.params as BaseUserLogProps}
                  />
               ),
            })}
         />
         <Stack.Screen
            name='TimerSettings'
            component={TimerSettingScreen}
            options={{
               headerTitle: 'Timer Settings',
               contentStyle: { paddingHorizontal: 10 },
            }}
         />
         {/* :TODO write "SAVE" button */}
         <Stack.Screen
            name='Notes'
            component={Notes}
            options={({ navigation, route }) => ({
               animation: 'fade',
               navigationBarHidden: false,
               contentStyle: { backgroundColor: colors.surface, marginHorizontal: 0 },
               header: (props) => (
                  <NoteAppBarSample colors={colors} navigation={navigation} route={route} />
               ),
            })}
         />
      </Stack.Navigator>
   );
};

export default TimerStack;
