import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postGetCart = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }), 
  endpoints: (builder) => ({
    crearPedido: builder.mutation({
      query: (pedidoData) => ({
        url: "/pedidos",
        method: "POST",
        body: pedidoData,
      }),
    }),
  }),
});

export const { useCrearPedidoMutation } = postGetCart;
