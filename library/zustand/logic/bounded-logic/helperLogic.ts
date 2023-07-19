import { DARKEN_BY_DEFAULT, NoteDarkColor, NoteLightColor } from '../../../../constants/notes';
import darkenColor from '../../../helper/darkenColor';
import useSettingsStore from '../../settingsStore';
import useBoundedStore from '../../store';
import { NoteAttributesType, NoteProps } from '../../types/@types';

function _getInitialNoteData(createdOn: string): NoteProps {
   const darkMode =
      useSettingsStore.getState().userPreference.userGeneralSettings.display.isDarkMode;
   const defaultColor = darkMode ? NoteDarkColor.Default : NoteLightColor.Default;

   return {
      tags: [],
      note: [],
      history: [],
      attr: {
         title: undefined,
         chapter: undefined,
         pageFrom: null,
         pageTo: null,
         isPrivate: false,
         favorite: false,
      },
      dates: {
         start: createdOn,
         end: null,
         lastEdited: null,
      },
      meta: {
         headerColor: defaultColor,
         bgColor: darkenColor(defaultColor, DARKEN_BY_DEFAULT),
      },
   };
}

function _isNoteIdNull(id: string) {
   return useBoundedStore.getState().notes[id];
}

function _noteExists(id: string, logIndex: number) {
   return _isNoteIdNull(id) && useBoundedStore.getState().notes[id][logIndex];
}

// depending on the values that need to be converted
// function _convertNoteObj<K extends keyof NoteAttributesType, SType extends unknown>(
//    noteAttributes: NoteAttributesType,
//    key: K,
//    noteObj: NoteAttributesType[K],
//    value?: SType,
//    converter?: (value?: SType) => NoteAttributesType[K]
// ) {
//    if (converter) {
//       noteAttributes[key] = converter(value);
//    } else {
//       noteAttributes[key] = noteObj;
//    }
// }

export { _getInitialNoteData, _isNoteIdNull, _noteExists };
