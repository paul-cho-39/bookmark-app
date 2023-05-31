import darkTheme from './../../assets/constants/dark-theme.json';
import { MD3DarkTheme } from 'react-native-paper';

// edit any color changes and additional color that may be reused
// if new custom color is added, for typescript compatibility, inside the
// LightTheme add: "custom: 'property'" and proceed to add the custom colors
// in 'light-color.json' file

const DarkTheme = {
   ...MD3DarkTheme,
   colors: darkTheme,
};

export default DarkTheme;
