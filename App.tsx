import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import React from 'react';
import 'expo-dev-client';

import { Provider as PaperProvider, useTheme, Text } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { Appearance, Platform } from 'react-native';
import DarkTheme from './library/themes/darkTheme';
import LightTheme from './library/themes/lightTheme';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import MainNavigation from './navigation';
import useSettingsStore from './library/zustand/settingsStore';
import { useCallback, useEffect } from 'react';
import { setUserTimeZone } from './library/zustand/logic/timer-store-logic';

import * as Localization from 'expo-localization';
import RealmContext from './library/realm/';
import Realm from 'realm';
import { RealmConfig } from './library/realm/schema';
import useNetworkStatus from './library/hooks/useNetworkStatus';

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         // suspense: true,
      },
   },
});

// for the app from localication get a) "languageTag" && "languageCode"

function App() {
   useNetworkStatus();
   const { colors } = useTheme();
   const colorScheme = Appearance.getColorScheme();
   const isDarkPreferred = colorScheme === 'dark';
   const getTheme = !isDarkPreferred ? LightTheme : DarkTheme;

   // useEffect(() => {
   //    console.log('deleted');
   //    Realm.deleteFile(RealmConfig);
   // }, []);
   const { RealmProvider } = RealmContext;
   // since this is async have to set this here
   const [hasHydrated, timeZone] = useSettingsStore((state) => [
      state._hasHydrated,
      state.userPreference.userGeneralSettings.preference.timeZone,
   ]);

   useEffect(() => {
      const fetchTimeZone = () => {
         const calendars = Localization.getCalendars();
         const userTimeZone = calendars[0]?.timeZone;
         if ((userTimeZone && !timeZone) || timeZone !== userTimeZone) {
            setUserTimeZone(userTimeZone);
         }
      };
      fetchTimeZone();
   }, []);

   if (!hasHydrated) {
      <>
         {/* TODO: display splash screen here */}
         <Text>Loading...</Text>
      </>;
   }

   return (
      <RealmProvider>
         <QueryClientProvider client={queryClient}>
            <NavigationContainer
               theme={{
                  colors: {
                     background: colors.surface,
                     border: colors.onSurface,
                     card: colors.surface,
                     notification: colors.error,
                     primary: colors.primary,
                     text: colors.onSurface,
                  },
                  dark: isDarkPreferred,
               }}
            >
               <PaperProvider theme={getTheme}>
                  <StatusBar
                     style={isDarkPreferred ? 'dark' : 'light'}
                     backgroundColor={
                        isDarkPreferred ? LightTheme.colors.surface : DarkTheme.colors.surface
                     }
                  />
                  <SafeAreaProvider>
                     <MainNavigation />
                  </SafeAreaProvider>
               </PaperProvider>
            </NavigationContainer>
         </QueryClientProvider>
      </RealmProvider>
   );
}

export default Platform.OS === 'android' ? gestureHandlerRootHOC(App) : App;
