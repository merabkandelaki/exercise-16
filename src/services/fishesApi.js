const API_URL = "http://localhost:9000";

export const getFishes = async () => {
  const response = await fetch(`${API_URL}/fishes`);
  if (!response.ok) {
    throw new Error("Failed to fetch fishes");
  }
  const data = await response.json();
  return data;
};

export const getSingleFish = async (paramId) => {
  const fishes = await getFishes();
  console.log(fishes, paramId, 'lll')
  return fishes.find(fish => fish.id == paramId)
};