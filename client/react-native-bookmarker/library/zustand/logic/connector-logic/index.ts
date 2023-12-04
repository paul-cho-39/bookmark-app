import useConnectStore from '../../connectStore';
import { produce, Draft } from 'immer';
import { ConnectorStoreProps } from '../../types/@types';
import { _setModalVisibility } from './modalLogic';
import { pauseTimer, resumeTimer } from '../bounded-logic/timerLogic';

const setIsDataAvailable = (value: boolean) => {
   useConnectStore.setState(
      produce((draft: ConnectorStoreProps) => {
         draft.data.notes.isDataAvailable = value;
      })
   );
};

const setHasMutated = (value: boolean) => {
   useConnectStore.setState(
      produce((draft: ConnectorStoreProps) => {
         draft.data.library.hasMutated = value;
      })
   );
};

const setQuery = <T extends keyof ConnectorStoreProps['inputs']>(queryType: T, text: string) => {
   useConnectStore.setState(
      produce((draft: ConnectorStoreProps) => {
         draft.inputs[queryType] = text;
      })
   );
};

const setSearchIsLoading = (isLoading: boolean) => {
   useConnectStore.setState(
      produce((draft: ConnectorStoreProps) => {
         draft.data.loader.isSearchLoading = isLoading;
      })
   );
};

const setSubmittedQuery = (query: string) => {
   const currentIsLoading = useConnectStore.getState().data.loader.isSearchLoading;
   if (!currentIsLoading) {
      setSearchIsLoading(true);
      useConnectStore.setState(
         produce((draft: ConnectorStoreProps) => {
            draft.inputs.search = query;
         })
      );
   }
};

const setEmail = (text: string) => {
   useConnectStore.setState(
      produce((draft: ConnectorStoreProps) => {
         draft.inputs.email = text;
      })
   );
};

const resetQuery = () => {
   useConnectStore.setState(
      produce((draft: ConnectorStoreProps) => {
         draft.inputs.query = '';
      })
   );
};

const setIsConnected = (value: boolean | null) => {
   useConnectStore.setState(
      produce((draft: ConnectorStoreProps) => {
         draft.data.network.isConnected = value;
      })
   );
};

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

const setNoteMenuModals = <
   T extends keyof Omit<ConnectorStoreProps['modal']['note'], 'isModalVisible'>
>(
   name: T,
   value: boolean
) => {
   _setModalVisibility('note', name, value);
};

// TODO: maybe rename this function?
const setNoteModalVisible = (type: 'opened' | 'closed', accessKeyboard: boolean = true) => {
   const modalState =
      type === 'opened'
         ? {
              visible: true,
              dismissKeyboard: accessKeyboard,
           }
         : { visible: false, dismissKeyboard: false };
   useConnectStore.setState(
      produce((draft: ConnectorStoreProps) => {
         draft.modal.note.isModalVisible = modalState;
      })
   );
};

export {
   setIsDataAvailable,
   setHasMutated,
   setQuery,
   resetQuery,
   setEmail,
   setBookVisibility,
   setStopModalVisible,
   setIsConnected,
   setSubmittedQuery,
   setSearchIsLoading,
   setNoteModalVisible,
   setNoteMenuModals,
};
