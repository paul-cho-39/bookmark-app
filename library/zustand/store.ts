import { create } from 'zustand';
import { StoreProps } from './types/@types';
import { immer } from 'zustand/middleware/immer';
import { NoteLightColor, NotesFontSize } from '../../constants/notes';

const useBoundedStore = create(
   immer<StoreProps>(() => ({
      notes: {
         '': {
            0: {
               title: '',
               chapter: '',
               pageFrom: null,
               pageTo: null,
               tags: [],
               note: [],
               isPrivate: false, // default is public notes
               dates: {
                  start: null,
                  end: null,
                  lastEdited: null,
               },
               history: [],
               meta: {
                  bgColor: NoteLightColor.Default,
                  // from ./constants/
                  // fontSize: NotesFontSize.Medium,
                  // fontFamily: 'none',
               },
            },
         },
      },
      timer: {
         hours: 0,
         minutes: 0,
         seconds: 0,
      },
      timerWithDate: {
         startTime: null,
         endTime: null,
      },
      isPaused: true,
      intervalId: null,
      tempPage: null,
      currentPage: null,
   }))
);

export default useBoundedStore;
