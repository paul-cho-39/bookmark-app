import {
   CONTENT,
   Mode,
   NoteAppbarParams,
   NoteThemeParamKeys,
   PageParamKeys,
   PublishedNoteType,
} from './notes';

export const IMAGES = {
   HOME_IMAGE_HEIGHT: 110,
   HOME_IMAGE_WIDTH: 80,
   SEARCH_IMAGE_HEIGHT: 95,
   SEARCH_IMAGE_WIDTH: 70,
};

export const HEADERS = {
   DEFAULT: 56,
   EDITABLE: 205,
};

export const ICONS = {
   EXTRA_SMALL: 12,
   SMALL: 16,
   NORMAL: 20,
   MEDIUM: 24,
   LARGE: 28,
   EXTRA_LARGE: 34,
};

export const FONT_SIZE = {
   title: {
      large: {
         fontSize: 28,
         lineHeight: 32,
         fontFamily: 'Roboto-Regular',
      },
      medium: {
         fontSize: 20,
         lineHeight: 24,
         fontFamily: 'Roboto-Medium',
      },
      small: {
         fontSize: 18,
         lineHeight: 22,
         fontFamily: 'Roboto-Medium',
      },
      extraSmall: {
         fontSize: 16,
         lineHeight: 20,
         fontFamily: 'Roboto-Small',
      },
   },
   button: {
      extraSmall: 10,
      small: 12,
      medium: 16,
      large: 20,
      extraLarge: 24,
   },
};

export { Mode, PageParamKeys, NoteThemeParamKeys, PublishedNoteType, NoteAppbarParams, CONTENT };
