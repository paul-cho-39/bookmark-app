import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { BaseUserLogProps } from '../library/@types/timerData';
import darkenColor from '../library/helper/darkenColor';
import { height as HEIGHT, height } from '../library/helper';

enum Mode {
   SMALL = 'small',
   LARGE = 'large',
}
enum PageParamKeys {
   FROM = 'pageFrom',
   TO = 'pageTo',
}

enum NoteThemeParamKeys {
   BACKGROUND = 'background',
   THEME = 'theme',
}

enum PublishedNoteType {
   PUBLIC = 'PUBLIC NOTE',
   PRIVATE = 'PRIVATE NOTE',
}

enum NotesFontSize {
   ExtraSmall = 10,
   Emall = 12,
   Medium = 16,
   Large = 20,
   ExtraLarge = 24,
}

const DARKEN_BY_DEFAULT = -8;

enum NoteDarkColor {
   Default = '#E3E2E6',
   SeaGreen = '#2E8B57',
   Chocolate = '#D2691E',
   DarkGoldenrod = '#B8860B',
   DarkViolet = '#9400D3',
   Indigo = '#4B0082',
   DarkRed = '#8B0000',
   Firebrick = '#B22222',
   MediumPurple = '#9370DB',
}

enum NoteLightColor {
   Default = '#FEFBFF',
   PaleOrange = '#FFEDCC',
   PaleChocolate = '#ECD9C6',
   PaleGoldenrod = '#FAFAD2',
   Thistle = '#D8BFD8',
   PaleIndigo = '#9FA8DA',
   MistyRose = '#FFE4E1',
   Linen = '#FAF0E6',
   PinkLace = '#FFDDF4',
}

// IF IT IS POSSIBLE SHOULD TRY TO TEST OUT AND CREATE ENUM FOR DARKENING COLOR

const CONTENT = {
   DEFAULT_TITLE: 'Title',
};

enum NotesHeightParams {
   QuillEditorHeight = 80,
   NoteModalHeight = HEIGHT * 0.65,
   NoteTagsScrollViewHeight = HEIGHT * 0.47,
}

interface NoteAppbarParams {
   params: Omit<BaseUserLogProps, 'uid'>;
   colors: MD3Colors;
}

export {
   Mode,
   PageParamKeys,
   NoteThemeParamKeys,
   PublishedNoteType,
   NotesFontSize,
   NoteDarkColor,
   NoteLightColor,
   NoteAppbarParams,
   CONTENT,
   DARKEN_BY_DEFAULT,
   NotesHeightParams,
};
