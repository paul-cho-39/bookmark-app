import colorTheme from './../../assets/constants/dark-theme.json';
import { MD3LightTheme } from 'react-native-paper';

// CURRENT COLOR THEME: slateblue
// to change the color theme go to: https://callstack.github.io/react-native-paper/theming.html

// edit any color changes and additional color that may be reused
// if new custom color is added, for typescript compatibility, inside the
// LightTheme add: "custom: 'property'" and proceed to add the custom colors
// in 'light-color.json' file

const LightTheme = {
   ...MD3LightTheme,
   colors: {
      ...colorTheme,
      textInput: 'rgb(224, 224, 224)',
      text: 'rgb(243, 238, 225)',
   },
};

export default LightTheme;
