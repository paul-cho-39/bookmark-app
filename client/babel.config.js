module.exports = function (api) {
   api.cache(true);
   return {
      presets: ['babel-preset-expo'],
      plugins: ['react-native-reanimated/plugin'],
      env: {
         production: {
            plugins: [
               'react-native-paper/babel',
               '@realm/babel-plugin',
               '@babel/plugin-proposal-export-namespace-from',
               // 'react-native-reanimated/plugin',
            ],
         },
      },
   };
};
