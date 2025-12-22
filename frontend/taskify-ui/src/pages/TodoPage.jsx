import { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../services/todoApi";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const { search } = useOutletContext();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    loadTodos();
  }, [search, page]);

  useEffect(() => {
    setPage(0);
  }, [search]);

  const loadTodos = async () => {
    try {
      const response = await getTodos({
        search,
        page,
        size: 5,
      });

      setTodos(response.content);
      setTotalPages(response.totalPages);
    } catch (err) {
      toast.error(err.message || "Failed to load todos");
    }
  };

  const addNewTodo = async (todo) => {
    try {
      await addTodo(todo);
      loadTodos();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = async (updatedTodo) => {
    try {
      const payload = {
        title: updatedTodo.title,
        description: updatedTodo.description,
        status: updatedTodo.status,
        priority: updatedTodo.priority,
        dueDate: updatedTodo.dueDate,
      };

      const savedTodo = await updateTodo(updatedTodo.id, payload);

      setTodos((prev) =>
        prev.map((todo) => (todo.id === savedTodo.id ? savedTodo : todo))
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="app-container">
        <TodoList
          todos={todos}
          search={search}
          page={page}
          totalPages={totalPages}
          onPrev={() => setPage((p) => p - 1)}
          onNext={() => setPage((p) => p + 1)}
          addTodo={addNewTodo}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
}
