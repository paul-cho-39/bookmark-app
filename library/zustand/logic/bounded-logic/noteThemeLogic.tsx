import { NoteDarkColor, NoteLightColor } from '../../../../constants/notes';
import useSettingsStore from '../../settingsStore';
import useBoundedStore from '../../store';
import { NoteMetaProps, NoteProps } from '../../types/@types';
import { _noteExists } from './helperLogic';
import { setNoteObjWithIndex } from './noteLogic';

function setNoteMeta(id: string, logIndex: number) {
   return function <K extends keyof NoteMetaProps>(key: K, value: NoteMetaProps[K]) {
      const currentNotes = useBoundedStore.getState().notes[id][logIndex];
      const setNoteProperty = setNoteObjWithIndex(id, logIndex);

      if (currentNotes && setNoteProperty) {
         currentNotes.history?.push({
            timestamp: new Date().toISOString(),
            propertyChanged: 'meta',
            oldValue: currentNotes.meta,
            newValue: { ...currentNotes.meta, bgColor: value },
         });
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
   if (setBg) {
      setBg('bgColor', selected);
   }
}

export { setNoteMeta, setNoteColor };

// 1) change textInputs for "attr"
// 2) and change how it loads for this one too

// background color. 1) target the parent appbar (header different color) + note
// that means creating a json of data with header: {}, body: {}, (what else?)
// or change zustand data to a "name" instead of the color
// then have the color be the key for .json file
// and represent the colors as 'second.header' 'second.body'
// this way it can be refactored a lot easier
