import React, { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

import { setIsConnected } from '../zustand/logic/connector-logic';

function useNetworkStatus() {
   useEffect(() => {
      const unsubscribe = NetInfo.addEventListener((state) => {
         setIsConnected(state.isConnected);
      });

      NetInfo.fetch().then((state) => {
         setIsConnected(state.isConnected);
      });

      return () => {
         unsubscribe();
      };
   }, []);
}

export default useNetworkStatus;
