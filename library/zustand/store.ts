import { create } from 'zustand';
import { StoreProps } from './types/@types';
import { immer } from 'zustand/middleware/immer';
import { DARKEN_BY_DEFAULT, NoteDarkColor } from '../../constants/notes';
import darkenColor from '../helper/darkenColor';

const useBoundedStore = create(
   immer<StoreProps>(() => ({
      notes: {
         '': {
            0: {
               attr: {
                  title: '',
                  chapter: '',
                  pageFrom: null,
                  pageTo: null,
                  isPrivate: false, // default is public notes
                  favorite: false,
               },
               tags: [],
               note: [],
               dates: {
                  start: null,
                  end: null,
                  lastEdited: null,
               },
               history: [],
               meta: {
                  headerColor: NoteDarkColor.Default,
                  bgColor: darkenColor(NoteDarkColor.Default, DARKEN_BY_DEFAULT),
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
