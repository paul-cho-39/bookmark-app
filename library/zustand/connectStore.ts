import { create } from 'zustand';

const initialState = {
   data: {
      // for refresh for react query
      hasMutated: false,
   },
   inputs: {
      email: '',
      query: '',
   },
   headers: {
      isDataAvailable: false,
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

const useConnectStore = create(() => ({
   connectedObjs: initialState,
}));
