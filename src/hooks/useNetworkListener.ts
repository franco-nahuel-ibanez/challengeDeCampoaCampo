import { useEffect, useRef } from 'react';
import NetInfo, { type NetInfoState } from '@react-native-community/netinfo';

import { usePokemonStore } from '@/store/usePokemonStore';

export const useNetworkListener = () => {
  const prevConnectedRef = useRef<boolean>(true);
  const initStore = usePokemonStore((state) => state.initStore);
  const setConnectionStatus = usePokemonStore((state) => state.setConnectionStatus);

  useEffect(() => {
    const fetchInitialState = async () => {
      const state = await NetInfo.fetch();
      const isConnected = (state.isConnected && state.isInternetReachable) ?? false;
      prevConnectedRef.current = isConnected;
      setConnectionStatus(isConnected);
    };

    fetchInitialState();

    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const isConnected = (state.isConnected && state.isInternetReachable) ?? false;
      const wasOffline = !prevConnectedRef.current;
      const isNowOnline = isConnected && wasOffline;

      setConnectionStatus(isConnected);

      if (isNowOnline) {
        initStore(true);
      }
      prevConnectedRef.current = isConnected;
    });

    return () => {
      unsubscribe();
    };
  }, [initStore, setConnectionStatus]);
};
