import useConnectStore from '../../connectStore';
import { produce, Draft } from 'immer';
import { ConnectorStoreProps } from '../../types/@types';
import { _setModalVisibility } from './modalLogic';
import { pauseTimer, resumeTimer } from '../bounded-logic/timerLogic';
import debounce from '../../../helper/debouncer';

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

const setQuery = (text: string) => {
   useConnectStore.setState(
      produce((draft: ConnectorStoreProps) => {
         draft.inputs.query = text;
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
};
