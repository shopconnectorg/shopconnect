const fetchPromotions = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shopconnect-plugin/promotions`
  );

  return await response.json();
};

export {
  fetchPromotions
};
