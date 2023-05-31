import { current, produce } from 'immer';
import useBoundedStore from '../../store';
import { NoteIndexType, StoreProps } from '../../types/@types';
import useSettingsStore from '../../settingsStore';
import getUsersLocalTime from '../../../helper/timer/getUsersLocalTime';
import { _getInitialNoteData, _isNoteIdNull } from './helperLogic';
import { UseBoundStore } from 'zustand';

// first initiated in the Timer screen where the note will have logIndex
// and bookId as the note
function setInitiateNote(id: string, logIndex: number) {
   const localizedStartTime = getUsersLocalTime();
   const indexObj = _getInitialNoteData(logIndex, localizedStartTime);
   useBoundedStore.setState(
      produce((state: StoreProps) => {
         state.notes.id = id;
         state.notes.index[logIndex] = indexObj;
      })
   );
}

function setNotePage(page: number, logIndex: number) {
   const updatePage = setNoteObjWithIndex(logIndex, 'page');
   updatePage(page);
}

// higher order function for returning logIndex
function setNoteObjWithIndex<K extends keyof NoteIndexType[number]>(
   logIndex: keyof NoteIndexType,
   keys: K
) {
   const isNull = _isNoteIdNull();
   return (noteObj: NoteIndexType[number][K]) => {
      useBoundedStore.setState(
         produce((state: StoreProps) => {
            if (!isNull) {
               // if (!state.notes.personal.index[logIndex]) {
               state.notes.index[logIndex][keys] = noteObj;
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
