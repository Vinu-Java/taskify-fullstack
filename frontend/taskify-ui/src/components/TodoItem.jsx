import { useEffect, useState } from "react";

function highlightText(text, search) {
  if (!search) return text;

  const regex = new RegExp(`(${search})`, "gi");
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === search.toLowerCase() ? (
      <span key={index} className="highlight">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function TodoItem({ todo, search, handleEdit, handleDelete }) {
  const [showMore, setShowMore] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo);
  const [isEditing, setIsEditing] = useState(false);

  const isLongDesc = todo.description.length > 40;
  const shortDescription = isLongDesc
    ? todo.description.substring(0, 40) + "..."
    : todo.description;

  useEffect(() => {
    if (isEditing) {
      setEditedTodo(todo);
    }
  }, [isEditing, todo]);

  const handleSave = () => {
    handleEdit(editedTodo);
    setIsEditing(false);
    setShowMore(false);
  };

  const handleCancel = () => {
    setEditedTodo(todo);
    setIsEditing(false);
    setShowMore(false);
  };

  const formatDateTime = (dateTime) =>
    new Date(dateTime).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <div className="card">
      <div className="card-content">
        {isEditing ? (
          <div className="edit-group">
            <label>Title</label>
            <input
              value={editedTodo.title}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, title: e.target.value })
              }
            />

            <label>Description</label>
            <textarea
              value={editedTodo.description}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, description: e.target.value })
              }
            />

            <label>Status</label>
            <select
              value={editedTodo.status}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, status: e.target.value })
              }
            >
              <option value="PENDING">PENDING</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>

            <label>Priority</label>
            <select
              value={editedTodo.priority}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, priority: e.target.value })
              }
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>

            <label>Due Date</label>
            <input
              type="date"
              value={editedTodo.dueDate || ""}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, dueDate: e.target.value })
              }
            />

            <div className="edit-actions">
              <button onClick={handleSave} disabled={!editedTodo.title.trim()}>
                Save
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <div>
              <h2>{highlightText(todo.title, search)}</h2>
              <div className="meta">
                <span className={`status ${todo.status}`}>{todo.status}</span>

                <span className={`priority ${todo.priority}`}>
                  {todo.priority}
                </span>

                {todo.dueDate && (
                  <span className="due-date">Due: {todo.dueDate}</span>
                )}
              </div>

              <p>
                {showMore ? highlightText(todo.description, search) : highlightText(shortDescription, search)}
                {isLongDesc && (
                  <button
                    className="more-btn"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "less" : "more"}
                  </button>
                )}
              </p>

              <small>Created: {formatDateTime(todo.createdAt)}</small>
             
              <small>Updated: {formatDateTime(todo.updatedAt)}</small>

              <div className="edit-actions">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditedTodo(todo);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
