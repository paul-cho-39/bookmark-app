export default {
   name: 'bookmark-mobile-app',
   slug: 'bookmark-mobile-app',
   version: '1.0.0',
   orientation: 'portrait',
   icon: './assets/icon.png',
   userInterfaceStyle: 'light',
   splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
   },
   assetBundlePatterns: ['**/*'],
   ios: {
      googleServicesFile: './GoogleService-Info.plist',
      supportsTablet: true,
      bundleIdentifier: 'com.paulchooo.bookmarkmobileapp',
   },
   android: {
      googleServicesFile: './google-services.json',
      adaptiveIcon: {
         foregroundImage: './assets/adaptive-icon.png',
         backgroundColor: '#ffffff',
      },
      package: 'com.paulchooo.bookmarkmobileapp',
   },
   web: {
      favicon: './assets/favicon.png',
   },
   plugins: [
      '@react-native-firebase/app',
      '@react-native-google-signin/google-signin',
      'expo-localization',
   ],
   extra: {
      apiUrl: 'http://192.168.86.30:5000',
      eas: {
         projectId: 'a37431c8-a1f1-48a8-9d36-59fca4279f30',
      },
   },
};
