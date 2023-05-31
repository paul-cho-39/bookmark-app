import useConnectStore from '../../connectStore';
import { produce, Draft } from 'immer';
import { ConnectorStoreProps } from '../../types/@types';

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

export { setIsDataAvailable, setHasMutated, setQuery, resetQuery, setEmail };
