import useBoundedStore from '../../store';
import { NoteIndexType } from '../../types/@types';

function _getInitialNoteData(logIndex: number, time: string) {
   const indexObj: NoteIndexType[number] = {
      logIndex: logIndex,
      noteText: '',
      tags: [],
      note: [],
      title: undefined,
      page: null,
      isPrivate: false,
      dates: {
         start: time,
         end: null,
         lastEdited: null,
      },
   };
   return indexObj;
}

function _isNoteIdNull() {
   return useBoundedStore.getState().notes.id == null;
}

export { _getInitialNoteData, _isNoteIdNull };
