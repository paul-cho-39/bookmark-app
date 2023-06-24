import useBoundedStore from '../../store';
import { NoteProps } from '../../types/@types';
import { _noteExists } from './helperLogic';
import { setNoteObjWithIndex } from './noteLogic';

// for general theme it would require to call it at the parents level
// and have to add this to the feature
function setNoteMeta(id: string, logIndex: number) {
   if (!_noteExists(id, logIndex)) return;

   return function <K extends keyof NoteProps['meta']>(key: K, value: NoteProps['meta'][K]) {
      const setNoteProperty = setNoteObjWithIndex(id, logIndex);
      if (setNoteProperty) {
         setNoteProperty('meta', {
            ...useBoundedStore.getState().notes[id][logIndex].meta,
            [key]: value,
         });
      }
   };
}

export { setNoteMeta };
