import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getDatabase, ref, get } from "firebase/database";
import { app } from '../data/.firebaseConfig';

const database = getDatabase(app);

const fetchProducts = async () => {
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

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      queryFn: async () => {
        try {
          const data = await fetchProducts();
          return { data };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;