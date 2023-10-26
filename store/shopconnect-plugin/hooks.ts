'use client';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow'
import { useShopConnectStore } from './sc-store';
import { confirmPromotion, fetchPromotions } from './service';
import { useStore } from '@/src/store';

const useShopConnect = async () => {
  const listenerInitialized = useShopConnectStore((state) => state.listenerInitialized);
  const { updateListenerInitialized, savePromotions, setUserDID } = useShopConnectStore(
    (state) => ({
      updateListenerInitialized: state.updateListenerInitialized,
      savePromotions: state.savePromotions,
      setUserDID: state.setUserDID
    })
  );
  const { addPromotion } = useStore((state) => state);

  const applyPromotion = async (promotionId: number) => {
    const currentPromotions = useShopConnectStore.getState().promotions // Fetch latest version from state
    const promotion = currentPromotions.find(promo => promo.id === promotionId);

    if (promotion) {
      console.log(`Applying promotion #${promotion.id}`)
      await confirmPromotion(promotionId);
      addPromotion(promotion);
    } else {
      console.error('Promotion not found by ID', promotionId);
    }
  }

  useEffect(() => {
    if (!listenerInitialized) {
      // Initialize Shop Connect interface
      const initialize = async () => {
        // Listen from messages coming from content_script.js
        window.addEventListener('message', async (event) => {
          if (event.data.action == 'extensionToSCPlugin') {
            const { payload: { topic, data } } = event.data;
            switch (topic) {
              case 'fetchPromotions': {
                setUserDID(data.did);
                const receivedPromotions = await fetchPromotions(data.did);
                savePromotions(receivedPromotions);
                break;
              }
              case 'applyPromotion':
                await applyPromotion(data.promotionId);
                break;
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
