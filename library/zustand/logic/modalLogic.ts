import { StoreProps } from '../types/@types';
import useBoundedStore from '../store';
import { pauseTimer, resumeTimer } from './bounded-logic/timerLogic';

// NOTE:
// for modals it seems like there should not be any deeper trees so having a single function
// that can change values make sense

type ParentModalType = StoreProps['modal'];
type ChildModalType<T extends keyof ParentModalType> = {
   [K in keyof ParentModalType[T]]: ParentModalType[T][K] extends boolean ? K : never;
}[keyof ParentModalType[T]];

const _setModalVisibility = <T extends keyof ParentModalType, K extends ChildModalType<T>>(
   property: T,
   key: K,
   value?: boolean
) => {
   if (typeof value !== 'undefined') {
      useBoundedStore.setState((state) => {
         return {
            ...state,
            modal: {
               ...state.modal,
               [property]: {
                  ...state.modal[property],
                  [key]: value,
               },
            },
         };
      });
   } else {
      useBoundedStore.setState((state) => {
         return {
            ...state,
            modal: {
               ...state.modal,
               [property]: key,
            },
         };
      });
   }
};

// kind of middleware behavior where all the logic is applied to all notes
const _setNoteVisibility = (property: keyof ParentModalType['note'], value: boolean) => {
   const timer = useBoundedStore.getState().timer;
   if (timer && value) {
      pauseTimer();
   }
   if (timer && !value) {
      resumeTimer();
   }
   _setModalVisibility('note', property, value);
};

// specific case
const setBookVisibility = (value: boolean) => {
   _setModalVisibility('edit', 'isChangeBookVisible', value);
};

const setStopModalVisible = (value: boolean) => {
   if (value) {
      pauseTimer();
   }
   if (!value) {
      resumeTimer();
   }
   _setModalVisibility('timer', 'isStopTimeVisible', value);
};

export { setBookVisibility, setStopModalVisible };
