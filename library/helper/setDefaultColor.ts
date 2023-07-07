import { TextColorEnum } from '../../constants/notes';

function setDefaultColor(isDarkMode: boolean) {
   return { ...TextColorEnum, default: setDefault(isDarkMode) };
}

function setDefault(isDarkMode: boolean) {
   return isDarkMode ? '#FFFFFF' : '#000000';
}

type TextColors = ReturnType<typeof setDefaultColor>;

export { setDefaultColor, setDefault, TextColors };
