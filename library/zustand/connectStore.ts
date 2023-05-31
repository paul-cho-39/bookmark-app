import { create } from 'zustand';
import { ConnectorStoreProps } from './types/@types';

const initialState = {
   inputs: {
      email: '',
      query: '',
   },
   data: {
      library: {
         hasMutated: false, // refresh for react query
      },
      notes: {
         isDataAvailable: false,
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

const useConnectStore = create(<ConnectorStoreProps>() => ({
   connectedObjs: initialState,
}));

export default useConnectStore;
