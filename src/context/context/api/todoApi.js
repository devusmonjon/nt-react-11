import { api } from "./index";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query({
      query: (params) => ({
        url: "/todos",
        params,
      }),
      providesTags: ["Todo"],
    }),
    updateTodo: build.mutation({
      query: (body) => ({
        url: `/todos/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Todo"],
    }),
    createTodo: build.mutation({
      query: (body) => ({
        url: "/todos",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: build.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useUpdateTodoMutation,
  useCreateTodoMutation,
  useDeleteTodoMutation,
} = productApi;
