import { current, produce } from 'immer';
import useBoundedStore from '../../store';
import { NoteIndexType, StoreProps } from '../../types/@types';
import getUsersLocalTime from '../../../helper/timer/getUsersLocalTime';
import { _getInitialNoteData, _isNoteIdNull } from './helperLogic';

// first initiated in the Timer screen where the note will have logIndex
// and bookId as the note
function setInitiateNote(id: string, logIndex: number) {
   const localizedStartTime = getUsersLocalTime();
   const indexObj = _getInitialNoteData(logIndex, localizedStartTime);
   useBoundedStore.setState(
      produce((state: StoreProps) => {
         state.notes.id = id;
         state.notes[logIndex] = indexObj;
      })
   );
}

function setNotePage(page: number, logIndex: number) {
   const updatePage = setNoteObjWithIndex(logIndex, 'page');
   updatePage(page);
}

// higher order function for returning object with a certain logIndex
function setNoteObjWithIndex<K extends keyof NoteIndexType>(logIndex: number, keys: K) {
   const isNull = _isNoteIdNull();
   return (noteObj: NoteIndexType[K]) => {
      useBoundedStore.setState(
         produce((state: StoreProps) => {
            if (!isNull) {
               // if (!state.notes.personal.index[logIndex]) {
               state.notes[logIndex][keys] = noteObj;
               // }
            }
         })
      );
   };
}

function _initiatePrivateNotePage(logIndex: number) {
   const currentPage = useBoundedStore.getState().currentPage;
   const isNull = _isNoteIdNull();
   const updatePage = setNoteObjWithIndex(logIndex, 'page');
   if (currentPage && !isNull) {
      // wont be updated if the page is set later
      updatePage(currentPage);
   }
}

export { setInitiateNote, setNoteObjWithIndex, setNotePage };
