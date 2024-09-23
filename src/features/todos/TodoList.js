// add imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../../context/context/api/todoApi";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const { data } = useGetTodosQuery();
  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    data?.some((todo) => todo.title === newTodo)
      ? alert("Already exists")
      : createTodo({
          id: new Date().getTime(),
          title: newTodo,
          completed: false,
        });
    setNewTodo("");
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo"> Enter a new todo item </label>{" "}
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>{" "}
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />{" "}
      </button>{" "}
    </form>
  );
  let content = data?.map((todo) => (
    <article key={todo.id}>
      <div className="todo">
        <input
          type="checkbox"
          checked={todo.completed}
          id={todo.id}
          onChange={() => {
            updateTodo({ ...todo, completed: !todo.completed });
          }}
        />
        <label htmlFor={todo.id}>{todo.title}</label>
      </div>
      <button
        className="trash"
        onClick={() => {
          deleteTodo(todo.id);
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </article>
  ));

  return (
    <main>
      <h1> Todo List </h1> {newItemSection} {content}{" "}
    </main>
  );
};
export default TodoList;
