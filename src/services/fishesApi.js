const API_URL = "http://localhost:9000";

export const getFishes = async () => {
  const response = await fetch(`${API_URL}/fishes`);
  if (!response.ok) {
    throw new Error("Failed to fetch fishes");
  }
  const data = await response.json();
  return data;
};

export const createFish = async (fishData) => {
  const response = await fetch(`${API_URL}/fishes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fishData),
  });

  if (!response.ok) {
    throw new Error("Failed to create fish");
  }
  const data = await response.json();
  return data;
};
