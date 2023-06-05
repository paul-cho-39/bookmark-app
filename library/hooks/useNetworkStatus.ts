import React, { useState, useEffect } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

function useNetworkStatus() {
   const [isConnected, setIsConnected] = useState<boolean | null>(null);

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

   return isConnected;
}

export default useNetworkStatus;
