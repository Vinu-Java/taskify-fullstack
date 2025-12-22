import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addTodo } from "../services/todoApi";

export default function AddTodo() {
  // const userId = localStorage.getItem("userId");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAddTodo = async () => {
    if (!title || !status || !priority || !dueDate) {
      toast.error("Please fill all required fields");
      return;
    }

    const todoData = {
      title,
      description,
      status,
      dueDate,
      priority,
    };

    try {
      setLoading(true);
      await addTodo(todoData);
      toast.success("Todo added successfully");
      navigate("/todos");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="todo-box">
      <h2>Add New Todo</h2>
        <input
          type="text"
          placeholder="Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="" disabled>
            {" "}
            Select Status{" "}
          </option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="" disabled>
            {" "}
            Select Priority{" "}
          </option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div className="action-buttons">
          <button onClick={handleAddTodo} disabled={loading}>
            Add Todo
          </button>
          <button onClick={() => navigate("/todos")} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
