import useBoundedStore from '../../store';
import { NoteProps } from '../../types/@types';

function _getInitialNoteData(logIndex: number, createdOn: string) {
   const indexObj: NoteProps = {
      tags: [],
      note: [],
      title: undefined,
      pageFrom: null,
      pageTo: null,
      isPrivate: false,
      dates: {
         start: createdOn,
         end: null,
         lastEdited: null,
      },
   };
   return indexObj;
}

function _isNoteIdNull(id: string) {
   return useBoundedStore.getState().notes[id];
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

export { _getInitialNoteData, _isNoteIdNull, _updateNoteObj };
