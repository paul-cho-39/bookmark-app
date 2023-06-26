import { current, produce } from 'immer';
import useBoundedStore from '../../store';
import { NoteProps, StoreProps, NotePropsHistoryKeys } from '../../types/@types';
import getUsersLocalTime from '../../../helper/timer/getUsersLocalTime';
import { _getInitialNoteData, _isNoteIdNull, _noteExists, _updateNoteObj } from './helperLogic';
import { NotesNavigationProp } from '../../../@types/navigation';
import useConnectStore from '../../connectStore';

// first initiated in the Timer screen where the note will have logIndex
// and bookId as the note
function setInitiateNote(id: string, logIndex: number) {
   const localizedStartTime = getUsersLocalTime('string');
   const note = _getInitialNoteData(localizedStartTime);
   useBoundedStore.setState(
      produce((state: StoreProps) => {
         if (!state.notes[id]) {
            state.notes[id] = {};
         }
         state.notes[id][logIndex] = note;
      })
   );
}

type NoteArrayType = 'history' | 'tags' | 'note';

function setNoteObjWithIndex(id: string, logIndex: number) {
   if (!_noteExists(id, logIndex)) return;

   // defining typescript overloads for array types
   function setNoteObj<K extends NoteArrayType>(key: K, value: NoteProps[K]): void;

   // for types that are not array this will be defined here
   function setNoteObj<K extends keyof NoteProps, SType extends unknown>(
      key: K,
      value?: SType,
      converter?: (value?: SType) => NoteProps[K]
   ): (noteObj: NoteProps[K]) => void;

   function setNoteObj<K extends keyof NoteProps, SType extends unknown>(
      key: K,
      value?: SType,
      converter?: (value?: SType) => NoteProps[K]
   ) {
      return (noteObj: NoteProps[K]) => {
         useBoundedStore.setState(
            produce((state: StoreProps) => {
               const currentNote = state.notes[id][logIndex];
               if (currentNote) {
                  _updateNoteObj(currentNote, key, noteObj, value, converter);
               }
            })
         );
      };
   }

   return setNoteObj;
}

// write a resetter
function resetHistory(id: string, logIndex: number) {
   const resetter = setNoteObjWithIndex(id, logIndex);
   resetter('history', []);
}

function createNoteParams<K extends keyof NoteProps>(id: string, logIndex: number, params?: K) {
   const notes = setNoteObjWithIndex(id, logIndex);
   if (notes && params) return notes(params);
}

const handleTags = {
   _getCurrentNote(id: string, logIndex: number) {
      return createNoteParams(id, logIndex, 'tags');
   },

   _getCurrentTags(id: string, logIndex: number) {
      return useBoundedStore.getState().notes[id][logIndex]?.tags || [];
   },

   add(id: string, logIndex: number, newTag: string) {
      let currentTags = this._getCurrentTags(id, logIndex);
      if (!currentTags.includes(newTag) && newTag.length > 0) {
         const addTags = this._getCurrentNote(id, logIndex);

         addTags && addTags([...currentTags, newTag]);
      } else return;
   },

   remove(id: string, logIndex: number, oldTag: string) {
      let currentTags = this._getCurrentTags(id, logIndex);
      if (currentTags.includes(oldTag)) {
         const removeTags = this._getCurrentNote(id, logIndex);

         removeTags && removeTags(currentTags.filter((existingTag) => existingTag !== oldTag));
      }
   },

   edit(id: string, logIndex: number, oldTag: string, newTag: string) {
      let currentTags = this._getCurrentTags(id, logIndex);
      if (currentTags.includes(oldTag) && !currentTags.includes(newTag)) {
         const newTags = currentTags.map((tag) => (tag === oldTag ? newTag : tag));
         const editTags = this._getCurrentNote(id, logIndex);

         editTags && editTags(newTags);
      }
   },
};

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

export { setInitiateNote, setNoteObjWithIndex, createNoteParams, handleUnsaveNote, handleTags };
