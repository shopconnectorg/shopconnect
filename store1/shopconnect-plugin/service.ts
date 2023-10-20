const fetchPromotions = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shopconnect-plugin/promotions`
  );

  const promotions = await response.json();

  console.log(promotions);
};

export {
  fetchPromotions
};
