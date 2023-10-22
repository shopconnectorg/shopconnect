const messageExtension = (topic: string, data: any, callback?: () => {}) => {
  const msgData = { topic: topic, data };

  if (callback) {
    window.postMessage({ action: 'scPluginToExtension', payload: msgData }, '*');
  } else {
    window.postMessage({ action: 'scPluginToExtension', payload: msgData }, '*', callback);
  }
};

const confirmPromotion = async (promotionId: number) => {
  console.log('confirm', promotionId);
  messageExtension('confirmPromotion', promotionId);
}

const fetchPromotions = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shopconnect-plugin/promotions?did=test`
  );

  const promotionsData = await response.json();

  messageExtension('loadPromotions', promotionsData);
};

export {
  confirmPromotion,
  fetchPromotions,
  messageExtension
};
