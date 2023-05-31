import { ConnectorStoreProps } from '../../types/@types';
import useConnectStore from '../../connectStore';
import { pauseTimer, resumeTimer } from '../bounded-logic/timerLogic';
import useBoundedStore from '../../store';

// NOTE:
// for modals it seems like there should not be any deeper trees so having a single function
// that can change values make sense

type ParentModalType = ConnectorStoreProps['modal'];
type ChildModalType<T extends keyof ParentModalType> = {
   [K in keyof ParentModalType[T]]: ParentModalType[T][K] extends boolean ? K : never;
}[keyof ParentModalType[T]];

const _setModalVisibility = <T extends keyof ParentModalType, K extends ChildModalType<T>>(
   property: T,
   key: K,
   value?: boolean
) => {
   if (typeof value !== 'undefined') {
      useConnectStore.setState((state) => {
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
      useConnectStore.setState((state) => {
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

export { _setModalVisibility };
