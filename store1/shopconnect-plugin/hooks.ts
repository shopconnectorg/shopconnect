'use client';
import { useEffect } from 'react';
import { useShopConnectStore } from './sc-store';
import { fetchPromotions } from './service';

const messageExtension = (topic: string, data: any, callback?: () => {}) => {
  const msgData = { topic: topic, data };

  if (callback) {
    window.postMessage({ action: 'scPluginToExtension', payload: msgData }, '*');
  } else {
    window.postMessage({ action: 'scPluginToExtension', payload: msgData }, '*', callback);
  }
};

const useShopConnect = async () => {
  const listenerInitialized = useShopConnectStore((state) => state.listenerInitialized);
  const updateListenerInitialized = useShopConnectStore((state) => state.updateListenerInitialized);

  useEffect(() => {
    if (!listenerInitialized) {
      // Initialize Shop Connect interface
      const initialize = async () => {
        // Load promotions
        const promotionsData = await fetchPromotions();
        messageExtension('loadPromotions', promotionsData);

        // Listen from messages coming from content_script.js
        window.addEventListener('message', function(event) {
          if (event.data.action == 'extensionToSCPlugin') {
            console.log(event.data.payload);
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
