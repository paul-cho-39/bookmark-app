import { create } from 'zustand';
import { StoreProps } from './types/@types';
import { immer } from 'zustand/middleware/immer';

// :CONSIDER
// move 'email', 'query', and 'hasMutated' to somewhere else(?)
// should declare initialState(?)
// // create a 'CONNECTOR?' OBJECT KEY
// this will also make resetting a lot easier
const useBoundedStore = create(
   immer<StoreProps>(() => ({
      notes: {
         id: null,
         0: {
               logIndex: 0,
               title: undefined,
               tags: [],
               note: [],
               page: null, // will be set alongside in the timer
               isPrivate: false, // default is public notes
               dates: {
                  start: null,
                  end: null,
                  lastEdited: null,
               },
            },
         },
      },
      // create a timerStore;
      timer: {
         hours: 0,
         minutes: 0,
         seconds: 0,
      },
      timerWithDate: {
         startTime: null,
         endTime: null,
      },
      isPaused: true,
      intervalId: null,
            tempPage: null,
      currentPage: null,
   }))
);

// :CONSIDER using "useConnectedStore" to create another
// file for thef
// set this logic somewhere else
const setIsDataAvailable = (value: boolean) => {
   useBoundedStore.setState({ isDataAvailable: value });
};

const setHasMutated = (value: boolean) => {
   useBoundedStore.setState({ hasMutated: value });
};

const setQuery = (text: string) => {
   useBoundedStore.setState({ query: text });
};

const resetQuery = () => {
   useBoundedStore.setState({ query: '' });
};

const setEmail = (text: string) => {
   useBoundedStore.setState({ email: text });
};

export { setIsDataAvailable, setHasMutated, setQuery, resetQuery, setEmail };

export default useBoundedStore;
