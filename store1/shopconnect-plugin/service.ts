const initializeShopConnect = async () => {
  // Load promotions when initialized
  const promotionsData = await fetchPromotions();

  messageExtension('loadPromotions', promotionsData);
}

const fetchPromotions = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shopconnect-plugin/promotions`
  );

  return await response.json();
};

const messageExtension = (topic: string, data: any, callback?: () => {}) => {
  const msgData = { topic: topic, data };

  if (callback) {
    chrome.runtime.sendMessage(process.env.NEXT_PUBLIC_EXTENSION_ID, msgData, callback);
  } else {
    chrome.runtime.sendMessage(process.env.NEXT_PUBLIC_EXTENSION_ID, msgData);
  }
};

export {
  initializeShopConnect,
  fetchPromotions,
  messageExtension
};
