const messageExtension = (topic: string, data: any, callback?: () => {}) => {
  const msgData = { topic: topic, data };

  if (callback) {
    window.postMessage({ action: 'scPluginToExtension', payload: msgData }, '*');
  } else {
    window.postMessage({ action: 'scPluginToExtension', payload: msgData }, '*', callback);
  }
};

const fetchPromotions = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shopconnect-plugin/promotions`
  );

  const promotionsData = await response.json();

  messageExtension('loadPromotions', promotionsData);
};

export {
  fetchPromotions,
  messageExtension
};
