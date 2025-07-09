// NOTE: when using this generalAPI, please pass the three props. {url, method, body}

// url: used to access API from back-end. this must be a string type
// method: used either GET, POST, PUT, DELETE
// body: the parameter that must sent to the back-end

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { token } from "../utils/authStorage";

const basename = import.meta.env.VITE_API;

const prepareApiHeader = (headers: any) => {
  if (token) {
    headers.set("authorization", `Bearer ${JSON.parse(token).token}`);
  }
  return headers;
};

export const generalAPI = createApi({
  reducerPath: "generalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: basename,
    credentials: "include", // Include cookies in requests

    prepareHeaders: prepareApiHeader,
  }),
  tagTypes: ["generalApi"],
  endpoints: (builder) => ({
    fetch: builder.query({
      query: (data) => data,
      providesTags: (result) =>
        result && result.list
          ? [
              ...result.list.map(
                ({ id }: { id: { data: number[]; type: string } }) => ({
                  type: "generalApi" as const,
                  id,
                })
              ),
              { type: "generalApi", id: "LIST" },
            ]
          : [{ type: "generalApi", id: "LIST" }],
    }),
    action: builder.mutation({
      query: (data) => data,
      invalidatesTags: [{ type: "generalApi", id: "LIST" }],
    }),
  }),
});

export const { useFetchQuery, useActionMutation } = generalAPI;
