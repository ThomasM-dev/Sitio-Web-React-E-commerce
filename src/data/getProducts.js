import { getDatabase, ref, get } from "firebase/database";
import { app } from "./.firebaseConfig";

const database = getDatabase(app);

export const fetchProducts = async () => {
  const productsRef = ref(database, 'products');
  try {
    const snapshot = await get(productsRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Error fetching products");
  }
};