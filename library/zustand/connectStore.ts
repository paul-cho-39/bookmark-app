import { create } from 'zustand';
import { ConnectorStoreProps } from './types/@types';
import { immer } from 'zustand/middleware/immer';

const initialState: ConnectorStoreProps = {
   inputs: {
      email: '',
      query: '',
      search: '',
   },
   data: {
      library: {
         hasMutated: false, // refresh for react query
      },
      notes: {
         isDataAvailable: false,
      },
      network: {
         isConnected: null,
      },
      loader: {
         isSearchLoading: false,
      },
   },
   modal: {
      edit: {
         isChangeBookVisible: false,
      },
      timer: {
         isStopTimeVisible: false,
      },
      note: {
         isAddNoteVisible: false,
         isAddTagsVisible: false,
         isUploadNotesVisible: false,
      },
   },
};

const useConnectStore = create(immer(() => initialState));

export default useConnectStore;
