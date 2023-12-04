import { DARKEN_BY_DEFAULT, NoteDarkColor, NoteLightColor } from '../../../../constants/notes';
import darkenColor from '../../../helper/darkenColor';
import useBoundedStore from '../../store';
import { NoteMetaProps, NoteProps } from '../../types/@types';
import { _noteExists } from './helperLogic';
import { setNoteObjWithIndex, updateNestedPropsWithIndex } from './noteLogic';

function updateNoteMetaAndHistory(id: string, logIndex: number) {
   return function <K extends keyof NoteMetaProps>(key: K, value: NoteMetaProps[K]) {
      const currentNotes = useBoundedStore.getState().notes[id][logIndex];
      const setNoteProperty = setNoteObjWithIndex(id, logIndex);
      const setMeta = updateNestedPropsWithIndex(id, logIndex);

      if (setNoteProperty && setMeta) {
         const history = currentNotes.history || [];
         const newHistory = {
            propertyChanged: `meta.${key}`,
            oldValue: currentNotes.meta?.[key],
            newValue: value,
         };

         setNoteProperty('history', [...history, newHistory]);
         // the typescript cannot correctly infer the color name schemes so
         // for now typescript will be ignored here
         // @ts-ignore
         setMeta('meta', key, value);

         return [...history, newHistory];
      }
   };
}

function updateNoteMetaWithoutHistory(id: string, logIndex: number) {
   return function <K extends keyof NoteMetaProps>(key: K, value: NoteMetaProps[K]) {
      const setMeta = updateNestedPropsWithIndex(id, logIndex);

      if (setMeta) {
         // @ts-ignore
         setMeta('meta', key, value);
      }
   };
}

function setNoteColor<TColor extends NoteDarkColor | NoteLightColor>(
   id: string,
   logIndex: number,
   selected: TColor
) {
   const setHeader = updateNoteMetaAndHistory(id, logIndex);
   const setBg = updateNoteMetaWithoutHistory(id, logIndex);
   if (setHeader && setBg) {
      const history = setHeader('headerColor', selected);
      setBg('bgColor', darkenColor(selected, DARKEN_BY_DEFAULT));

      return history;
   }
   return [];
}

export { updateNoteMetaAndHistory, setNoteColor };

// 1) change textInputs for "attr"
// 2) and change how it loads for this one too

// background color. 1) target the parent appbar (header different color) + note
// that means creating a json of data with header: {}, body: {}, (what else?)
// or change zustand data to a "name" instead of the color
// then have the color be the key for .json file
// and represent the colors as 'second.header' 'second.body'
// this way it can be refactored a lot easier
