import { apiSlice } from "../../app/api/apiSlice";import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({});

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: async (responseData) => {
        const loadedUsers = await responseData.map((user) => {
          user.id = user._id;
          return user;
        });

        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
    addNewUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (updatedUser) => ({
        url: `/users/${updatedUser.id}`,
        method: "PATCH",
        body: updatedUser,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/`,
        method: "DELETE",
        body: userId,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

/**return the query result object */
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

/**create memoized selector */
const selectUsersData = createSelector(
  selectUsersResult,
  /**normalized state object with ids and entities */
  (usersResult) => usersResult.data
);

/**getSelectors create these selectors and we rename with aliases using destructuring */
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  /**Pass in a selector that returns the users slice of state */
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
