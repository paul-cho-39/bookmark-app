import { NoteDarkColor, NoteLightColor } from '../../../../constants/notes';
import useSettingsStore from '../../settingsStore';
import useBoundedStore from '../../store';
import { NoteMetaProps, NoteProps } from '../../types/@types';
import { _noteExists } from './helperLogic';
import { setNoteObjWithIndex } from './noteLogic';

// for general theme it would require to call it at the parents level
// and have to add this to the feature
function setNoteMeta(id: string, logIndex: number) {
   if (!_noteExists(id, logIndex)) return;

   return function <K extends keyof NoteMetaProps>(key: K, value: NoteMetaProps[K]) {
      const setNoteProperty = setNoteObjWithIndex(id, logIndex);
      if (setNoteProperty) {
         setNoteProperty('meta', {
            ...useBoundedStore.getState().notes[id][logIndex].meta,
            [key]: value,
         });
      }
   };
}

function setNoteColor<TColor extends NoteDarkColor | NoteLightColor>(
   id: string,
   logIndex: number,
   selected: TColor
) {
   const setBg = setNoteMeta(id, logIndex);
   setBg && setBg('bgColor', selected);
}

export { setNoteMeta, setNoteColor };
