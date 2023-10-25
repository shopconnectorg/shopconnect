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

// @ts-ignore
const confirmPurchase = async (userDID, item, qty, price) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shopconnect-plugin/purchases?did=${userDID}`, {
      method: 'post',
      body: JSON.stringify({
        id: userDID,
        qty,
        price,
        item: {
          name: item.name,
          category: item.category,
          brand: item.brand,
          image: item.image,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (response.status >= 200 && response.status < 300) {
    return await response.json();
  } else {
    const { message } = await response.json();
    throw new Error(message);
  }
};

export {
  confirmPromotion,
  fetchPromotions,
  messageExtension,
  confirmPurchase,
};
