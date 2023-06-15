import { current, produce } from 'immer';
import useBoundedStore from '../../store';
import { NoteIndexType, StoreProps } from '../../types/@types';
import getUsersLocalTime from '../../../helper/timer/getUsersLocalTime';
import { _getInitialNoteData, _isNoteIdNull } from './helperLogic';
import { NotesNavigationProp } from '../../../@types/navigation';
import useConnectStore from '../../connectStore';

// first initiated in the Timer screen where the note will have logIndex
// and bookId as the note
function setInitiateNote(id: string, logIndex: number) {
   const localizedStartTime = getUsersLocalTime('string');
   const indexObj = _getInitialNoteData(logIndex, localizedStartTime);
   useBoundedStore.setState(
      produce((state: StoreProps) => {
         state.notes.id = id;
         state.notes[logIndex] = indexObj;
      })
   );
}

function setNotePage(page: number, logIndex: number) {
   const updatePage = setNoteObjWithIndex(logIndex, 'pageFrom');
   updatePage(page);
}

// higher order function for returning object with a certain logIndex
// SType stands for StandardType
function setNoteObjWithIndex<K extends keyof NoteIndexType, SType extends unknown>(
   logIndex: number,
   keys: K,
   value?: SType,
   converter?: (value?: SType) => NoteIndexType[K]
) {
   const isNull = _isNoteIdNull();
   return (noteObj: NoteIndexType[K]) => {
      useBoundedStore.setState(
         produce((state: StoreProps) => {
            if (!isNull) {
               // there are cases when data has to be converted back
               // like pageFrom and pageTo
               if (converter) {
                  const newNoteObj = converter(value);
                  state.notes[logIndex][keys] = newNoteObj;
               }
               state.notes[logIndex][keys] = noteObj;
               // }
            }
         })
      );
   };
}

function handleUnsaveNote(
   navigation: NotesNavigationProp['navigation'],
   setModal: (value: true) => void
) {
   // connect notes where should save is turned on
   const shouldSave = useConnectStore.getState().data.notes.shouldSave;
   if (!shouldSave) {
      navigation.goBack();
   }
   // this one should be local
   setModal(true);
}

export { setInitiateNote, setNoteObjWithIndex, setNotePage, handleUnsaveNote };
