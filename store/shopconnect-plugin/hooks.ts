'use client';
import { useEffect } from 'react';
import { useShopConnectStore } from './sc-store';
import { confirmPromotion, fetchPromotions } from './service';
import { useStore } from '@/src/store';

const useShopConnect = async () => {
  const listenerInitialized = useShopConnectStore((state) => state.listenerInitialized);
  const { promotions, updateListenerInitialized, savePromotions, setUserDID } = useShopConnectStore((state) => state);
  const { addPromotion } = useStore((state) => state);

  const applyPromotion = async (promotionId: number) => {
    // setTimeout(async () => {
      const promotion = promotions.find(promo => promo.id === promotionId);
      console.log(promotions);
      if (promotion) {
        await confirmPromotion(promotionId);
        addPromotion(promotion);
      } else {
        console.error('Promotion not found by ID', promotionId);
      }
    // }, 2000);
  }

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
              case 'fetchPromotions': {
                setUserDID(data.did);
                const promotions = await fetchPromotions(data.did);
                console.log('savePromotions', promotions);
                savePromotions(promotions);
                break;
              }
              case 'applyPromotion':
                applyPromotion(data.promotionId);
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
