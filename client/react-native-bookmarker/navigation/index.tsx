import React, { useState, useEffect } from 'react';
import BottomTabs from './bottom-tabs/index';
import LoginNavigation from './login';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainNavigator } from '../library/@types/navigation';
import { useTheme } from 'react-native-paper';
import TimerStack from './timer/mainTimer';

const Stack = createNativeStackNavigator<MainNavigator>();

const MainNavigation = () => {
   const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
   const [initialize, setInitialize] = useState(true);

   useEffect(() => {
      auth().onAuthStateChanged((userState) => setUser(userState));
      if (initialize) {
         setInitialize(false);
      }
   }, []);

   return <>{!user ? <LoginNavigation /> : <MainNavigationContainer />}</>;
};

export default MainNavigation;

const MainNavigationContainer = () => {
   const { colors } = useTheme();
   return (
      <Stack.Navigator
         initialRouteName='MainTabs'
         screenOptions={{
            headerShown: false,
            headerStyle: { backgroundColor: colors.background },
            headerTitleStyle: { color: colors.onBackground },
         }}
      >
         <Stack.Screen name='MainTabs' component={BottomTabs} />
         <Stack.Screen name='Timer' component={TimerStack} />
      </Stack.Navigator>
   );
};

// if StackScreen is not to be stacked:
{
   /* <Stack.Screen
            name='Timer'
            component={TimerScreen}
            options={({ navigation, route }) => ({
               title: 'Timer',
               headerShown: true,
               headerTitleAlign: 'center',

               headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                     <IonIcons name='chevron-back' size={24} color={colors.onBackground} />
                  </TouchableOpacity>
               ),
            })}
         /> */
}
