'use client';
import { useEffect } from 'react';
import { useShopConnectStore } from './sc-store';
import { fetchPromotions } from './service';

const useShopConnect = async () => {
  const listenerInitialized = useShopConnectStore((state) => state.listenerInitialized);
  const updateListenerInitialized = useShopConnectStore((state) => state.updateListenerInitialized);

  useEffect(() => {
    if (!listenerInitialized) {
      // Initialize Shop Connect interface
      const initialize = async () => {
        // Listen from messages coming from content_script.js
        window.addEventListener('message', async (event) => {
          if (event.data.action == 'extensionToSCPlugin') {
            console.log(event.data);
            const { payload: { topic, data } } = event.data;

            switch (topic) {
              case 'fetchPromotions':
                await fetchPromotions();
                break;
              case 'applyPromotion':
                console.log('applyPromotion', data);
            }
          }
        });

        updateListenerInitialized(true);
      }

      initialize();
    }
  }, []);
};

export {
  useShopConnect
};
