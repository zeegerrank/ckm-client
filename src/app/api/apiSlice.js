import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://ckm-server.onrender.com/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  /**  console.log(arg); req.url req.body req.method */
  /**  console.log(api) // signal, dispatch, getState() */
  /** console.log(extraOptions) //custom like {shout: true} */

  let result = await baseQuery(args, api, extraOptions);

  /** might add more status code */
  if (
    args?.req?.cookies?.jwt ||
    args?.req?.url === "/auth/login" ||
    args?.req?.url === "/auth/logout"
  ) {
    console.log("sending refresh token");

    /**send refresh token to get new access token */
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      /**store new token */
      api.dispatch(setCredentials({ ...refreshResult.data }));

      /**retry original query with new access token */
      result = await baseQuery(args, api, extraOptions);
    } else if (refreshResult?.error?.status === 403) {
      refreshResult.error.data.message = "Your login has expired";
    }
    return refreshResult;
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Stock"],
  endpoints: (builder) => ({}),
});
