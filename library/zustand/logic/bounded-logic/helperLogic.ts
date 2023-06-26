import { NoteDarkColor, NoteLightColor } from '../../../../constants/notes';
import useSettingsStore from '../../settingsStore';
import useBoundedStore from '../../store';
import { NoteProps } from '../../types/@types';

function _getInitialNoteData(createdOn: string) {
   const darkMode =
      useSettingsStore.getState().userPreference.userGeneralSettings.display.isDarkMode;
   const defaultColor = darkMode ? NoteDarkColor.Default : NoteLightColor.Default;

   const indexObj: NoteProps = {
      tags: [],
      note: [],
      history: [],
      attr: {
         title: undefined,
         chapter: undefined,
         pageFrom: null,
         pageTo: null,
         isPrivate: false,
      },
      dates: {
         start: createdOn,
         end: null,
         lastEdited: null,
      },
      meta: {
         bgColor: defaultColor,
      },
   };
   return indexObj;
}

function _isNoteIdNull(id: string) {
   return useBoundedStore.getState().notes[id];
}

function _noteExists(id: string, logIndex: number) {
   return _isNoteIdNull(id) && useBoundedStore.getState().notes[id][logIndex];
}

function _updateNoteObj<K extends keyof NoteProps, SType extends unknown>(
   note: NoteProps,
   key: K,
   noteObj: NoteProps[K],
   value?: SType,
   converter?: (value?: SType) => NoteProps[K]
) {
   if (converter) {
      note[key] = converter(value);
   } else {
      note[key] = noteObj;
   }
}

export { _getInitialNoteData, _isNoteIdNull, _noteExists, _updateNoteObj };
