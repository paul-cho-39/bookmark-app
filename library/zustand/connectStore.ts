import { create } from 'zustand';
import { ConnectorStoreProps } from './types/@types';
import { immer } from 'zustand/middleware/immer';

const initialState: ConnectorStoreProps = {
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

const useConnectStore = create(immer(() => initialState));

export default useConnectStore;
