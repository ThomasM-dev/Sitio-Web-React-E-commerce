import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDatabase, ref, set, get } from "firebase/database";
import { app } from "../data/.firebaseConfig";

// Función para guardar datos en Realtime Database
const saveUserDataToFirebase = async (userData) => {
  const db = getDatabase(app); // Obtener la instancia de la base de datos
  const userRef = ref(db, `users/${userData.uid}`); // Referencia al nodo del usuario
  await set(userRef, userData); // Guardar los datos
};

// Función para obtener datos desde Realtime Database
const fetchUserDataFromFirebase = async (uid) => {
  const db = getDatabase(app); // Obtener la instancia de la base de datos
  const userRef = ref(db, `users/${uid}`); // Referencia al nodo del usuario
  const snapshot = await get(userRef); // Obtener los datos

  if (snapshot.exists()) {
    return snapshot.val(); // Devolver los datos del usuario
  } else {
    throw new Error("No se encontraron datos para este usuario.");
  }
};

// Crear el servicio de API con RTK Query
const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // No se usa baseUrl, ya que interactuamos directamente con Firebase
  endpoints: (builder) => ({
    // Endpoint para guardar datos del usuario
    saveUserData: builder.mutation({
      queryFn: async (userData) => {
        try {
          await saveUserDataToFirebase(userData);
          return { data: "Datos guardados correctamente" };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
    }),
    // Endpoint para obtener datos del usuario
    fetchUserData: builder.query({
      queryFn: async (uid) => {
        try {
          const userData = await fetchUserDataFromFirebase(uid);
          return { data: userData };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
    }),
  }),
});

// Exportar el servicio de API y los hooks generados automáticamente
export default userApi;
export const { useSaveUserDataMutation, useFetchUserDataQuery } = userApi;