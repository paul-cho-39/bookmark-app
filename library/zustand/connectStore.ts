import { create } from 'zustand';
import { ConnectorStoreProps } from './types/@types';
import { immer } from 'zustand/middleware/immer';

const initialState: ConnectorStoreProps = {
   inputs: {
      email: '',
      query: '',
      search: '',
      noteQuery: '',
   },
   data: {
      library: {
         hasMutated: false, // refresh for react query
      },
      notes: {
         isDataAvailable: false,
         shouldSave: false,
         // the params will be set whenever the modals are set.
         params: {
            id: '',
            logIndex: '',
         },
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
         isUploadNotesVisible: false,
         isTrashVisible: false,
         isExportVisible: false,
         isTagsVisible: false,
         isInfoVisible: false,
         isSearchVisible: false,
         isModalVisible: {
            visible: false,
            dismissKeyboard: false,
         },
      },
   },
};

const useConnectStore = create(immer(() => initialState));

export default useConnectStore;
