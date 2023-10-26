const messageExtension = (topic: string, data: any, callback?: () => {}) => {
  const msgData = { topic: topic, data };

  if (callback) {
    window.postMessage({ action: 'scPluginToExtension', payload: msgData }, '*');
  } else {
    window.postMessage({ action: 'scPluginToExtension', payload: msgData }, '*', callback);
  }
};

const confirmPromotion = async (promotion: object, token: string) => {
  try {
    // @ts-ignore
    console.log('Confirming VC', promotion.id);
    const response = await fetch(
      // @ts-ignore
      `${process.env.NEXT_PUBLIC_API_URL}/shopconnect-plugin/${promotion.id}/apply`,
      {
        method: 'post',
        // @ts-ignore
        body: JSON.stringify({ authRequest: promotion.authRequest, token }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('VC confirmed', response.status);
    if (response.status >= 200 && response.status < 300) {
      return true;
    }
    throw new Error(`Error verifying ZK proof: ${response.statusText}`);
  } finally {
    // @ts-ignore
    messageExtension('confirmPromotion', promotion.id);
  }
}

// @ts-ignore
const fetchPromotions = async (did) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shopconnect-plugin/promotions?did=${did}`
  );
  const promotions = await response.json();
  messageExtension('loadPromotions', promotions);
  return promotions;
};

// @ts-ignore
const confirmPurchase = async (did, item, qty, price) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shopconnect-plugin/purchases?did=${did}`, {
      method: 'post',
      body: JSON.stringify({
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
