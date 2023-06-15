import useBoundedStore from '../../store';
import { NoteIndexType } from '../../types/@types';

function _getInitialNoteData(logIndex: number, createdOn: string) {
   const indexObj: NoteIndexType = {
      logIndex: logIndex,
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

function _isNoteIdNull() {
   return useBoundedStore.getState().notes.id == null;
}

export { _getInitialNoteData, _isNoteIdNull };
